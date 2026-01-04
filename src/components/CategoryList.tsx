import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CategoryCard from './CategoryCard';
import type { Category, Expense, BudgetMetrics } from '../types';
import Input from './Input';
import { staggerContainer, modalContent, modalBackdrop } from '../utils/animationVariants';

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
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {categories.length === 0 ? (
          <motion.p 
            className="text-gray-400 col-span-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            No categories added yet.
          </motion.p>
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
      </motion.div>

      <AnimatePresence>
        {editingCategory && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-60 z-40 backdrop-blur-sm"
              variants={modalBackdrop}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setEditingCategory(null)}
            />
            <motion.div
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-11/12 max-w-md p-4 bg-white shadow-2xl rounded-lg text-gray-800"
              variants={modalContent}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <h3 className="text-lg font-semibold mb-4">Edit Category: {editingCategory.name}</h3>
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
                <motion.input
                  type="checkbox"
                  id="editShowWeeklyBalance"
                  checked={editingCategory.showWeeklyBalance ?? true}
                  onChange={(e) => setEditingCategory({ ...editingCategory, showWeeklyBalance: e.target.checked })}
                  className="checkbox-gradient mr-2 leading-tight"
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring' as const, stiffness: 400, damping: 17 }}
                />
                <label htmlFor="editShowWeeklyBalance" className="text-sm text-gray-700 font-medium">
                  Show Weekly Balance
                </label>
              </div>
              <div className="flex gap-3">
                <motion.button
                  onClick={handleUpdateCategory}
                  className="flex-1 btn-gradient-emerald btn-glow-success text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring' as const, stiffness: 400, damping: 17 }}
                >
                  Save Changes
                </motion.button>
                <motion.button
                  onClick={() => setEditingCategory(null)}
                  className="flex-1 btn-gradient-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring' as const, stiffness: 400, damping: 17 }}
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategoryList;
