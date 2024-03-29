import { Body, Controller, Get, Post, Put, Req, Delete } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  @Post('login')
  async login(@Body() body) {
    console.log('login');
    const userId = await this.UsersService.validateUser(body.token);
    return { msg: 'login successful', data: { userId } };
  }

  @Post('register')
  async register(@Body() registerDto) {
    // attributes map from the frontend
    console.log('register');
    const age = registerDto.age;
    const birthdate = registerDto.birthdate;
    const gender = registerDto.gender;
    const height = registerDto.height;
    const name = registerDto.name;
    const weight = registerDto.weight;

    return await this.UsersService.register(
      registerDto.email,
      registerDto.password,
      { age, birthdate, gender, height, name, weight },
    );
  }

  @Get()
  async getUserInformation(@Req() request: any): Promise<any> {
    console.log('users');
    const userData = await this.UsersService.getUserInformation(
      request.query.id,
    );

    return { msg: 'Login successful', data: userData };
  }
  @Put('update_past_prompts')
  async updatePastPrompts(@Req() request: any): Promise<any> {
    console.log('update_past_prompts');
    await this.UsersService.updatePastPrompts(
      request.body.id,
      request.body.data,
    );
    return { msg: 'Successful information update..' };
  }
  @Post('post_past_prompts')
  async postPastPrompts(@Req() request: any): Promise<any> {
    console.log('post_past_prompts');
    await this.UsersService.postPastPrompts(request.body.id, request.body.data);
    return { msg: 'Successful information post' };
  }
  @Post('create_recommendations')
  async createRecommendations(@Req() request: any): Promise<any> {
    console.log('create_recommendations');
    const result = await this.UsersService.createUserRecommendations(
      request.body.id,
      request.body.forbiddenFood,
      request.body.favoriteFood,
      request.body.UserInformation,
      request.body.avoidDishes,
    );
    return { msg: 'Recommendation created successfully', data: result };
  }
  @Post('add_to_favourites')
  async addToFavourites(@Req() request: any): Promise<any> {
    console.log('add_to_favourites');
    await this.UsersService.addToFavourites(
      request.body.id,
      request.body.recommendationId,
    );
    return { msg: 'Recommendation added to favourites successfully' };
  }
  @Delete('remove_from_favourites')
  async removeFromFavourites(@Req() request: any): Promise<any> {
    console.log('remove_from_favourites');
    await this.UsersService.removeFromFavourites(
      request.query.id,
      request.query.recommendationId,
    );
    return { msg: 'Recommendation removed successfully from favourites ' };
  }

  @Post('create_dietary_control')
  async createDietaryControl(@Req() request: any): Promise<any> {
    console.log('create_dietary_control');
    await this.UsersService.createDietaryControl(
      request.body.id,
      request.body.data,
    );
    return { msg: 'Dietary control created successfully' };
  }
  @Post('create_dietary_control_gemini')
  async createDietaryControlGemini(@Req() request: any): Promise<any> {
    console.log('create_dietary_control_gemini');
    const result = await this.UsersService.createDietaryPlan(request.body.id);
    return { msg: 'dietary control created successfully', data: result };
  }

  @Get('trending_foods')
  async getTrendingFoods() {
    console.log('trending_foods');
    return await this.UsersService.getTrendingFood();
  }

  @Get('get_nearby_restaurants')
  async restaurantsNearMe(@Req() request: any): Promise<any> {
    console.log('get_nearby_restaurants');
    request.query.latitude = parseFloat(request.query.latitude);
    request.query.longitude = parseFloat(request.query.longitude);
    const result = await this.UsersService.getNearbyRestaurants(
      request.query.food_name,
      {
        latitude: parseFloat(request.query.latitude),
        longitude: parseFloat(request.query.longitude),
      },
    );
    return { msg: 'Restaurants found!', data: result };
  }
}
