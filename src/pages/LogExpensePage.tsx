import React from 'react';
import ExpenseInput from '../components/ExpenseInput';
import type { Category, Expense } from '../types';

interface LogExpensePageProps {
  categories: Category[];
  onAddExpense: (expense: Omit<Expense, 'id'>) => void;
}

const LogExpensePage: React.FC<LogExpensePageProps> = ({ categories, onAddExpense }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-white">Log New Expense</h1>
      <ExpenseInput categories={categories} onAddExpense={onAddExpense} />
    </div>
  );
};

export default LogExpensePage;
