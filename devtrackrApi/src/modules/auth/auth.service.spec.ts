import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;
  let usersService: jest.Mocked<Partial<UsersService>>;
  let jwtService: jest.Mocked<Partial<JwtService>>;

  const mockUsersService = {
    findByEmail: jest.fn(),
    create: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    const registerDto = {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
    };

    it('should register a user successfully', async () => {
      mockUsersService.findByEmail.mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed_password');
      mockUsersService.create.mockResolvedValue({
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
        passwordHash: 'hashed_password',
      });

      const result = await service.register(registerDto);

      expect(mockUsersService.findByEmail).toHaveBeenCalledWith(
        'test@example.com',
      );
      expect(bcrypt.hash).toHaveBeenCalledWith(
        'password123',
        expect.any(Number),
      );
      expect(mockUsersService.create).toHaveBeenCalledWith({
        email: 'test@example.com',
        passwordHash: 'hashed_password',
        name: 'Test User',
      });
      expect(result).toEqual({
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
      });
    });

    it('should throw if user already exists', async () => {
      mockUsersService.findByEmail.mockResolvedValue({ id: 1 });

      await expect(service.register(registerDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(mockUsersService.findByEmail).toHaveBeenCalledWith(
        'test@example.com',
      );
      expect(mockUsersService.create).not.toHaveBeenCalled();
    });

    it('should hash the password on register', async () => {
      mockUsersService.findByEmail.mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('secure_hash');
      mockUsersService.create.mockResolvedValue({
        id: 1,
        email: 'test@example.com',
        passwordHash: 'secure_hash',
      });

      await service.register(registerDto);

      expect(bcrypt.hash).toHaveBeenCalledWith(
        'password123',
        expect.any(Number),
      );
      expect(mockUsersService.create).toHaveBeenCalledWith(
        expect.objectContaining({
          passwordHash: 'secure_hash',
        }),
      );
    });
  });

  describe('login', () => {
    const loginDto = {
      email: 'test@example.com',
      password: 'password123',
    };

    it('should login successfully and return access_token', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        passwordHash: 'hashed_password',
      };

      mockUsersService.findByEmail.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      mockJwtService.sign.mockReturnValue('mock_jwt_token');

      const result = await service.login(loginDto);

      expect(mockUsersService.findByEmail).toHaveBeenCalledWith(
        'test@example.com',
      );
      expect(bcrypt.compare).toHaveBeenCalledWith(
        'password123',
        'hashed_password',
      );
      expect(mockJwtService.sign).toHaveBeenCalledWith({
        sub: mockUser.id,
        email: mockUser.email,
      });

      expect(result).toEqual({
        user: {
          id: mockUser.id,
          email: mockUser.email,
        },
        access_token: 'mock_jwt_token',
      });
    });

    it('should throw on invalid password', async () => {
      mockUsersService.findByEmail.mockResolvedValue({
        id: 1,
        email: 'test@example.com',
        passwordHash: 'hashed_password',
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(service.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(bcrypt.compare).toHaveBeenCalledWith(
        'password123',
        'hashed_password',
      );
      expect(mockJwtService.sign).not.toHaveBeenCalled();
    });
  });
});
