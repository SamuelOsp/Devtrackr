import { api } from './api';
import { Expense, Category, CreateExpenseDto } from '../types/api.types';

export const expensesService = {
  async getExpenses(): Promise<Expense[]> {
    return api.get('/expenses');
  },

  async createExpense(data: CreateExpenseDto): Promise<Expense> {
    return api.post('/expenses', data);
  },

  async updateExpense(id: string, data: Partial<CreateExpenseDto>): Promise<void> {
    return api.patch(`/expenses/${id}`, data);
  },

  async deleteExpense(id: string): Promise<void> {
    return api.delete(`/expenses/${id}`);
  },

  async getCategories(): Promise<Category[]> {
    return api.get('/categories');
  },
};
