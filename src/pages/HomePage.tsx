import React from 'react';
import Dashboard from '../components/Dashboard';
import CategoryList from '../components/CategoryList';
import type { Category, Expense } from '../types';

interface HomePageProps {
  categories: Category[];
  expenses: Expense[];
  salary: number | null;
  dailyBudgets: { [key: string]: number };
  dailySpentAmounts: { [key: string]: number };
  updateCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({
  categories,
  expenses,
  salary,
  dailyBudgets,
  dailySpentAmounts,
  updateCategory,
  deleteCategory,
}) => {
  return (
    <Dashboard>
      {salary !== null ? (
        <>
          <h2 className="text-xl font-semibold mb-4 text-white">Budget Categories</h2>
          <CategoryList
            categories={categories}
            expenses={expenses}
            salary={salary}
            dailyBudgets={dailyBudgets}
            dailySpentAmounts={dailySpentAmounts}
            updateCategory={updateCategory}
            deleteCategory={deleteCategory}
          />
          <h2 className="text-xl font-semibold mb-4 mt-8 text-white">Recent Expenses</h2>
          {expenses.length === 0 ? (
            <p className="text-gray-400">No expenses logged yet.</p>
          ) : (
            <div className="bg-white shadow-md rounded-lg p-4 text-gray-800">
              {expenses.map((expense) => (
                <div key={expense.id} className="border-b border-gray-200 py-2 flex justify-between">
                  <span>{categories.find(cat => cat.id === expense.categoryId)?.name || 'Unknown Category'}: ${expense.amount.toFixed(2)}</span>
                  <span>{expense.date}</span>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-gray-400">Set your monthly salary to start budgeting!</p>
      )}
    </Dashboard>
  );
};

export default HomePage;

