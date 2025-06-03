import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from 'src/users/entity/user.entity';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await this.createPassword(createUserDto.password);

    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return await this.userRepository.save(newUser);
  }

  async createPassword(plainPassword: string): Promise<string> {
    return bcrypt.hash(plainPassword, 10);
  }

  async findById(id: number): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) throw new BadRequestException('잘못된 이메일');

    const isPasswordMath = await compare(password, user.password);

    if (!isPasswordMath) throw new BadRequestException('잘못된 비밀번호');

    return user;
  }

  async logIn(user) {
    return {
      accessToken: await this.jwtService.sign({
        sub: user.id,
        email: user.email,
      }),
    };
  }
}
