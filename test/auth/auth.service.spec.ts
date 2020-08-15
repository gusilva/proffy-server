import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../src/auth/auth.service';
import { UserRepository } from '../../src/auth/user.repository';
import { JwtService } from '@nestjs/jwt';
import { ConflictException, UnauthorizedException } from '@nestjs/common';

const mockCredentialsDto = {
  email: 'mockemail',
  password: 'mockpass',
};

const mockUserRepository = () => ({
  validateUserPassword: jest.fn(),
});

const mockJwtService = () => ({
  sign: jest.fn(),
});

describe('AuthService', () => {
  let authService;
  let userRepository;
  let jwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserRepository, useFactory: mockUserRepository },
        { provide: JwtService, useFactory: mockJwtService },
      ],
    }).compile();

    authService = await module.get<AuthService>(AuthService);
    userRepository = await module.get<UserRepository>(UserRepository);
    jwtService = await module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('signIn', () => {
    it('should return the access token', async () => {
      userRepository.validateUserPassword.mockResolvedValue('test@me.com');
      jwtService.sign.mockResolvedValue('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');

      const result = await authService.signIn(mockCredentialsDto);
      expect(userRepository.validateUserPassword).toBeCalledWith(
        mockCredentialsDto,
      );
      expect(jwtService.sign).toBeCalledWith({ email: 'test@me.com' });
      expect(result).toEqual({
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
      });
    });

    it('should thrown unauthorized exception when email is not found', async () => {
      userRepository.validateUserPassword.mockResolvedValue(null);

      await expect(authService.signIn(mockCredentialsDto)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(jwtService.sign).not.toHaveBeenCalled();
    });
  });
});
