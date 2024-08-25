import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { User } from '../../../models/src/entities/User';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  async register(@Body() user: Partial<User>) {
    const newUser = await this.usersService.create(user);
    return this.authService.login(newUser);
  }

  @Post('login')
  async login(@Body('wallet_address') walletAddress: string) {
    const user = await this.usersService.findOne(walletAddress);
    if (!user) {
      throw new UnauthorizedException('Invalid wallet address');
    }
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
