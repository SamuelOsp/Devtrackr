import { IsDateString, IsNumber, IsString, IsUUID, Min } from 'class-validator';

export class CreateExpenseDto {
  @IsNumber()
  @Min(0, { message: 'Amount must be a positive number' })
  amount: number;

  @IsString({ message: 'Description must be a string' })
  description: string;

  @IsDateString({}, { message: 'Date must be a valid ISO date string' })
  date: string;

  @IsUUID(4, { message: 'Category ID must be a valid UUID' })
  categoryId: string;
}
