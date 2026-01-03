import React from 'react';
import type { Category, BudgetMetrics } from '../types';

interface CategoryCardProps {
  category: Category;
  metrics?: BudgetMetrics;
  onEdit: (category: Category | null) => void;
  onDelete: (id: string) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, metrics, onEdit, onDelete }) => {
  if (!metrics) {
    return (
        <div className="bg-slate-700 p-4 rounded-lg shadow-md mb-4 flex justify-between items-center">
            <h3 className="text-lg font-bold text-white mb-2">{category.name}</h3>
            <div className="text-slate-400">Loading metrics...</div>
        </div>
    )
  }

  const { dailyBudget, spentToday, weeklyBalance, monthlyBalance } = metrics;
  // Balance for daily is "remaining today" which is dailyBudget (calculated as remaining).
  // But strictly "Balance" usually implies "Remaining".
  // Budget logic: "Daily Budget" IS the remaining amount for today effectively in this app's logic?
  // Let's check budgetCalculations.ts again:
  // dailyBudget = remainingMonthlyBudget / remainingDays (or remainingMonthlyBudget if last day).
  // This is "Amount Available to Spend Today".
  // The card previously showed:
  // Daily Budget: $X
  // Daily Spent: $Y
  // Balance: $Z (Budget - Spent)
  
  // Wait, if "Daily Budget" is calculated based on "Remaining Monthly Budget", does it account for "Spent Today" already?
  // implementation_plan said: "Daily Budget" = remainingMonthlyBudget / remainingDays.
  // "Remaining Monthly Budget" = Total - SpentSoFar (includes today??).
  // `totalSpentInMonthPerCategory` creates sum of ALL expenses in month.
  // YES, it includes today.
  // So `remainingMonthlyBudget` is "Remaining after EVERYTHING spent so far".
  // So `Daily Budget` IS the "Remaining Amount for Today" (roughly).
  // BUT, usually "Budget" means "Allocation".
  // If I spent $10 today. My remaining monthly decreases. My daily budget re-calcs.
  // The previous logic in App.tsx:
  // `balance = dailyBudget - dailySpent` (Visual only in Card).
  // `dailyBudget` passed was the result of calculation.
  
  // Let's stick to what the user asked: "Weekly Balance" and "Monthly Balance".
  // "Weekly Balance" = "How much I can spend for the current week".
  // "Monthly Balance" = "remainingMonthlyBudget".
  
  // Current Display:
  // Name
  // Monthly Budget: (Total Allocation) -> category.budgetId
  // Daily Budget: (Calculated Allocation)
  // Daily Spent: (Actual)
  // Balance: (Daily Remaining)

  // New Display addition:
  // Weekly Balance: (Available for week)
  // Monthly Balance: (Available for month)


  // Actually, wait.
  // Old code: `dailyBudget` (calculated) - `dailySpent` (actual today).
  // If `dailyBudget` is re-calculated dynamically based on TOTAL spent including today...
  // Then `dailyBudget` shrinks as you spend today?
  // Example:
  // Day 1 of 30. Budget 300. Spent 0. Remaining 300. Daily = 300/30 = 10.
  // Spend 5. Spent 5. Remaining 295. Daily = 295/30 = 9.83.
  // So "Daily Budget" acts as "Remaining Daily Average".
  // The user's previous "Balance" = "Daily Budget - Daily Spent" was weird if Daily Budget ALREADY accounted for spending?
  // Or maybe `totalSpentInMonth` filtering in App.tsx logic...
  
  // Let's implement simply and check.
  
  return (
    <div className="bg-slate-700 p-4 rounded-lg shadow-md mb-4 flex justify-between items-center text-slate-100">
      <div>
        <h3 className="text-lg font-bold text-white mb-2">{category.name}</h3>
        <div className="space-y-1 text-sm">
            <p className="text-slate-300">Total Monthly: <span className="text-slate-100">${category.budgetId.toFixed(2)}</span></p>
            
            <div className="my-2 border-t border-slate-600 pt-2">
                <p className="text-emerald-400 font-semibold">Today</p>
                <p>Budget: ${dailyBudget.toFixed(2)}</p>
                <p>Spent: ${spentToday.toFixed(2)}</p>
                {/* Previous code showed Balance = Budget - Spent. If Budget is dynamic, this might be double counting? 
                    If Budget is "Available today", then Balance is "Remaining today". 
                    Let's just show Budget and Spent for now?
                    User requested "balance for the week" and "balance for month".
                */}
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
        <button
          onClick={() => onEdit(category)}
          className="bg-yellow-600 hover:bg-yellow-500 text-white text-xs px-3 py-1 rounded transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(category.id)}
          className="bg-red-600 hover:bg-red-500 text-white text-xs px-3 py-1 rounded transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;
