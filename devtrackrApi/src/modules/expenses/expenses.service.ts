import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Injectable()
export class ExpensesService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserExpenses(userId: string) {
    return this.prisma.expense.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
      select: {
        id: true,
        amount: true,
        description: true,
        date: true,
        createdAt: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async createExpense(userId: string, dto: CreateExpenseDto) {
    return this.prisma.expense.create({
      data: {
        amount: dto.amount,
        description: dto.description,
        date: new Date(dto.date),
        categoryId: dto.categoryId,
        userId,
      },
      select: {
        id: true,
        amount: true,
        description: true,
        date: true,
        createdAt: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async updateExpense(id: string, userId: string, dto: UpdateExpenseDto) {
    const updateData: any = { ...dto };
    if (dto.date) {
      updateData.date = new Date(dto.date);
    }

    const { count } = await this.prisma.expense.updateMany({
      where: { id, userId },
      data: updateData,
    });

    if (count === 0) {
      throw new NotFoundException('Expense not found or unauthorized');
    }

    return { message: 'Expense updated successfully' };
  }

  async deleteExpense(id: string, userId: string) {
    const { count } = await this.prisma.expense.deleteMany({
      where: { id, userId },
    });

    if (count === 0) {
      throw new NotFoundException('Expense not found or unauthorized');
    }

    return { message: 'Expense deleted successfully' };
  }
}
