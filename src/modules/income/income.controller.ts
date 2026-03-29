import { Controller, Get, Post, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { IncomeService } from './income.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { AuthUser } from '../auth/types/user.type';

@UseGuards(JwtAuthGuard)
@Controller('income')
export class IncomeController {
  constructor(private readonly incomeService: IncomeService) {}

  @Get('me')
  getMe(@CurrentUser() user: AuthUser) {
    return user;
  }

  @Get()
  getIncomes(@CurrentUser() user: AuthUser) {
    return this.incomeService.findUserIncomes(user.id);
  }

  @Post()
  createIncome(@CurrentUser() user: AuthUser, @Body() body: any) {
    return this.incomeService.createIncome(user.id, body);
  }

  @Delete(':id')
  deleteIncome(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    return this.incomeService.deleteIncome(id, user.id);
  }
}
