import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from 'src/users/entity/user.entity';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string){

    const user = await this.userRepository.findOne({where: {email}});

    if(!user)
      throw new BadRequestException('잘못된 이메일');

    const isPasswordMath = await compare(password, user.password);

    if(!isPasswordMath)
      throw new BadRequestException('잘못된 비밀번호');

    return user;
  }

  async logIn(user){
    return {
      accessToken: this.jwtService.sign({ userId: user.id, email: user.email }),
    };
  }

}