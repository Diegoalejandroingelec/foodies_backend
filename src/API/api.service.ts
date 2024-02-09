const axios = require('axios');

import { Injectable } from '@nestjs/common';

@Injectable()
export class APIService {
  constructor() {}

  searchNearbyRestaurants(foodName, location) {
    // Validate input data (optional)
    const searchQuery = `${foodName} near me`;
    
    const data = {
      textQuery: searchQuery,
      openNow: true,
      maxResultCount: 7,
      rankPreference: "DISTANCE",
      locationBias: {
        circle: {
          center: {
            latitude: location.latitude,
            longitude: location.longitude,
          },
          radius: 700,
        },
      },
    };
  
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://places.googleapis.com/v1/places:searchText',
      headers: { 
          'Content-Type': 'application/json', 
          'X-Goog-Api-Key': process.env.GOOGLE_MAPS_API_KEY, 
          'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.rating,places.googleMapsUri'  // rating and url
        },
      data,
    };
  
    try {
      const response = axios.request(config);
      if (response) {
          const data = response.data.places.map(data => {
              return {
                  "address": data.formattedAddress, "rating": data.rating, "gmaps_url": data.googleMapsUri, "name": data.displayName.text
              }
          })
          console.log("Response: ", data)
          // console.log("\n Name: ", response.data.places[0]['displayName'])
          
      } else {
        console.log('No results found for your search.');
      }
    } catch (error) {
      console.error('Error searching places:', error);
      // Handle the error more specifically
    }
  }
  
 
}
