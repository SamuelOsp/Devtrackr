export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
}

export interface Income {
  id: string;
  amount: number;
  source: string;
  description?: string;
  date: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Expense {
  id: string;
  amount: number;
  description: string;
  date: string;
  createdAt: string;
  category: Category;
}

export interface FinancialSummary {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
}

export interface CreateIncomeDto {
  amount: number;
  source: string;
  description?: string;
  date: string;
}

export interface CreateExpenseDto {
  amount: number;
  description: string;
  date: string;
  categoryId: string;
}
