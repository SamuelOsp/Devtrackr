import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import authConfig from '../../config/auth.config';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';

/** User record safe to return from APIs (no password hash). */
export type SafeUser = Omit<User, 'passwordHash'>;

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto): Promise<SafeUser> {
    const email = dto.email.trim().toLowerCase();

    const existing = await this.usersService.findByEmail(email);
    if (existing) {
      throw new BadRequestException('User already exists');
    }

    const passwordHash = await bcrypt.hash(dto.password, authConfig.saltRounds);

    const user = await this.usersService.create({
      email,
      passwordHash,
      ...(dto.name !== undefined && dto.name !== ''
        ? { name: dto.name.trim() }
        : {}),
    });

    return this.toSafeUser(user);
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const match = await bcrypt.compare(dto.password, user.passwordHash);

    if (!match) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };

    return {
      user: {
        id: user.id,
        email: user.email,
      },
      access_token: this.jwtService.sign(payload),
    };
  }

  private toSafeUser(user: User): SafeUser {
    const { passwordHash: _passwordHash, ...safe } = user;
    void _passwordHash;
    return safe;
  }
}
