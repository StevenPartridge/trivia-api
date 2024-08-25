import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(walletAddress: string): Promise<any> {
    const user = await this.usersService.findOne(walletAddress);
    if (user) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { walletAddress: user.wallet_address, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
