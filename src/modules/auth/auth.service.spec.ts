import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

describe('AuthService', () => {
  let service: AuthService;

  const usersServiceMock = {
    findByEmail: jest.fn(),
    create: jest.fn(),
  };

  const jwtServiceMock = {
    sign: jest.fn().mockReturnValue('mocked-jwt-token'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersServiceMock },
        { provide: JwtService, useValue: jwtServiceMock },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should hash password before persisting', async () => {
    usersServiceMock.findByEmail.mockResolvedValue(null);
    usersServiceMock.create.mockImplementation(async (data) => ({
      id: 'test-id',
      email: data.email,
      passwordHash: data.passwordHash,
      name: data.name ?? null,
      createdAt: new Date('2025-01-01T00:00:00.000Z'),
      updatedAt: new Date('2025-01-01T00:00:00.000Z'),
    }));

    const dto = { email: 'test@test.com', password: '123456' };
    const result = await service.register(dto);

    expect(usersServiceMock.create).toHaveBeenCalledWith(
      expect.objectContaining({
        email: 'test@test.com',
        passwordHash: expect.not.stringMatching(/^123456$/),
      }),
    );
    expect(result).not.toHaveProperty('passwordHash');
    expect((result as { passwordHash?: string }).passwordHash).toBeUndefined();
  });

  it('should reject duplicate email', async () => {
    usersServiceMock.findByEmail.mockResolvedValue({
      id: 'existing',
      email: 'taken@test.com',
      passwordHash: 'hash',
      name: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await expect(
      service.register({ email: 'taken@test.com', password: '123456' }),
    ).rejects.toThrow(BadRequestException);
  });

  it('should return access_token on valid login', async () => {
    const hashedPassword = await bcrypt.hash('123456', 10);

    usersServiceMock.findByEmail.mockResolvedValue({
      id: 'user-id',
      email: 'test@test.com',
      passwordHash: hashedPassword,
      name: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const dto = { email: 'test@test.com', password: '123456' };
    const result = await service.login(dto);

    expect(result.access_token).toBeDefined();
    expect(result.user).toEqual({ id: 'user-id', email: 'test@test.com' });
    expect(jwtServiceMock.sign).toHaveBeenCalledWith({
      sub: 'user-id',
      email: 'test@test.com',
    });
  });

  it('should throw UnauthorizedException for invalid credentials', async () => {
    usersServiceMock.findByEmail.mockResolvedValue(null);

    await expect(
      service.login({ email: 'wrong@test.com', password: '123456' }),
    ).rejects.toThrow(UnauthorizedException);
  });
});
