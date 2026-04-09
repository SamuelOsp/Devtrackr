import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateIncomeDto {
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
}
