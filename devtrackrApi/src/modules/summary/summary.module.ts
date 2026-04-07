import { Module } from '@nestjs/common';
import { SummaryService } from './summary.service';
import { SummaryController } from './summary.controller';
import { PrismaModule } from '../../infrastructure/database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SummaryController],
  providers: [SummaryService],
})
export class SummaryModule {}
