import { IsDateString, IsNumber, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateIncomeDto {
  @ApiProperty()
  @IsNumber()
  @Min(0, { message: 'Amount must be a positive number' })
  amount: number;

  @ApiProperty()
  @IsString({ message: 'Description must be a string' })
  description: string;

  @ApiProperty()
  @IsDateString({}, { message: 'Date must be a valid ISO date string' })
  date: string;
}
