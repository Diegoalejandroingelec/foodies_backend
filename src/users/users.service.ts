import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { ArtificialIntelligenceService } from 'src/AI/ai.service';
import { APIService } from 'src/API/api.service';
import { userInfo } from 'os';

@Injectable()
export class UsersService {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly artificialIntelligenceService: ArtificialIntelligenceService,
    private readonly apiService: APIService,
  ) {}
  async createDietaryPlan(userId) {
    const User = this.firebaseService.getDocumentbyId('Users', userId);
    const UserSnapshot = await User.get();
    const userData = UserSnapshot.data();
    const recommendationsMainData = [];
    for (let i = 0; i < userData.food_recommendations.length; i++) {
      const recommendation = userData.food_recommendations[i];
      const collection =
        recommendation.food_recommendation_id._path.segments[0];
      const id = recommendation.food_recommendation_id._path.segments[1];

      const recommendation_info = await this.firebaseService
        .getDocumentbyId(collection, id)
        .get();
      const data = recommendation_info.data();
      if (!recommendation.used) {
        recommendationsMainData.push({
          name: data.name,
          description: data.description,
          food_type: data.food_type,
          inner_id: recommendation.id,
          id: id,
        });
      }
    }

    const dietaryPlan =
      await this.artificialIntelligenceService.personalizedDietaryPlan(
        recommendationsMainData,
      );

    for (const meal in dietaryPlan) {
      for (let i = 0; i < userData.food_recommendations.length; i++) {
        if (
          userData.food_recommendations[i].id === dietaryPlan[meal].inner_id
        ) {
          userData.food_recommendations[i].used = true;
        }
      }
    }
    await this.firebaseService.postNewFieldToDocument(
      'Users',
      userId,
      userData.food_recommendations,
      'food_recommendations',
    );
    await this.firebaseService.postNewFieldToDocument(
      'Users',
      userId,
      dietaryPlan,
      'dietary_control',
    );
  }
  async getUserInformation(userId): Promise<any> {
    const User = this.firebaseService.getDocumentbyId('Users', userId);
    const UserSnapshot = await User.get();

    const userData = UserSnapshot.data();

    for (let i = 0; i < userData.food_recommendations.length; i++) {
      const recommendation = userData.food_recommendations[i];
      const collection =
        recommendation.food_recommendation_id._path.segments[0];
      const id = recommendation.food_recommendation_id._path.segments[1];

      const recommendation_info = await this.firebaseService
        .getDocumentbyId(collection, id)
        .get();

      userData.food_recommendations[i].food_recommendation =
        recommendation_info.data();
      userData.food_recommendations[i].food_recommendation.food_id = id;

      delete userData.food_recommendations[i].food_recommendation_id;
    }

    for (let i = 0; i < userData.favourites.length; i++) {
      const favourites = userData.favourites[i];

      const collection = favourites._path.segments[0];
      const id = favourites._path.segments[1];

      const favourites_info = await this.firebaseService
        .getDocumentbyId(collection, id)
        .get();

      userData.favourites[i] = favourites_info.data();
      userData.favourites[i].food_id = id;
    }
    for (const key in userData.dietary_control) {
      const recommendation_id = userData.dietary_control[key];
      let mealFound;
      userData.food_recommendations.forEach((element) => {
        if (element.id === recommendation_id) {
          mealFound = element;
        }
      });
      userData.dietary_control[key] = mealFound;
    }

    return userData;
  }

  async updatePastPrompts(userId, data) {
    await this.firebaseService.appendElementToField(
      'Users',
      userId,
      data,
      'past_prompts',
    );
  }

  async postPastPrompts(userId, data) {
    await this.firebaseService.postNewFieldToDocument(
      'Users',
      userId,
      data,
      'past_prompts',
    );
  }
  async createUserRecommendations(
    userId,
    forbiddenFood,
    favoriteFood,
    UserInformation,
    avoidDishes,
  ) {
    const User = this.firebaseService.getDocumentbyId('Users', userId);
    const UserSnapshot = await User.get();
    const userData = UserSnapshot.data();

    const recommendations =
      await this.artificialIntelligenceService.runRespFoodie(
        userData.age,
        userData.gender,
        userData.weight,
        userData.height,
        forbiddenFood,
        favoriteFood,
        UserInformation,
        userId,
        avoidDishes,
      );
    await this.firebaseService.updateUserPrompt(
      userId,
      forbiddenFood,
      UserInformation,
      favoriteFood,
    );
    for (const recommendation of recommendations) {
      await this.firebaseService.createUserRecommendations(
        recommendation,
        userId,
      );
    }
  }
  async addToFavourites(userId, recommendationId) {
    await this.firebaseService.addRecommendationToFavourites(
      userId,
      recommendationId,
    );
  }
  async removeFromFavourites(userId, recommendationId) {
    await this.firebaseService.removeRecommendationFromFavourites(
      userId,
      recommendationId,
    );
  }
  async createDietaryControl(userId, data) {
    await this.firebaseService.postNewFieldToDocument(
      'Users',
      userId,
      data,
      'dietary_control',
    );
  }

  async getNearbyRestaurants(foodName, location) {
    const result = await this.apiService.searchNearbyRestaurants(
      foodName,
      location,
    );
    return result;
  }
  async token(email) {
    return this.firebaseService.token(email);
  }
  async validateUser(idToken) {
    return await this.firebaseService.verifyToken(idToken);
  }
  async register(email, password, userInfo) {
    await this.firebaseService.register(email, password, userInfo);
  }
  async getTrendingFood() {
    return await this.firebaseService.getTopFoodRecommendations();
  }
}
