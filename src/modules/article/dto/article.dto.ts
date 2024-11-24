import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ArticleDto {
  @ApiProperty() @IsNotEmpty() id: number;
  @ApiProperty() @IsNotEmpty() title: string;
  @ApiProperty() @IsNotEmpty() content: string;
  @ApiProperty() @IsNotEmpty() userId: number;
}
