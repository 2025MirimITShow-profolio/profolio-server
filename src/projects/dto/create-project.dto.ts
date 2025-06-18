import { IsString, IsNotEmpty, IsOptional, IsDateString } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  start_date: string;

  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  end_date: string;

  @IsOptional()
  @IsString()
  links?: string;

  @IsNotEmpty()
  @IsString()
  color: string;

  @IsOptional()
  @IsString()
  team_members?: string;

  @IsOptional()
  @IsString()
  member_profile?: string;

  @IsOptional()
  @IsString()
  skills?: string;

}