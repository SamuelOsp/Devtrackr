import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { CreateIncomeDto } from './dto/create-income.dto';

@Injectable()
export class IncomeService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserIncome(userId: string) {
    return this.prisma.income.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
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
}

