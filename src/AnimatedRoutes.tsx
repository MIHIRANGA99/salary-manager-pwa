import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import type { Category, Expense, BudgetMetrics } from './types';

import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import LogExpensePage from './pages/LogExpensePage';
import HistoryPage from './pages/HistoryPage';
import DebugStoragePage from './pages/DebugStoragePage';

import { pageTransition } from './utils/animationVariants';

interface AnimatedRoutesProps {
  categories: Category[];
  expenses: Expense[];
  monthlySalary: number | null;
  dailyCategoryBudgets: Record<string, BudgetMetrics>;
  updateCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
  updateExpense: (expense: Expense) => void;
  deleteExpense: (id: string) => void;
  handleSalaryChange: (salary: number) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  addExpense: (expense: Omit<Expense, 'id'>) => void;
}

export function AnimatedRoutes({ 
  categories, 
  expenses, 
  monthlySalary, 
  dailyCategoryBudgets,
  updateCategory,
  deleteCategory,
  updateExpense,
  deleteExpense,
  handleSalaryChange,
  addCategory,
  addExpense 
}: AnimatedRoutesProps) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route 
          path="/" 
          element={
            <motion.div
              variants={pageTransition}
              initial="initial"
              animate="animate"
              exit="exit"
              custom={0}
            >
              <HomePage 
                categories={categories} 
                expenses={expenses} 
                salary={monthlySalary}
                dailyBudgets={dailyCategoryBudgets}
                updateCategory={updateCategory}
                deleteCategory={deleteCategory}
                updateExpense={updateExpense}
                deleteExpense={deleteExpense}
              />
            </motion.div>
          } 
        />
        <Route 
          path="/settings" 
          element={
            <motion.div
              variants={pageTransition}
              initial="initial"
              animate="animate"
              exit="exit"
              custom={1}
            >
              <SettingsPage 
                onSalaryChange={handleSalaryChange} 
                onAddCategory={addCategory} 
              />
            </motion.div>
          } 
        />
        <Route 
          path="/log-expense" 
          element={
            <motion.div
              variants={pageTransition}
              initial="initial"
              animate="animate"
              exit="exit"
              custom={1}
            >
              <LogExpensePage 
                categories={categories} 
                onAddExpense={addExpense} 
              />
            </motion.div>
          } 
        />
        <Route 
          path="/history" 
          element={
            <motion.div
              variants={pageTransition}
              initial="initial"
              animate="animate"
              exit="exit"
              custom={1}
            >
              <HistoryPage />
            </motion.div>
          } 
        />
        <Route 
          path="/debug-storage" 
          element={
            <motion.div
              variants={pageTransition}
              initial="initial"
              animate="animate"
              exit="exit"
              custom={1}
            >
              <DebugStoragePage />
            </motion.div>
          } 
        />
      </Routes>
    </AnimatePresence>
  );
}
