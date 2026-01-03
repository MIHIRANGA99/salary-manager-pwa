import React, { useState } from 'react';
import type { Category } from '../types';
import Input from './Input';

interface CategoryFormProps {
  onAddCategory: (category: Omit<Category, 'id'>) => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ onAddCategory }) => {
  const [name, setName] = useState<string>('');
  const [budgetId, setBudgetId] = useState<string>(''); // Changed to string for input type="number"
  const [showWeeklyBalance, setShowWeeklyBalance] = useState<boolean>(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const budgetIdNum = parseFloat(budgetId);
    if (name.trim() === '' || isNaN(budgetIdNum) || budgetIdNum < 0) {
      alert('Please enter a valid category name and a positive budget amount.');
      return;
    }
    onAddCategory({ name, budgetId: budgetIdNum, showWeeklyBalance });
    setName('');
    setBudgetId('');
    setShowWeeklyBalance(true);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-linear-30 from-green-50 to-green-100 shadow-md rounded-lg mb-4">
      <h2 className="text-xl font-semibold mb-2 text-gray-800">Add New Category</h2>
      <div className="mb-3">
        <Input
          type="text"
          id="categoryName"
          label="Category Name:"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="e.g., Food, Rent, Entertainment"
          required
        />
      </div>
      <div className="mb-4">
        <Input
          type="number"
          id="budgetId"
          label="Budget Amount:"
          value={budgetId}
          onChange={(e) => setBudgetId(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="e.g., 500"
          required
          min="0"
        />
      </div>
      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          id="showWeeklyBalance"
          checked={showWeeklyBalance}
          onChange={(e) => setShowWeeklyBalance(e.target.checked)}
          className="mr-2 leading-tight"
        />
        <label htmlFor="showWeeklyBalance" className="text-sm text-gray-700 font-medium">
          Show Weekly Balance
        </label>
      </div>
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Add Category
      </button>
    </form>
  );
};

export default CategoryForm;
