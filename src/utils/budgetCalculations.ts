import type { Category, Expense, BudgetMetrics } from '../types';
import { getDaysInMonth } from './dateUtils';

export const calculateDailySpent = (expenses: Expense[], todayDate: string): Record<string, number> => {
  const dailySpent: Record<string, number> = {};
  expenses
    .filter((exp) => exp.date === todayDate)
    .forEach((exp) => {
      dailySpent[exp.categoryId] = (dailySpent[exp.categoryId] || 0) + exp.amount;
    });
  return dailySpent;
};

export const calculateDailyBudgets = (
  monthlySalary: number | null,
  categories: Category[],
  expenses: Expense[]
): Record<string, BudgetMetrics> => {
  if (!monthlySalary || categories.length === 0) return {};

  const today = new Date();
  const currentMonthYear = today.toISOString().split('T')[0].slice(0, 7); // YYYY-MM
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1; // getMonth() is 0-indexed
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const remainingDays = daysInMonth - today.getDate() + 1; // +1 to include today
  const todayDate = today.toISOString().split('T')[0];

  // Calculate remaining weeks based on Mondays (Calendar Weeks)
  let remainingWeeks = 1; // Always count current week
  const pointer = new Date(today);
  pointer.setDate(pointer.getDate() + 1); // Start checking from tomorrow

  const endOfMonth = new Date(currentYear, currentMonth - 1, daysInMonth);
  // Reset time part to ensure clean comparison if needed, though dates are clean here.
  
  while (pointer <= endOfMonth) {
    if (pointer.getDay() === 1) { // Monday
        remainingWeeks++;
    }
    pointer.setDate(pointer.getDate() + 1);
  }

  const totalSpentInMonthPerCategory: Record<string, number> = {};
  const spentTodayPerCategory: Record<string, number> = {};

  expenses
    .filter((exp) => exp.date.startsWith(currentMonthYear))
    .forEach((exp) => {
      // Monthly total
      totalSpentInMonthPerCategory[exp.categoryId] =
        (totalSpentInMonthPerCategory[exp.categoryId] || 0) + exp.amount;
      
      // Daily total (if match)
      if (exp.date === todayDate) {
        spentTodayPerCategory[exp.categoryId] = 
          (spentTodayPerCategory[exp.categoryId] || 0) + exp.amount;
      }
    });

  const budgets: Record<string, BudgetMetrics> = {};
  categories.forEach((category) => {
    const spentSoFar = totalSpentInMonthPerCategory[category.id] || 0;
    const remainingMonthlyBudget = category.budgetId - spentSoFar;

    let dailyBudget = 0;
    if (remainingDays <= 0) {
      dailyBudget = remainingMonthlyBudget;
    } else {
      dailyBudget = remainingMonthlyBudget / remainingDays;
    }

    // Weekly Balance Calculation
    let weeklyBalance = 0;
    if (remainingWeeks <= 0) {
        weeklyBalance = remainingMonthlyBudget;
    } else {
        weeklyBalance = remainingMonthlyBudget / remainingWeeks;
    }

    budgets[category.id] = {
      dailyBudget: Math.max(0, dailyBudget),
      weeklyBalance: Math.max(0, weeklyBalance),
      monthlyBalance: remainingMonthlyBudget,
      spentToday: spentTodayPerCategory[category.id] || 0
    };
  });
  return budgets;
};
