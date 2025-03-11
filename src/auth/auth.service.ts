import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'; 
import { User, UserDocument } from 'src/users/schemas/users.schema';
import { Model } from 'mongoose';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string){
    console.log(email);
    const user = await this.userModel.findOne({ email }).lean();

    if(!user)
      throw new BadRequestException('잘못된 이메일');

    const isPasswordMath = await compare(password, user.password);

    if(!isPasswordMath)
      throw new BadRequestException('잘못된 비밀번호');

    return user;
  }

  async logIn(user){
    return {
      accessToken: this.jwtService.sign(user),
    };
  }


}