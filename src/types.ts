export interface Category {
  id: string;
  name: string;
  budgetId: number;
  showWeeklyBalance?: boolean;
}

export interface Expense {
  id: string;
  categoryId: string;
  amount: number;
  date: string;
}

export interface BudgetMetrics {
  dailyBudget: number;
  weeklyBalance: number;
  monthlyBalance: number;
  spentToday: number;
}

export interface CategorySummary {
  categoryId: string;
  categoryName: string;
  allocatedBudget: number;
  totalSpent: number;
  saved: number; // Allocated - Spent
}

export interface MonthHistory {
  id: string; // "YYYY-MM"
  monthLabel: string; // "January 2026"
  salary: number;
  totalSpent: number;
  totalSaved: number; // Salary - TotalSpent
  categories: CategorySummary[];
}
