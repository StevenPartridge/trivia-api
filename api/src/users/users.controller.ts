import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../../../models/src/entities/User';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() user: Partial<User>): Promise<User> {
    return this.usersService.create(user);
  }

  @Get(':walletAddress')
  async findOne(
    @Param('walletAddress') walletAddress: string,
  ): Promise<User | undefined> {
    return this.usersService.findOne(walletAddress);
  }
}
