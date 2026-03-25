import { Module } from '@nestjs/common';
import { PrismaModule } from './infrastructure/database/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { IncomeModule } from './modules/income/income.module';
import { ExpensesModule } from './modules/expenses/expenses.module';

@Module({
  imports: [PrismaModule, AuthModule, UsersModule, IncomeModule, ExpensesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}