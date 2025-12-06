import React from 'react';
import type { Category } from '../types';

interface CategoryCardProps {
  category: Category;
  dailyBudget: number;
  dailySpent: number;
  onEdit: (category: Category | null) => void; // Updated type
  onDelete: (id: string) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, dailyBudget, dailySpent, onEdit, onDelete }) => {
  const balance = dailyBudget - dailySpent;

  return (
    <div className="bg-slate-700 p-4 rounded-lg shadow-md mb-4 flex justify-between items-center">
      <div>
        <h3 className="text-lg font-bold text-white">{category.name}</h3>
        <p className="text-slate-300">Monthly Budget: ${category.budgetId.toFixed(2)}</p>
        <p className="text-slate-300">Daily Budget: ${dailyBudget.toFixed(2)}</p>
        <p className="text-slate-300">Daily Spent: ${dailySpent.toFixed(2)}</p>
        <p className="text-slate-300">Balance: ${balance.toFixed(2)}</p>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onEdit(category)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-3 py-1 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(category.id)}
          className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;
