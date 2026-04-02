import { Module } from '@nestjs/common';
import { PrismaModule } from './infrastructure/database/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { IncomeModule } from './modules/income/income.module';
import { ExpensesModule } from './modules/expenses/expenses.module';
import { CategoriesModule } from './modules/categories/categories.module';

@Module({
  imports: [PrismaModule, AuthModule, UsersModule, IncomeModule, ExpensesModule, CategoriesModule],
})
export class AppModule {}
