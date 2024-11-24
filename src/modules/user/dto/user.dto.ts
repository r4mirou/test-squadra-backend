import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserDto {
  @IsNotEmpty() id: number;
  name: string | null;
  @IsNotEmpty() @IsEmail() email: string;
  @IsNotEmpty() roleId: number;
}
