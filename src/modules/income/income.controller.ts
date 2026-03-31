import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { IncomeService } from './income.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { AuthUser } from '../auth/types/user.type';
import { CreateIncomeDto } from './dto/create-income.dto';

@UseGuards(JwtAuthGuard)
@Controller('income')
export class IncomeController {
  constructor(private readonly incomeService: IncomeService) {}

  @Get()
  getIncomes(@CurrentUser() user: AuthUser) {
    return this.incomeService.getUserIncome(user.id);
  }

  @Post()
  createIncome(@Body() dto: CreateIncomeDto, @CurrentUser() user: AuthUser) {
    return this.incomeService.createIncome(dto, user.id);
  }
}

