import { useState, useEffect, useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BottomNav from './components/BottomNav';// Import AuroraBackground
import { getFromLocalStorage, saveToLocalStorage, generateUniqueId } from './utils/localStorage';
import { getDaysInMonth, getTodayDateString } from './utils/dateUtils';
import type { Category, Expense } from './types';

// Page Components
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import LogExpensePage from './pages/LogExpensePage';
import { AuroraBackground } from './components/AuroraBackground';

function App() {
  const [monthlySalary, setMonthlySalary] = useState<number | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const storedSalary = getFromLocalStorage('monthlySalary');
    if (storedSalary) {
      setMonthlySalary(parseFloat(storedSalary));
    }

    const storedCategories = getFromLocalStorage('categories');
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    }

    const storedExpenses = getFromLocalStorage('expenses');
    if (storedExpenses) {
      setExpenses(JSON.parse(storedExpenses));
    }
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      saveToLocalStorage('categories', JSON.stringify(categories));
    }
  }, [categories]);

  useEffect(() => {
    saveToLocalStorage('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const handleSalaryChange = (salary: number) => {
    setMonthlySalary(salary);
    saveToLocalStorage('monthlySalary', salary.toString());
  };

  const addCategory = (newCategory: Omit<Category, 'id'>) => {
    const categoryWithId = { ...newCategory, id: generateUniqueId() };
    setCategories((prevCategories) => [...prevCategories, categoryWithId]);
  };

  const updateCategory = (updatedCategory: Category) => {
    setCategories((prevCategories) =>
      prevCategories.map((cat) => (cat.id === updatedCategory.id ? updatedCategory : cat))
    );
  };

  const deleteCategory = (id: string) => {
    setCategories((prevCategories) => prevCategories.filter((cat) => cat.id !== id));
    setExpenses((prevExpenses) => prevExpenses.filter((exp) => exp.categoryId !== id));
  };

  const addExpense = (newExpense: Omit<Expense, 'id'>) => {
    const expenseWithId = { ...newExpense, id: generateUniqueId() };
    setExpenses((prevExpenses) => [...prevExpenses, expenseWithId]);
  };

  const todayDate = getTodayDateString();
  const currentMonthYear = new Date().toISOString().split('T')[0].slice(0, 7); // YYYY-MM

  const dailySpentAmountPerCategory = useMemo(() => {
    const dailySpent: { [key: string]: number } = {};
    expenses.filter(exp => exp.date === todayDate)
             .forEach(exp => {
                dailySpent[exp.categoryId] = (dailySpent[exp.categoryId] || 0) + exp.amount;
             });
    return dailySpent;
  }, [expenses, todayDate]);

  const dailyCategoryBudgets = useMemo(() => {
    if (!monthlySalary || categories.length === 0) return {};

    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1; // getMonth() is 0-indexed
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const remainingDays = daysInMonth - today.getDate() + 1; // +1 to include today

    const totalSpentInMonthPerCategory: { [key: string]: number } = {};
    expenses.filter(exp => exp.date.startsWith(currentMonthYear))
            .forEach(exp => {
              totalSpentInMonthPerCategory[exp.categoryId] = (totalSpentInMonthPerCategory[exp.categoryId] || 0) + exp.amount;
            });

    const budgets: { [key: string]: number } = {};
    categories.forEach(category => {
      const spentSoFar = totalSpentInMonthPerCategory[category.id] || 0;
      const remainingMonthlyBudget = category.budgetId - spentSoFar;
      
      if (remainingDays <= 0) {
        budgets[category.id] = remainingMonthlyBudget; // All budget for today if last day
      } else {
        budgets[category.id] = remainingMonthlyBudget / remainingDays;
      }
      
      if (budgets[category.id] < 0) {
        budgets[category.id] = 0;
      }
    });
    return budgets;
  }, [monthlySalary, categories, expenses, currentMonthYear]);

  return (
    <BrowserRouter>
    <AuroraBackground showRadialGradient>
        <div className="min-h-screen text-slate-100 pb-16">
          <Routes>
            <Route 
              path="/" 
              element={
                <HomePage 
                  categories={categories} 
                  expenses={expenses} 
                  salary={monthlySalary}
                  dailyBudgets={dailyCategoryBudgets}
                  dailySpentAmounts={dailySpentAmountPerCategory}
                  updateCategory={updateCategory}
                  deleteCategory={deleteCategory} 
                />
              } 
            />
            <Route 
              path="/settings" 
              element={
                <SettingsPage 
                  onSalaryChange={handleSalaryChange} 
                  onAddCategory={addCategory} 
                />
              } 
            />
            <Route 
              path="/log-expense" 
              element={
                <LogExpensePage 
                  categories={categories} 
                  onAddExpense={addExpense} 
                />
              } 
            />
          </Routes>
          <BottomNav />
        </div>
      </AuroraBackground>
    </BrowserRouter>
  );
}

export default App;
