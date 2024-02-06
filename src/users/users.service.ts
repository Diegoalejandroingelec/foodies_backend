import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class UsersService {
  constructor(private readonly firebaseService: FirebaseService) {}
  async getUserInformation(user_id): Promise<any> {
    const User = this.firebaseService.getDocumentbyId('Users', user_id);
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

    return userData;
  }

  async updatePastPrompts(user_id, data) {
    await this.firebaseService.appendElementToField(
      'Users',
      user_id,
      data,
      'past_prompts',
    );
  }
}
