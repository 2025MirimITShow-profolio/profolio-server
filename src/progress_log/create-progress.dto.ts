import { IsString, IsOptional, IsArray, IsUrl } from 'class-validator';

export class CreateProgressDto {
  @IsString()
  projectId: string; 

  @IsString()
  title: string; 

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  links: string[]; 

  @IsOptional()
  @IsString()
  content?: string; 
}