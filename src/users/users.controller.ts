import { Controller, Get, Post, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { FirebaseService } from '../firebase/firebase.service';

@Controller('users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  @Get()
  async getUserInformation(@Req() request: any): Promise<any> {
    const userData = await this.UsersService.getUserInformation(
      request.body.id,
    );
    return { msg: 'success', data: userData };
  }
  @Post('update_past_prompts')
  async updatePastPrompts(@Req() request: any): Promise<any> {
    await this.UsersService.updatePastPrompts(
      request.body.id,
      request.body.data,
    );
    return { msg: 'successful information post' };
  }
}
