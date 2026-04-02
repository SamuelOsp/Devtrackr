import { Controller, Get, Post, Body, UseGuards, Patch, Param, Delete } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ExpensesService } from './expenses.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { AuthUser } from '../auth/types/user.type';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@UseGuards(JwtAuthGuard)
@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Get()
  getExpenses(
    @CurrentUser() user: AuthUser,
  ) {
    return this.expensesService.getUserExpenses(user.id);
  }

  @Post()
  createExpense(@Body() dto: CreateExpenseDto, @CurrentUser() user: AuthUser) {
    return this.expensesService.createExpense(user.id, dto);
  }

  @Patch(':id')
  updateExpense(
    @Param('id') id: string,
    @Body() dto: UpdateExpenseDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.expensesService.updateExpense(id, user.id, dto);
  }

  @Delete(':id')
  deleteExpense(
    @Param('id') id: string,
    @CurrentUser() user: AuthUser,
  ) {
    return this.expensesService.deleteExpense(id, user.id);
  }
}
