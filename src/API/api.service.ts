const axios = require('axios');

import { Injectable } from '@nestjs/common';

@Injectable()
export class APIService {
  constructor() {}

  async searchNearbyRestaurants(foodName, location) {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json`;
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    try {
      const response = await axios.get(url, {
        params: {
          location: `${location.latitude},${location.longitude}`,
          radius: 10000,
          type: 'restaurant',
          keyword: foodName,
          key: apiKey,
        },
      });

      const places = response.data.results.map((place) => {
        return {
          name: place.name,
          address: place.vicinity,
          rating: place.rating,
          gmaps_url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            place.name,
          )}+${place.geometry.location.lat},${place.geometry.location.lng}`,
        };
      });

      return places;
    } catch (error) {
      console.error('Error occurred:', error);
      throw error;
    }
  }
}
