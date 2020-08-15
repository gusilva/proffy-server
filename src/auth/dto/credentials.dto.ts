import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength, MaxLength, Matches } from 'class-validator';

export class CredentialsDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$%^&]).*$/, {
    message: 'password too weak.',
  })
  password: string;
}
