import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty() name?: string;
  @ApiProperty() @IsOptional() @IsEmail() email?: string;
  @ApiProperty() roleId?: number;
}
