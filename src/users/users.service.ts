import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { User } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findUser(id: number): Promise<User> {
    try {
      console.log(id);
      const user = await this.userRepository.findOneBy({ id });
      if (!user) {
        throw new NotFoundException('User not found.');
      }

      return user;
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw err;
      }
      throw new InternalServerErrorException('Failed to retrieve user');
    }
  }

  async updateUserInfo(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    try {
      const user = await this.userRepository.findOneBy({ id });
      if (!user) {
        throw new NotFoundException('User not found.');
      }

      const updatedUser = {
        ...user,
        ...updateUserDto,
      };

      return await this.userRepository.save(updatedUser);
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw err;
      }
      throw new InternalServerErrorException('Failed to update user');
    }
  }
}
