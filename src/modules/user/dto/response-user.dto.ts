import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class ResponseUserDto {
  @ApiProperty() @IsNotEmpty() id: number;
  @ApiProperty() @IsOptional() name?: string;
  @ApiProperty() @IsNotEmpty() @IsEmail() email: string;
  @ApiProperty() @IsNotEmpty() roleId: number;
}
