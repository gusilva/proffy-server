import { UserRepository } from '../../src/auth/user.repository';
import { Test } from '@nestjs/testing';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from '../../src/auth/entity/user.entity';
import * as bcrypt from 'bcrypt';

const mockCredentialsDto = {
  username: 'mockname',
  lastname: 'mockname',
  email: 'mockemail',
  password: 'mockpass',
};

describe('UserRepository', () => {
  let userRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UserRepository],
    }).compile();

    userRepository = await module.get<UserRepository>(UserRepository);
  });

  describe('signUp', () => {
    let save;

    beforeEach(() => {
      save = jest.fn();

      userRepository.create = jest.fn().mockReturnValue({ save });
    });

    it('should successfully sign up the user', () => {
      save.mockResolvedValue(undefined);
      expect(userRepository.signUp(mockCredentialsDto)).resolves.not.toThrow();
    });

    it('should throw a conflict exception as email already exists', async () => {
      save.mockRejectedValue({ code: 'ER_DUP_ENTRY' });
      await expect(userRepository.signUp(mockCredentialsDto)).rejects.toThrow(
        ConflictException,
      );
    });

    it('should throw a internal server error exception in an unknown problem', async () => {
      save.mockRejectedValue({ code: '124343' });
      await expect(userRepository.signUp(mockCredentialsDto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('validateUserPassword', () => {
    let user;

    beforeEach(() => {
      userRepository.findOne = jest.fn();
      user = new User();
      user.email = 'User@email.com';
      user.validatePassword = jest.fn();
    });

    it('should return the email as validation is successful', async () => {
      userRepository.findOne.mockResolvedValue(user);
      user.validatePassword.mockResolvedValue(true);

      const result = await userRepository.validateUserPassword(
        mockCredentialsDto,
      );
      expect(result).toEqual('User@email.com');
    });

    it('should return null as email cannot be found', async () => {
      userRepository.findOne.mockResolvedValue(null);
      const result = await userRepository.validateUserPassword(
        mockCredentialsDto,
      );
      expect(user.validatePassword).not.toHaveBeenCalled();
      expect(result).toBeNull();
    });

    it('should return null if a password is invalid', async () => {
      userRepository.findOne.mockResolvedValue(user);
      user.validatePassword.mockResolvedValue(false);
      const result = await userRepository.validateUserPassword(
        mockCredentialsDto,
      );
      expect(user.validatePassword).toHaveBeenCalled();
      expect(result).toBeNull();
    });
  });

  describe('hashPassword', () => {
    it('should call bcrypt.hash to generate a hash', async () => {
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('testHash');
      expect(bcrypt.hash).not.toHaveBeenCalled();

      const result = await userRepository.hashPassword('testPass', 'testSalt');
      expect(bcrypt.hash).toHaveBeenCalledWith('testPass', 'testSalt');
      expect(result).toEqual('testHash');
    });
  });
});
