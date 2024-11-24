import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty() name: string | null;
  @ApiProperty() @IsNotEmpty() @IsEmail() email: string;
  @ApiProperty() @IsNotEmpty() password: string;
  @ApiProperty() @IsNotEmpty() roleId: number;
}
