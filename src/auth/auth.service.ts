import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/signin.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  // async validateUser(signInDto: SignInDto) {
  //   const { username, password } = signInDto;

  //   const user = await this.usersService.findByUsername(username);
  //   if (!user) {
  //     throw new UnauthorizedException('User not found');
  //   }
  //   const isPasswordValid = await bcrypt.compare(password, user.password);
  //   if (!isPasswordValid) {
  //     throw new UnauthorizedException('Invalid password');
  //   }
  //   const payload = { id: user.id, username: user.username };
  //   console.log(payload);
  //   return {
  //     access_token: this.jwtService.sign(payload),
  //   };
  // }

  async validateUser({ username, password }: SignInDto) {
    const user = await this.usersService.findByUsername(username);

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { id: user.id, username: user.username };
      return payload;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(user: any) {
    const payload = { username: user.username, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signUp(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  async protecc(userId: number) {
    return 'token valid for' + userId;
  }
}
