import { EntityRepository, Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { CredentialsDto } from './dto/credentials.dto';
import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(signUpDto: SignupDto): Promise<void> {
    const { email, password, lastname, username } = signUpDto;

    const user = this.create();
    user.email = email;
    user.username = username;
    user.lastname = lastname;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Email already exists.');
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  async validateUserPassword(credentialsDto: CredentialsDto): Promise<string> {
    const { email, password } = credentialsDto;
    const user = await this.findOne({ email });

    if (user && (await user.validatePassword(password))) {
      return user.email;
    } else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
