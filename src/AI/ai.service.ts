import { GoogleGenerativeAI } from '@google/generative-ai';
import { Injectable } from '@nestjs/common';
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
import fetch from 'node-fetch';
import * as fs from 'fs';
import OpenAI from 'openai';
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
const { Storage } = require('@google-cloud/storage');

@Injectable()
export class ArtificialIntelligenceService {
  constructor() {}

  // parse the text as json object from string
  jsonParser = (text) => {
    let json_text = text;

    json_text = json_text.replace('\n', '');

    // parse the text into a json object
    const obj = JSON.parse(json_text);

    return obj;
  };

  transformFoodData = (data) => {
    return data.map((item) => {
      const key: any = Object.keys(item);
      // Access the "food" key directly if it exists at the top level
      const food = item[key] || item;

      // Return the desired properties (name, description, image) as a flattened object
      return {
        name: food.name,
        description: food.description,
        image: food.image,
      };
    });
  };

  // recommends 10 food based on user preference
  Personalized_Recommendrun = async (
    age,
    gender,
    weight,
    height,
    forbiddenFood,
    favoriteFood,
    UserInformation,
    avoidDishes,
  ) => {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    console.log('Running..... 🏃‍♂️');
    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts:
            "You are Nutrition expert who provides the best dietary recommendation according to a user dietary requirements. You will recommend the user with atleast 20 foods. You will always respond with a JSON response [⚠️ strictly : Do not use '`' in response!]. Follow this template: {message:<message> , recommendations: This is the main key that encompasses all the recommended food options. <message> if the user had any query or just a description of why the list of foods were recommended.  food{number}. Replace {number} with a unique identifier for each recommendation. name:<name of food> Replace <name of food> with the actual name of the recommended dish. description:<food description> Replace <food description> with a brief and appealing description of the dish, including its highlights, main ingredients, or taste profile. image: Replace with a prompting text that will help generate the image for each recommendation}. Give at least 20 food recommendations.",
        },
        {
          role: 'model',
          parts:
            'Hi, tell me your dietary preference and I will recommend you a list of foods you can eat?',
        },
      ],
      // generationConfig: {
      //   maxOutputTokens: 100,
      // },
    });
    let avoidDishesText = '';
    if (avoidDishes) {
      avoidDishesText = `In addition it is extremelly important that the recommendations do not include these dishes: ${avoidDishes}`;
    }

    const msg = `Hello, I am ${age} years old, and I define myself as a ${gender}. My weight is ${weight} Kg and my height is ${height} cm. I cannot eat under any circumstance ${forbiddenFood}. I love eating ${favoriteFood}. Please consider this statement of mine: "${UserInformation}", recommend me the food that I should eat. Among your recommendations I need at least five recommendations for my breakfast, at least five recommendations for my lunch, at least five recommendations for my dinner and at least five recommendations of snacks that I can eat between the main meals. ${avoidDishesText}`;

    const result = await chat.sendMessage(msg);
    const response = result.response;

    const text = response.text();

    const json_obj = this.jsonParser(text);

    json_obj.recommendations = this.transformFoodData(json_obj.recommendations);

    return json_obj;
  };

  // Get Food names form  recommended JSON
  getFoodNames = async (json) => {
    // Get the recommendations array from the JSON
    const recommendations = json.recommendations;

    // Initialize an empty list to store food names
    const foodNames = [];
    const imagePrompt = [];

    // Loop through each recommendation object
    for (const recommendation of recommendations) {
      // Loop through each key-value pair in the recommendation object
      for (const [key, value] of Object.entries(recommendation)) {
        // Check if the key is "name" and extract the food name
        if (key === 'name') {
          foodNames.push(value);
        }
        if (key === 'image') {
          imagePrompt.push(value);
        }
      }
    }
    const foodData = foodNames.map((foodName, index) => {
      return {
        name: foodName,
        prompt: imagePrompt[index],
      };
    });

    console.log(foodNames);

    // Return the list of food names
    return foodData;
  };

  CookGuiderun = async (Dish_name) => {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const foodName = String(Dish_name);

    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts:
            "You are a Nutrition expert with culinary knowledge from all over the world, you recommends food to the user and how to make it. You always respond with a JSON response[⚠️ strictly : Do not use '`' in response! and all fields in the json should be of lower case]. Follow this template: {food_category: this field must specify the category of the dish (e.g., Indian, Indonesian, Vietnamese, Colombian, Peruvian, etc) this field is not restricted to the previous categories but it has to be as specific as possible, food_type: this field can only take four values (dinner, lunch, breakfast or snack) this field must specify in which meal this food should be eaten. image_url:Image URL: Replace <an image url of the food being recommended> with the actual image URL. name: Replace <name of the food> with the actual name of the dish. description: Provide a brief description of the dish, including its origin, main ingredients, and taste profile. procedure: array composed of the cooking steps. ingredients:For each ingredient, specify the following:  name: <The name of the ingredient>. quantity: <The amount of the ingredient needed> it is a string datatype. (e.g., grams, units, pieces, cup, teaspoon, etc.)}. portion:<consider dietary needs + nutrition requirements and specify an amount> this field should reflect the dose or amount of food a person should consume based on their dietary requirements tell the amount of food the person should eat based on the quantity of food judging from the ingredients.",
        },
        {
          role: 'model',
          parts: 'What can I help you make/cook today?',
        },
      ],
    });

    const msg = `How do I make ${foodName}?`;

    const result = await chat.sendMessage(msg);
    const response = result.response;

    const text = response.text();

    const json_obj = JSON.parse(text);
    console.log(json_obj);
    return json_obj;
  };

  retry = (fn, maxRetries = 10, delay = 1000) => {
    return async function (...args) {
      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          return await fn(...args);
        } catch (error) {
          if (attempt < maxRetries) {
            console.error(`Attempt ${attempt} failed: ${error.message}`);
            console.log(`Retrying in ${delay} milliseconds...`);
            await new Promise((resolve) => setTimeout(resolve, delay));
          } else {
            throw error; // Rethrow the error after max retries
          }
        }
      }
    };
  };

  generateFoodImages = async (foodImagesPath, foodData) => {
    const { name, prompt } = foodData;

    try {
      const response = await openai.images.generate({
        model: 'dall-e-2',
        prompt,
        n: 1,
        size: '512x512',
        quality: 'standard',
      });

      const imageUrl = response.data[0].url;
      const generationId = response.created;
      console.log(`Generated Image URL for "${name}": ${imageUrl}`);

      const filename = `${foodImagesPath}/${name}_${generationId}.jpg`;
      const timeoutMillis = 20000;
      const imageResponse = await fetch(imageUrl, {
        timeout: timeoutMillis,
      });
      const buffer = await imageResponse.buffer();
      fs.writeFileSync(filename, buffer);
      console.log(`Image saved as: ${filename}`);
      return filename;
    } catch (error) {
      console.error(`Error generating image for "${name}":`, error);
    }
  };

  uploadImage = async (storage, bucketName, fullLocalFilePath) => {
    try {
      const fileName = fullLocalFilePath.split('/').pop();
      // Uploads a local file to the bucket
      await storage.bucket(bucketName).upload(fullLocalFilePath, {
        destination: fileName,
        public: true,
      });

      const [url] = await storage
        .bucket(bucketName)
        .file(fileName)
        .getSignedUrl({
          action: 'read',
          expires: '01-01-2100',
        });
      return url;
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  storeImageInGCP = async (imagePath) => {
    // Instantiate a Google Cloud Storage client
    const storage = new Storage();

    // Define the name of the bucket and the path to the local image
    const bucketName = 'dish_images';

    return await this.uploadImage(storage, bucketName, imagePath);
  };

  runRespFoodie = async (
    age,
    gender,
    weight,
    height,
    forbiddenFood,
    favoriteFood,
    UserInformation,
    userId,
    avoidDishes,
  ) => {
    // 1. Call the Personalized_Recommendrun() function

    const recom_jtext_retry = this.retry(this.Personalized_Recommendrun);
    const recom_jtext = await recom_jtext_retry(
      age,
      gender,
      weight,
      height,
      forbiddenFood,
      favoriteFood,
      UserInformation,
      avoidDishes,
    );

    // 2. Pass the result to getFoodNames()
    const foodData = await this.getFoodNames(recom_jtext);

    const folderName = `Food_folder_${userId}`;
    fs.mkdir(folderName, (err) => {
      if (err) {
        console.error('Error creating folder:', err);
      } else {
        console.log('Folder created successfully');
      }
    });
    const result = [];
    for (let i = 0; i < foodData.length; i++) {
      const FoodChoice = foodData[i].name;

      //CookGuiderun(FoodChoice)
      const result_retry = this.retry(this.CookGuiderun);
      const data = await result_retry(FoodChoice);
      const imageNamePath = await this.generateFoodImages(
        folderName,
        foodData[i],
      );
      const image_url = await this.storeImageInGCP(imageNamePath);
      data.image_url =
        image_url ||
        'https://storage.googleapis.com/dish_images/generic_dish.png';
      result.push(data);
    }

    // Use fs.rmdir() to delete the folder
    fs.rmdir(folderName, { recursive: true }, (err) => {
      if (err) {
        console.error('Error deleting folder:', err);
      } else {
        console.log('Folder deleted successfully');
      }
    });

    return result;
  };
}
