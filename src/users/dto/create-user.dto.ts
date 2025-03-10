import { IsEmail, IsNotEmpty, IsString, IsOptional, IsDate } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  id: string;

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