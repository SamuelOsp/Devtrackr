import { api } from './api';
import { FinancialSummary } from '../types/api.types';

export const summaryService = {
  async getSummary(): Promise<FinancialSummary> {
    return api.get('/summary');
  },
};
