import React, { useState } from 'react';
import type { Category, Expense } from '../types';
import Input from './Input';

interface ExpenseInputProps {
  categories: Category[];
  onAddExpense: (expense: Omit<Expense, 'id'>) => void;
}

const ExpenseInput: React.FC<ExpenseInputProps> = ({ categories, onAddExpense }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [amount, setAmount] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const expenseAmount = parseFloat(amount);

    if (!selectedCategory || isNaN(expenseAmount) || expenseAmount <= 0) {
      alert('Please select a category and enter a valid positive amount.');
      return;
    }

    const newExpense: Omit<Expense, 'id'> = {
      categoryId: selectedCategory,
      amount: expenseAmount,
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
    };

    onAddExpense(newExpense);
    setSelectedCategory('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded-lg mb-4 text-gray-800">
      <h2 className="text-xl font-semibold mb-2">Log Daily Expense</h2>
      <div className="mb-3">
        <label htmlFor="expenseCategory" className="block text-gray-700 text-sm font-bold mb-2">
          Category:
        </label>
        <select
          id="expenseCategory"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        >
          <option value="">Select a Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <Input
          type="number"
          id="expenseAmount"
          label="Amount:"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="e.g., 25.50"
          required
          min="0"
          step="0.01"
        />
      </div>
      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Log Expense
      </button>
    </form>
  );
};

export default ExpenseInput;
