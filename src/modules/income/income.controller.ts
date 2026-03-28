import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('income')
export class IncomeController {
  @UseGuards(JwtAuthGuard)
  @Get('test')
  test() {
    return 'Protected';
  }
}
