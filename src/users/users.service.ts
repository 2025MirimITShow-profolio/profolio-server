import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {

    const hashedPassword = await this.createPassword(createUserDto.password);

    const newUser = new this.userModel({ 
      ...createUserDto, 
      password: hashedPassword 
    });
    
    await newUser.save();
    
    return newUser;
  }

  async createPassword(plainPassword: string): Promise<string> {
        const hashedPassword = await bcrypt.hash(plainPassword, 10);
        return hashedPassword;
  }

}
