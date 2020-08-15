import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { CredentialsDto } from './dto/credentials.dto';
import { AccessTokenDto } from './dto/access-token.dto';
import { JwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignupDto): Promise<void> {
    return this.userRepository.signUp(signUpDto);
  }

  async signIn(credentialsDto: CredentialsDto): Promise<AccessTokenDto> {
    const email = await this.userRepository.validateUserPassword(
      credentialsDto,
    );

    if (!email) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const payload: JwtPayload = { email };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }
}
