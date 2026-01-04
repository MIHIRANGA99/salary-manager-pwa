import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Category, Expense } from '../types';
import Input from './Input';
import { fadeInUp } from '../utils/animationVariants';

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
    <motion.form 
      onSubmit={handleSubmit} 
      className="p-4 bg-white shadow-md rounded-lg mb-4 text-gray-800"
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-xl font-semibold mb-2">Log Daily Expense</h2>
      <div className="mb-3">
        <label htmlFor="expenseCategory" className="block text-gray-700 text-sm font-bold mb-2">
          Category:
        </label>
        <motion.select
          id="expenseCategory"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline input-gradient-focus"
          required
          whileFocus={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring' as const, stiffness: 300, damping: 20 }}
        >
          <option value="">Select a Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </motion.select>
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
      <motion.button
        type="submit"
        className="btn-gradient-emerald btn-glow-success text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring' as const, stiffness: 400, damping: 17 }}
      >
        Log Expense
      </motion.button>
    </motion.form>
  );
};

export default ExpenseInput;
