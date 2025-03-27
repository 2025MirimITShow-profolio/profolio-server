import { IsEmail, IsNotEmpty, IsString, IsOptional, IsDate } from 'class-validator';

export class CreateUserDto {

  @IsOptional()
  @IsString()
  profile_image?: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  job: string;

  @IsNotEmpty()
  @IsDate()
  birth_date: Date;
}