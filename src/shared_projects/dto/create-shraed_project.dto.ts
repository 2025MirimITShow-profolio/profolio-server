import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSharedProjectDto {
  @IsNumber()
  @IsNotEmpty()
  project_id: number;
}
