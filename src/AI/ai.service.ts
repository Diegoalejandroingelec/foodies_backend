import { GoogleGenerativeAI } from '@google/generative-ai';
import { Injectable } from '@nestjs/common';
const genAI = new GoogleGenerativeAI("AIzaSyCj1SG26D8ifRrTiTn6h0LTivKlAS1G4Mo");
@Injectable()
export class ArtificialIntelligenceService {
 
    constructor() {}

    // parse the text as json object from string 
    jsonParser = (text)=>{
  
        let json_text = text
        
        json_text = json_text.replace("\n","")
        
        // parse the text into a json object
        const obj = JSON.parse(json_text);
        //console.log(obj)  
        // console.log("DONE..... 🫡");
        return obj
    }

    transformFoodData = (data)=> {
        return data.map(item => {
        const key:any = Object.keys(item);
        // Access the "food" key directly if it exists at the top level
        const food = item[key] || item;
    
        // Return the desired properties (name, description, image) as a flattened object
        return {
            name: food.name,
            description: food.description,
            image: food.image
        };
        });
    }


    // recommends 10 food based on user preference
    Personalized_Recommendrun = async ()=> {
        // For text-only input, use the gemini-pro model
        const model = genAI.getGenerativeModel({ model: "gemini-pro"});
        console.log("Running..... 🏃‍♂️");
        const chat = model.startChat({
        history: [
            {
            role: "user",
            parts: "You are Nutrition expert who provides the best dietary recommendation according to a user dietary requirements. You will recommend the user with atleast 10 foods. You will always respond with a JSON response [⚠️ strictly : Do not use '`' in response!]. Follow this template: {Message:<message> , recommendations: This is the main key that encompasses all the recommended food options. <message> if the user had any query or just a description of why the list of foods were recommended.  food{number}. Replace {number} with a unique identifier for each recommendation. name:<name of food> Replace <name of food> with the actual name of the recommended dish. description:<food description> Replace <food description> with a brief and appealing description of the dish, including its highlights, main ingredients, or taste profile. image: Replace with a prompting text that will help generate the image for each recommendation}. Give at least 10 food recommendations.",
            },
            {
            role: "model",
            parts: "Hi, tell me your dietary preference and I will recommend you a list of foods you can eat?",
            },
        ],
        // generationConfig: {
        //   maxOutputTokens: 100,
        // },
        });
    
        const msg = "Hello I am from Colombia, I like savory, mild food and especially local food that I can make without to many effort. I hate oily and fried foods. I cannot eat pork and I am alergic to garlic and nuts";
    
        const result = await chat.sendMessage(msg);
        const response = result.response;
         //   console.log("GOT 😸: ", response);
    
        const text = response.text();
        
        
        let json_obj = this.jsonParser(text)
        
        json_obj.recommendations = this.transformFoodData(json_obj.recommendations)

        // console.log(json_obj);

        console.log("DONE..... 🫡");

        return json_obj

    }

    // Get Food names form  recommended JSON
    getFoodNames= async (json)=> {
    // Get the recommendations array from the JSON
    const recommendations = json.recommendations;
  
    // Initialize an empty list to store food names
    const foodNames = [];
  
    // Loop through each recommendation object
    for (const recommendation of recommendations) {
      // Loop through each key-value pair in the recommendation object
      for (const [key, value] of Object.entries(recommendation)) {
        // Check if the key is "name" and extract the food name
        if (key === "name") {
          foodNames.push(value);
        }
      }
    }

    console.log("🥲:",foodNames)
    console.log("DONE..... 🫡");
    // Return the list of food names
    return foodNames;
    }

    CookGuiderun= async (Dish_name)=> {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    const foodName = String(Dish_name)
    console.log("Getting guide ....🍽️")
    
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: "You are a Nutrition expert, and recommends food to the user and how to make it. You always respond with a JSON response. Follow this template: {image_url:Image URL: Replace <an image url of the food being recommended> with the actual image URL. name: Replace <name of the food> with the actual name of the dish. description: Provide a brief description of the dish, including its origin, main ingredients, and taste profile. procedure: List the cooking steps in a numbered format, starting with step 1. Ingredients:For each ingredient, specify the following: quantity: <The amount of the ingredient needed> it is a string datatype. name: <The name of the ingredient>. quantifier: <The unit of measurement for the ingredient> (e.g., grams, units, pieces, cup, teaspoon, etc.)}.",
        },
        {
          role: "model",
          parts: "What can I help you make/cook today?",
        },
      ],
      // generationConfig: {
      //   maxOutputTokens: 100,
      // },
    });
    console.log("Cooking..... 🧑‍🍳");
  
    const msg = `How do I make ${foodName}?`;
  
    const result = await chat.sendMessage(msg);
    const response = result.response;
  //   console.log(response);
  
    const text = response.text();
    
    

    console.log("DONE..... 🫡");
    // console.log(json_obj);
    //console.log("BEFORE Parsing ", text);
    //console.log(text);

    console.log(text);

    const json_obj = JSON.parse(text);
    console.log(json_obj);
    return json_obj
    }

    retry=(fn, maxRetries = 5, delay = 1000)=> {
        return async function (...args) {
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
            return await fn(...args);
            } catch (error) {
            if (attempt < maxRetries) {
                console.error(`Attempt ${attempt} failed: ${error.message}`);
                console.log(`Retrying in ${delay} milliseconds...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            } else {
                throw error; // Rethrow the error after max retries
            }
            }
        }
        };
    }

    runRespFoodie = async () => {
        // 1. Call the Personalized_Recommendrun() function

        

        const recom_jtext_retry = this.retry(this.Personalized_Recommendrun);
        const recom_jtext = await recom_jtext_retry();
        console.log("Moving forward ....🚗")
        // 2. Pass the result to getFoodNames()
        const foodNames = await this.getFoodNames(recom_jtext);

        // // Get user input for the desired index
        // const chosenIndex = prompt("Which food name do you want to eat? Enter the index (starting from 0):");

        // // Validate the input
        // const indexNumber = parseInt(chosenIndex);
        // if (isNaN(indexNumber) || indexNumber < 0 || indexNumber >= foodNames.length) {
        //   throw new Error("Invalid index entered. Please enter a valid number within the range of the food names list.");
        // }

        // 3. Use the foodNames array as needed
        let result = []
        for (let i=0; i<foodNames.length; i++){
            const FoodChoice = foodNames[i];
            console.log("We will cook 🧑‍🍳:", foodNames[i]); // Example: Print the food names
            //CookGuiderun(FoodChoice)
            const result_retry = this.retry(this.CookGuiderun)
            const data = await result_retry(FoodChoice);
            result.push(data)
        }
        
        return result
    }


  

}