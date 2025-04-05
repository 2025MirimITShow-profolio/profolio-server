import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {

    const hashedPassword = await this.createPassword(createUserDto.password);

    const newUser = this.userRepository.create({ 
      ...createUserDto, 
      password: hashedPassword 
    });
        
    return this.userRepository.save(newUser);
  }

  async createPassword(plainPassword: string): Promise<string> {
        return bcrypt.hash(plainPassword, 10);
  }

  async findById(id: number): Promise<User> {
    return this.userRepository.findOneBy({id});
  }

}
