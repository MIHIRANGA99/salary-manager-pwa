export interface Category {
  id: string;
  name: string;
  budgetId: number;
}

export interface Expense {
  id: string;
  categoryId: string;
  amount: number;
  date: string;
}
