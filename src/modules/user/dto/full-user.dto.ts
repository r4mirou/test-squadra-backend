import { IsEmail, IsNotEmpty } from 'class-validator';

export class FullUserDto {
  @IsNotEmpty() id: number;
  name: string | null;
  @IsNotEmpty() @IsEmail() email: string;
  @IsNotEmpty() password: string;
  @IsNotEmpty() roleId: number;
  @IsNotEmpty() roleName: string;
  @IsNotEmpty() permissions: string[];
}
