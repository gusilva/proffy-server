import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CredentialsDto } from './dto/credentials.dto';
import { AuthService } from './auth.service';
import { AccessTokenDto } from './dto/access-token.dto';
import { SignupDto } from './dto/signup.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @ApiResponse({
    status: 409,
    description: 'Username already exists',
  })
  signUp(@Body(ValidationPipe) signUpDto: SignupDto): Promise<void> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/signin')
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials.',
  })
  @ApiResponse({
    status: 201,
    description: 'JWT access token',
  })
  signIn(
    @Body(ValidationPipe) createAuthDto: CredentialsDto,
  ): Promise<AccessTokenDto> {
    return this.authService.signIn(createAuthDto);
  }
}
