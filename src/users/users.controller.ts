import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('api/user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  
}
