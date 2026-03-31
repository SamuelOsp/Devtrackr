import { IsDateString, IsNumber, IsString, Min } from 'class-validator';

export class CreateIncomeDto {
  @IsNumber()
  @Min(0, { message: 'Amount must be a positive number' })
  amount: number;

  @IsString({ message: 'Description must be a string' })
  description: string;

  @IsDateString({}, { message: 'Date must be a valid ISO date string' })
  date: string;
}
