import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import authConfig from '../../config/auth.config';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from '../users/users.service';

/** User record safe to return from APIs (no password hash). */
export type SafeUser = Omit<User, 'passwordHash'>;

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(dto: RegisterDto): Promise<SafeUser> {
    const email = dto.email.trim().toLowerCase();

    const existing = await this.usersService.findByEmail(email);
    if (existing) {
      throw new BadRequestException('User already exists');
    }

    const passwordHash = await bcrypt.hash(
      dto.password,
      authConfig.saltRounds,
    );

    const user = await this.usersService.create({
      email,
      passwordHash,
      ...(dto.name !== undefined && dto.name !== ''
        ? { name: dto.name.trim() }
        : {}),
    });

    return this.toSafeUser(user);
  }

  private toSafeUser(user: User): SafeUser {
    const { passwordHash: _passwordHash, ...safe } = user;
    void _passwordHash;
    return safe;
  }
}
