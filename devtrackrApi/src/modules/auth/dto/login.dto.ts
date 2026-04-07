import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @ApiProperty()
  @IsString({ message: 'Password must be a string' })
  password: string;
}
