import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
const nodemailer = require('nodemailer');

dotenv.config();

@Injectable()
export class FirebaseService {
  private firebaseAdmin: admin.app.App;
  private firestore: admin.firestore.Firestore;
  private FieldValue: typeof admin.firestore.FieldValue;
  constructor() {
    // Path to your Firebase service account key file
    const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

    // Initialize the Firebase Admin SDK
    this.firebaseAdmin = admin.initializeApp({
      credential: admin.credential.cert(serviceAccountPath),
    });
    // Access Firestore
    this.firestore = admin.firestore();

    // Access FieldValue
    this.FieldValue = admin.firestore.FieldValue;
  }

  // Example method to get Firestore
  getDocumentbyId(collection, id) {
    const db = this.firebaseAdmin.firestore();
    return db.collection(collection).doc(id);
  }
  async appendElementToField(collection, id, data, fieldName) {
    const db = this.firestore;

    // Reference to the collection and document
    const docRef = db.collection(collection).doc(id);

    // Update the document with arrayUnion
    await docRef.update({
      [fieldName]: this.FieldValue.arrayUnion(data),
    });
  }
  async postNewFieldToDocument(collection, id, data, fieldName) {
    const docRef = this.firestore.collection(collection).doc(id);

    await docRef.update({
      [fieldName]: data,
    });
  }
  async updateUserPrompt(userId, forbiddenFood, UserInformation, favoriteFood) {
    const userRef = this.firestore.collection('Users').doc(userId);
    await userRef.update({
      forbidden_ingredients: forbiddenFood.split(','),
      taste_preferences: favoriteFood.split(','),
    });
    await userRef.update({
      past_prompts: this.FieldValue.arrayUnion(UserInformation),
    });
  }
  async createUserRecommendations(userRecommendationData, userId) {
    const collectionRef = this.firestore.collection('Food_Recommendation');
    const portionInfo = userRecommendationData.portion;
    delete userRecommendationData.portion;
    userRecommendationData.likes = 0;
    const recommendationRef = await collectionRef.add(userRecommendationData);

    const userRef = this.firestore.collection('Users').doc(userId);
    const newId = uuidv4();
    console.log(portionInfo);
    await userRef.update({
      food_recommendations: this.FieldValue.arrayUnion({
        food_recommendation_id: recommendationRef,
        portion: portionInfo || 'not specified',
        id: newId,
      }),
    });
  }
  async addRecommendationToFavorites(userId, recommendationId) {
    const recommendationRef = this.firestore
      .collection('Food_Recommendation')
      .doc(recommendationId);
    const recommendationSnapshot = await recommendationRef.get();
    const recommendationData = recommendationSnapshot.data();
    const userRef = this.firestore.collection('Users').doc(userId);

    await recommendationRef.update({
      likes: recommendationData.likes + 1,
    });

    await userRef.update({
      favourites: this.FieldValue.arrayUnion(recommendationRef),
    });
  }

  async removeRecommendationFromFavorites(userId, innerId) {
    const userRef = this.firestore.collection('Users').doc(userId);
    await userRef.update({
      favourites: this.FieldValue.arrayRemove(innerId),
    });
    const UserSnapshot = await userRef.get();
    const userData = UserSnapshot.data();

    for (let i = 0; i < userData.food_recommendations.length; i++) {
      const recommendation = userData.food_recommendations[i];
      if (innerId === recommendation.id) {
        const recommendationRef = userData.food_recommendation_id;

        const recommendationSnapshot = await recommendationRef.get();
        const recommendationData = recommendationSnapshot.data();
        await recommendationRef.update({
          likes: recommendationData.likes - 1,
        });
      }
    }
  }

  async createDocuments(collectionName: string, dataArray: any[]) {
    const batch = this.firestore.batch();

    dataArray.forEach((data) => {
      const docRef = this.firestore.collection(collectionName).doc();
      batch.set(docRef, data);
    });

    await batch.commit();
  }
  async token(email): Promise<any> {
    try {
      const userRecord = await admin.auth().getUserByEmail(email);
      // Add logic to verify the password and generate a custom token
      const token = await admin.auth().createCustomToken(userRecord.uid);
      return { token };
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }
  }
  async verifyToken(idToken: string) {
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      const uid = decodedToken.uid;
      // You can now use the UID to fetch more user details if needed

      return uid;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }
  }
  async register(email: string, password: string, userInfo): Promise<any> {
    try {
      const userRecord = await this.firebaseAdmin.auth().createUser({
        email: email,
        password: password,
      });

      userInfo.email = email;

      const uuid = userRecord.uid;

      const collectionUserRef = this.firestore.collection('Users').doc(uuid);

      // set default attributes for new users
      userInfo.food_recommendations = [];
      userInfo.forbidden_ingredients = [];
      userInfo.taste_preferences = [];
      userInfo.past_prompts = [];
      userInfo.newUser = true;
      userInfo.favourites = [];

      await collectionUserRef.set(userInfo);
      const verificationLink = await this.firebaseAdmin
        .auth()
        .generateEmailVerificationLink(email);

      const transporter = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
          user: process.env.EMAIL_ADDRESS,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
      const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: email,
        subject: 'Verify Your Email',
        html: `<p>Please verify your email by clicking on the link below:</p>
               <a href="${verificationLink}">Verify Email</a>`,
      };
      await transporter.sendMail(mailOptions);
    } catch (error) {
      // Handle error (e.g., email already in use)
      throw new Error(error.message);
    }
  }
  async getTopFoodRecommendations(): Promise<any[]> {
    try {
      const foodRecommendationCollection = this.firestore.collection(
        'Food_Recommendation',
      );
      const querySnapshot = await foodRecommendationCollection
        .orderBy('likes', 'desc') // Order by 'likes' in descending order
        .limit(10) // Limit to top 10 documents
        .get();

      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error('Error fetching top food recommendations:', error);
      throw error;
    }
  }
}
