import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthDto {
  @ApiProperty() @IsNotEmpty() @IsEmail() email: string;
  @ApiProperty() @IsNotEmpty() password: string;
}

export class AuthResponseDto {
  @ApiProperty() @IsNotEmpty() @IsEmail() accessToken: string;
}
