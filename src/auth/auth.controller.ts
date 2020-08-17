import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CredentialsDto } from './dto/credentials.dto';
import { AuthService } from './auth.service';
import { AccessTokenDto } from './dto/access-token.dto';
import { SignupDto } from './dto/signup.dto';
import { GetUser } from './decorator/get-user.decorator';
import { User } from './entity/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from './dto/user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @ApiOperation({ summary: 'Sign up user' })
  @ApiCreatedResponse({ description: 'Sign up has been successful' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiResponse({
    status: 409,
    description: 'Username already exists',
  })
  signUp(@Body(ValidationPipe) signUpDto: SignupDto): Promise<void> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/signin')
  @ApiOperation({ summary: 'Sign in user' })
  @ApiCreatedResponse({ description: 'JWT access token', type: AccessTokenDto })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials.' })
  signIn(
    @Body(ValidationPipe) createAuthDto: CredentialsDto,
  ): Promise<AccessTokenDto> {
    return this.authService.signIn(createAuthDto);
  }

  @Get('/me')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Authenticated user info.' })
  @ApiUnauthorizedResponse({ description: 'Invalid token.' })
  @ApiOkResponse({ description: 'User info', type: UserDto })
  authInfo(@GetUser() user: User): UserDto {
    return User.toDto(user);
  }
}
