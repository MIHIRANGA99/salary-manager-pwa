import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Category } from '../types';
import Input from './Input';
import { fadeInUp, successAnimation, shakeAnimation } from '../utils/animationVariants';

interface CategoryFormProps {
  onAddCategory: (category: Omit<Category, 'id'>) => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ onAddCategory }) => {
  const [name, setName] = useState<string>('');
  const [budgetId, setBudgetId] = useState<string>(''); // Changed to string for input type="number"
  const [showWeeklyBalance, setShowWeeklyBalance] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const budgetIdNum = parseFloat(budgetId);
    if (name.trim() === '' || isNaN(budgetIdNum) || budgetIdNum < 0) {
      setHasError(true);
      setTimeout(() => setHasError(false), 400);
      alert('Please enter a valid category name and a positive budget amount.');
      return;
    }
    
    setIsSubmitting(true);
    onAddCategory({ name, budgetId: budgetIdNum, showWeeklyBalance });
    setName('');
    setBudgetId('');
    setShowWeeklyBalance(true);
    
    // Reset submit animation
    setTimeout(() => setIsSubmitting(false), 500);
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="p-4 bg-linear-30 from-green-50 to-green-100 shadow-md rounded-lg mb-4"
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
    >
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
      <motion.div 
        className="mb-4 flex items-center"
        animate={hasError ? shakeAnimation : {}}
      >
        <motion.input
          type="checkbox"
          id="showWeeklyBalance"
          checked={showWeeklyBalance}
          onChange={(e) => setShowWeeklyBalance(e.target.checked)}
          className="checkbox-gradient mr-2 leading-tight"
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring' as const, stiffness: 400, damping: 17 }}
        />
        <label htmlFor="showWeeklyBalance" className="text-sm text-gray-700 font-medium">
          Show Weekly Balance
        </label>
      </motion.div>
      <motion.button
        type="submit"
        className="btn-gradient-success btn-glow-success text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        whileTap={{ scale: 0.95 }}
        animate={isSubmitting ? successAnimation : {}}
        transition={{ type: 'spring' as const, stiffness: 400, damping: 17 }}
      >
        Add Category
      </motion.button>
    </motion.form>
  );
};

export default CategoryForm;
