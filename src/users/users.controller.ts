import { Controller, Get, Post, Put, Req } from '@nestjs/common';
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
  @Put('update_past_prompts')
  async updatePastPrompts(@Req() request: any): Promise<any> {
    await this.UsersService.updatePastPrompts(
      request.body.id,
      request.body.data,
    );
    return { msg: 'successful information update' };
  }
  @Post('post_past_prompts')
  async postPastPrompts(@Req() request: any): Promise<any> {
    await this.UsersService.postPastPrompts(request.body.id, request.body.data);
    return { msg: 'successful information post' };
  }
  @Post('create_recommendations')
  async createRecommendations(@Req() request: any): Promise<any> {
    const result = await this.UsersService.createUserRecommendations(
      request.body.id,
      request.body.data,
    );
    return { msg: 'Recommendation created successfully', data: result };
  }
  @Post('add_to_favorites')
  async addToFavorites(@Req() request: any): Promise<any> {
    await this.UsersService.addToFavorites(
      request.body.id,
      request.body.recommendationId,
    );
    return { msg: 'Recommendation added to favorites successfully' };
  }
  @Post('create_dietary_control')
  async createDietaryControl(@Req() request: any): Promise<any> {
    await this.UsersService.createDietaryControl(
      request.body.id,
      request.body.data,
    );
    return { msg: 'dietary control created successfully' };
  }
}
