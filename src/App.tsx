import { useState, useEffect, useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BottomNav from './components/BottomNav';// Import AuroraBackground
import { getFromLocalStorage, saveToLocalStorage, generateUniqueId } from './utils/localStorage';
import type { Category, Expense } from './types';

// Page Components
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import LogExpensePage from './pages/LogExpensePage';
import HistoryPage from './pages/HistoryPage';
import { AuroraBackground } from './components/AuroraBackground';

import { calculateDailyBudgets } from './utils/budgetCalculations';

// ... (other imports remain the same)

function App() {
  const [monthlySalary, setMonthlySalary] = useState<number | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const storedSalary = getFromLocalStorage('monthlySalary');
    const storedCategoriesStr = getFromLocalStorage('categories');
    const storedExpensesStr = getFromLocalStorage('expenses');

    // Check for new month
    const lastActiveMonth = getFromLocalStorage('lastActiveMonth');
    const currentMonth = new Date().toISOString().substring(0, 7); // YYYY-MM

    if (lastActiveMonth && lastActiveMonth !== currentMonth) {
        // New month detected! Archive the old data first.
        const prevSalary = storedSalary ? parseFloat(storedSalary) : 0;
        const prevExpenses: Expense[] = storedExpensesStr ? JSON.parse(storedExpensesStr) : [];
        const prevCategories: Category[] = storedCategoriesStr ? JSON.parse(storedCategoriesStr) : [];

        // Calculate summary
        let totalSpentInMonth = 0;
        const categorySummaries: any[] = prevCategories.map(cat => {
            const catExpenses = prevExpenses.filter(e => e.categoryId === cat.id);
            const catSpent = catExpenses.reduce((sum, e) => sum + e.amount, 0);
            totalSpentInMonth += catSpent;
            return {
                categoryId: cat.id,
                categoryName: cat.name,
                allocatedBudget: cat.budgetId,
                totalSpent: catSpent,
                saved: cat.budgetId - catSpent
            };
        });

        // Other expenses (not in current categories - unlikely but possible if cats deleted? 
        // Actually expenses delete when cat deletes. So logical consistency holds.)

        const historyItem = {
            id: lastActiveMonth,
            monthLabel: new Date(lastActiveMonth + "-01").toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
            salary: prevSalary,
            totalSpent: totalSpentInMonth,
            totalSaved: prevSalary - totalSpentInMonth,
            categories: categorySummaries
        };

        const existingHistory = getFromLocalStorage('expenseHistory');
        const history = existingHistory ? JSON.parse(existingHistory) : [];
        history.push(historyItem);
        saveToLocalStorage('expenseHistory', JSON.stringify(history));

        // Reset relevant data
        setMonthlySalary(null);
        setExpenses([]);
        saveToLocalStorage('lastActiveMonth', currentMonth);
        saveToLocalStorage('monthlySalary', '');
        saveToLocalStorage('expenses', JSON.stringify([]));
        
    } else {
        // Same month or first run, load data as usual
        if (storedSalary) {
            setMonthlySalary(parseFloat(storedSalary));
        }

        if (storedExpensesStr) {
            setExpenses(JSON.parse(storedExpensesStr));
        }

        // Initialize current month if not set (first run)
        if (!lastActiveMonth) {
             saveToLocalStorage('lastActiveMonth', currentMonth);
        }
    }

    if (storedCategoriesStr) {
      setCategories(JSON.parse(storedCategoriesStr));
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
    // Also remove expenses for this category
  };

  const addExpense = (newExpense: Omit<Expense, 'id'>) => {
    const expenseWithId = { ...newExpense, id: generateUniqueId() };
    setExpenses((prevExpenses) => [...prevExpenses, expenseWithId]);
  };

  const updateExpense = (updatedExpense: Expense) => {
    setExpenses((prevExpenses) =>
      prevExpenses.map((exp) => (exp.id === updatedExpense.id ? updatedExpense : exp))
    );
  };

  const deleteExpense = (id: string) => {
    setExpenses((prevExpenses) => prevExpenses.filter((exp) => exp.id !== id));
  };





  const dailyCategoryBudgets = useMemo(() => {
    return calculateDailyBudgets(monthlySalary, categories, expenses);
  }, [monthlySalary, categories, expenses]);

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

                  updateCategory={updateCategory}
                  deleteCategory={deleteCategory}
                  updateExpense={updateExpense}
                  deleteExpense={deleteExpense}
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
             <Route 
              path="/history" 
              element={
                <HistoryPage />
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
