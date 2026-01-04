import React from 'react';
import { motion } from 'framer-motion';
import type { Category, BudgetMetrics } from '../types';
import { cardEntrance, tapAnimation, buttonPress } from '../utils/animationVariants';

interface CategoryCardProps {
  category: Category;
  metrics?: BudgetMetrics;
  onEdit: (category: Category | null) => void;
  onDelete: (id: string) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, metrics, onEdit, onDelete }) => {
  if (!metrics) {
    return (
        <motion.div 
          className="bg-slate-700 p-4 rounded-lg shadow-md mb-4 flex justify-between items-center"
          variants={cardEntrance}
        >
            <h3 className="text-lg font-bold text-white mb-2">{category.name}</h3>
            <div className="text-slate-400">Loading metrics...</div>
        </motion.div>
    )
  }

  const { dailyBudget, spentToday, weeklyBalance, monthlyBalance } = metrics;
  
  return (
    <motion.div 
      className="bg-slate-700 p-4 rounded-lg shadow-md mb-4 flex justify-between items-center text-slate-100"
      variants={cardEntrance}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.01 }}
      transition={{ type: 'spring' as const, stiffness: 300, damping: 24 }}
    >
      <div>
        <h3 className="text-lg font-bold text-white mb-2">{category.name}</h3>
        <div className="space-y-1 text-sm">
            <p className="text-slate-300">Total Monthly: <span className="text-slate-100">${category.budgetId.toFixed(2)}</span></p>
            
            <div className="my-2 border-t border-slate-600 pt-2">
                <p className="text-emerald-400 font-semibold">Today</p>
                <p>Budget: ${dailyBudget.toFixed(2)}</p>
                <p>Spent: ${spentToday.toFixed(2)}</p>
            </div>

            <div className="my-2 border-t border-slate-600 pt-2">
                 {(category.showWeeklyBalance ?? true) && (
                    <p><span className="text-blue-400 font-semibold">Weekly Balance:</span> ${weeklyBalance.toFixed(2)}</p>
                 )}
                 <p><span className="text-purple-400 font-semibold">Monthly Balance:</span> ${monthlyBalance.toFixed(2)}</p>
            </div>
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <motion.button
          onClick={() => onEdit(category)}
          className="btn-gradient-primary btn-glow-primary text-white text-xs px-3 py-1 rounded focus:outline-none"
          whileTap={buttonPress}
          transition={{ type: 'spring' as const, stiffness: 400, damping: 17 }}
        >
          Edit
</motion.button>
        <motion.button
          onClick={() => onDelete(category.id)}
          className="btn-gradient-danger btn-glow-danger text-white text-xs px-3 py-1 rounded focus:outline-none"
          whileTap={tapAnimation}
          transition={{ type: 'spring' as const, stiffness: 400, damping:17 }}
        >
          Delete
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CategoryCard;
