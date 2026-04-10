import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';

@Injectable()
export class IncomeService {
  constructor(private readonly prisma: PrismaService) {}

  async findUserIncomes(userId: string, limit: number = 20) {
    return this.prisma.income.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
      take: limit,
      select: {
        id: true,
        amount: true,
        description: true,
        date: true,
        createdAt: true,
      },
    });
  }

  async createIncome(dto: CreateIncomeDto, userId: string) {
    return this.prisma.income.create({
      data: {
        amount: dto.amount,
        description: dto.description,
        date: new Date(dto.date),
        userId,
      },
      select: {
        id: true,
        amount: true,
        description: true,
        date: true,
        createdAt: true,
      },
    });
  }

  async updateIncome(id: string, userId: string, dto: UpdateIncomeDto) {
    const updateData: Record<string, unknown> = {};
    if (dto.amount !== undefined) updateData.amount = dto.amount;
    if (dto.description !== undefined) updateData.description = dto.description;
    if (dto.date) updateData.date = new Date(dto.date);

    const { count } = await this.prisma.income.updateMany({
      where: { id, userId },
      data: updateData,
    });

    if (count === 0) {
      throw new NotFoundException('Income not found or unauthorized');
    }

    return { message: 'Income updated successfully' };
  }

  async deleteIncome(id: string, userId: string) {
    const { count } = await this.prisma.income.deleteMany({
      where: { id, userId },
    });

    if (count === 0) {
      throw new NotFoundException('Income not found or unauthorized');
    }

    return { message: 'Income deleted successfully' };
  }
}
