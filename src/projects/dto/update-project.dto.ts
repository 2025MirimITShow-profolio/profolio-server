import { IsString, IsOptional, IsDateString } from 'class-validator';

export class UpdateProjectDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsDateString()
  start_date: string;

  @IsOptional()
  @IsDateString()
  end_date: string;

  @IsOptional()
  @IsString()
  links?: string;

  @IsOptional()
  @IsString()
  color: string;

  @IsOptional()
  @IsString()
  team_members?: string;

  @IsOptional()
  @IsString()
  skills?: string;

}