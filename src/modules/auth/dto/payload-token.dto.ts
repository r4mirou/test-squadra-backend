import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class PayloadTokenDto {
  @IsNotEmpty() sub: number;
  @IsNotEmpty() role: string;
  @IsNotEmpty() permissions: string[];
}
