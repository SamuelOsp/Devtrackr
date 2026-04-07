import { Module } from '@nestjs/common';
import { IncomeController } from './income.controller';
import { IncomeService } from './income.service';
import { PrismaModule } from '../../infrastructure/database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [IncomeController],
  providers: [IncomeService],
  exports: [IncomeService],
})
export class IncomeModule {}
