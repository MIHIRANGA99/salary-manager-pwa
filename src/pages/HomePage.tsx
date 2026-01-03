import React, { useState } from 'react';
import Dashboard from '../components/Dashboard';
import CategoryList from '../components/CategoryList';
import type { Category, Expense, BudgetMetrics } from '../types';
import Input from '../components/Input';

interface HomePageProps {
  categories: Category[];
  expenses: Expense[];
  salary: number | null;
  dailyBudgets: Record<string, BudgetMetrics>;

  updateCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
  updateExpense: (expense: Expense) => void;
  deleteExpense: (id: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({
  categories,
  expenses,
  salary,
  dailyBudgets,

  updateCategory,
  deleteCategory,
  updateExpense,
  deleteExpense,
}) => {
  const [editingExpenseId, setEditingExpenseId] = useState<string | null>(null);
  const [tempExpense, setTempExpense] = useState<Expense | null>(null);

  const startEditing = (expense: Expense) => {
    setEditingExpenseId(expense.id);
    setTempExpense(expense);
  };

  const cancelEditing = () => {
    setEditingExpenseId(null);
    setTempExpense(null);
  };

  const saveEditing = () => {
    if (tempExpense) {
      updateExpense(tempExpense);
      setEditingExpenseId(null);
      setTempExpense(null);
    }
  };

  const handleDelete = (id: string) => {
      if (window.confirm("Are you sure you want to delete this expense?")) {
          deleteExpense(id);
      }
  };

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

            updateCategory={updateCategory}
            deleteCategory={deleteCategory}
          />
          <h2 className="text-xl font-semibold mb-4 mt-8 text-white">Recent Expenses</h2>
          {expenses.length === 0 ? (
            <p className="text-gray-400">No expenses logged yet.</p>
          ) : (
            <div className="bg-white shadow-md rounded-lg p-4 text-gray-800">
              {expenses.map((expense) => (
                <div key={expense.id} className="border-b border-gray-200 py-2">
                    {editingExpenseId === expense.id && tempExpense ? (
                        <div className="flex flex-col space-y-2">
                            <div className="flex flex-col">
                                <label className="mb-1 text-sm font-medium text-gray-700">Category</label>
                                <select
                                    className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    value={tempExpense.categoryId}
                                    onChange={(e) => setTempExpense({...tempExpense, categoryId: e.target.value})}
                                >
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                            <Input 
                                label="Amount"
                                type="number"
                                value={tempExpense.amount}
                                onChange={(e) => setTempExpense({...tempExpense, amount: parseFloat(e.target.value)})}
                            />
                            <Input 
                                label="Date"
                                type="date"
                                value={tempExpense.date}
                                onChange={(e) => setTempExpense({...tempExpense, date: e.target.value})}
                            />
                             <div className="flex space-x-2 mt-2">
                                <button onClick={saveEditing} className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">Save</button>
                                <button onClick={cancelEditing} className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600">Cancel</button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex justify-between items-center">
                            <div>
                                <span className="font-medium mr-2">{categories.find(cat => cat.id === expense.categoryId)?.name || 'Unknown Category'}:</span>
                                <span>${expense.amount.toFixed(2)}</span>
                                <span className="ml-4 text-gray-500 text-sm">{expense.date}</span>
                            </div>
                            <div className="flex space-x-2">
                                <button onClick={() => startEditing(expense)} className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                                <button onClick={() => handleDelete(expense.id)} className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                            </div>
                        </div>
                    )}
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

