import React, { useState } from 'react';
import CategoryCard from './CategoryCard';
import type { Category, Expense, BudgetMetrics } from '../types';
import Input from './Input';

interface CategoryListProps {
  categories: Category[];
  dailyBudgets: Record<string, BudgetMetrics>;

  updateCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
  expenses: Expense[];
  salary: number;
}

const CategoryList: React.FC<CategoryListProps> = ({ categories, dailyBudgets, updateCategory, deleteCategory }) => {
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const handleUpdateCategory = () => {
    if (editingCategory) {
      updateCategory(editingCategory);
      setEditingCategory(null);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.length === 0 ? (
          <p className="text-gray-400 col-span-full">No categories added yet.</p>
        ) : (
          categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              metrics={dailyBudgets[category.id]}
              onEdit={setEditingCategory}
              onDelete={deleteCategory}
            />
          ))
        )}
      </div>

      {editingCategory && (
        <div className="mt-4 p-4 bg-white shadow-md rounded-lg text-gray-800">
          <h3 className="text-lg font-semibold mb-2">Edit Category: {editingCategory.name}</h3>
          <Input
            type="text"
            label="Category Name:"
            value={editingCategory.name}
            onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
            className="mb-2"
          />
          <Input
            type="number"
            label="Budget Amount:"
            value={editingCategory.budgetId}
            onChange={(e) => setEditingCategory({ ...editingCategory, budgetId: parseFloat(e.target.value) })}
            className="mb-2"
          />
           <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="editShowWeeklyBalance"
              checked={editingCategory.showWeeklyBalance ?? true}
              onChange={(e) => setEditingCategory({ ...editingCategory, showWeeklyBalance: e.target.checked })}
              className="mr-2 leading-tight"
            />
            <label htmlFor="editShowWeeklyBalance" className="text-sm text-gray-700 font-medium">
              Show Weekly Balance
            </label>
          </div>
          <button
            onClick={handleUpdateCategory}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
          >
            Save Changes
          </button>
          <button
            onClick={() => setEditingCategory(null)}
            className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryList;
