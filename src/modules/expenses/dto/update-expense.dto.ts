import { IsDateString, IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class UpdateExpenseDto {
  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'Amount must be a positive number' })
  amount?: number;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;

  @IsOptional()
  @IsDateString({}, { message: 'Date must be a valid ISO date string' })
  date?: string;

  @IsOptional()
  @IsUUID(4, { message: 'Category ID must be a valid UUID' })
  categoryId?: string;
}
