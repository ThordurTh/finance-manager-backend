import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AdminGuard } from './guards/admin-user.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Guard checks if the request contains a user object that matches one in the database
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('test')
  getProtectedRoute() {
    return "You're in";
  }
  @UseGuards(AdminGuard)
  @Get('test2')
  getRoleProtectedRoute() {
    return "You're an admin";
  }
}
