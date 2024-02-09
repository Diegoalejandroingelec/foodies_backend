import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { ArtificialIntelligenceService } from 'src/AI/ai.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly artificialIntelligenceService: ArtificialIntelligenceService,
  ) {}
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
      );

    for (const recommendation of recommendations) {
      console.log(recommendation);
      await this.firebaseService.createUserRecommendations(
        recommendation,
        userId,
      );
    }
  }
  async addToFavorites(userId, recommendationId) {
    await this.firebaseService.addRecommendationToFavorites(
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
}
