import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/database/prisma.service';

@Injectable()
export class IncomeService {
  constructor(private readonly prisma: PrismaService) {}

  async findUserIncomes(userId: string) {
    return this.prisma.income.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
    });
  }

  async createIncome(
    userId: string,
    data: { amount: number; source: string; description?: string; date: Date },
  ) {
    return this.prisma.income.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  async deleteIncome(id: string, userId: string) {
    return this.prisma.income.deleteMany({
      where: {
        id,
        userId,
      },
    });
  }
}
