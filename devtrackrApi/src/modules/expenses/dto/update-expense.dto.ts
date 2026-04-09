import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateExpenseDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'Amount must be a positive number' })
  amount?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString({}, { message: 'Date must be a valid ISO date string' })
  date?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID(4, { message: 'Category ID must be a valid UUID' })
  categoryId?: string;
}
