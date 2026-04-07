import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/database/prisma.service';

@Injectable()
export class SummaryService {
  constructor(private readonly prisma: PrismaService) {}

  private async totalIncome(userId: string): Promise<number> {
    const result = await this.prisma.income.aggregate({
      _sum: { amount: true },
      where: { userId },
    });
    return result._sum.amount ?? 0;
  }

  private async totalExpenses(userId: string): Promise<number> {
    const result = await this.prisma.expense.aggregate({
      _sum: { amount: true },
      where: { userId },
    });
    return result._sum.amount ?? 0;
  }

  async getFinancialSummary(userId: string) {
    const [totalIncome, totalExpenses] = await Promise.all([
      this.totalIncome(userId),
      this.totalExpenses(userId),
    ]);

    return {
      totalIncome,
      totalExpenses,
      balance: totalIncome - totalExpenses,
    };
  }
}
