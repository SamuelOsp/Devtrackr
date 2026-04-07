import { api } from './api';
import { Income, CreateIncomeDto } from '../types/api.types';

export const incomeService = {
  async getIncomes(limit?: number): Promise<Income[]> {
    const params = limit ? { limit } : {};
    return api.get('/income', { params });
  },

  async createIncome(data: CreateIncomeDto): Promise<Income> {
    return api.post('/income', data);
  },

  async updateIncome(id: string, data: Partial<CreateIncomeDto>): Promise<void> {
    return api.patch(`/income/${id}`, data);
  },

  async deleteIncome(id: string): Promise<void> {
    return api.delete(`/income/${id}`);
  },
};
