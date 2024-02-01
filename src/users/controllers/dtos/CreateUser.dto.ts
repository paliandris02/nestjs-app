import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  guid: string;
  @IsNotEmpty()
  first_name: string;
  @IsNotEmpty()
  last_name: string;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  gender: string;
  @IsNotEmpty()
  ip_address: string;
}
