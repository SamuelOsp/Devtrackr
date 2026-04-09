import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Query,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { IncomeService } from './income.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { AuthUser } from '../auth/types/user.type';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';

@ApiTags('Income')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('income')
export class IncomeController {
  constructor(private readonly incomeService: IncomeService) {}

  @Get()
  getIncomes(@CurrentUser() user: AuthUser, @Query('limit') limit?: string) {
    const take = limit ? parseInt(limit, 10) : 20;
    return this.incomeService.findUserIncomes(user.id, take);
  }

  @Post()
  createIncome(@Body() dto: CreateIncomeDto, @CurrentUser() user: AuthUser) {
    return this.incomeService.createIncome(dto, user.id);
  }

  @Patch(':id')
  updateIncome(
    @Param('id') id: string,
    @Body() dto: UpdateIncomeDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.incomeService.updateIncome(id, user.id, dto);
  }

  @Delete(':id')
  deleteIncome(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    return this.incomeService.deleteIncome(id, user.id);
  }
}
