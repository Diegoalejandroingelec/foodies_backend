import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
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
      credential: admin.credential.cert(require(serviceAccountPath)),
    });
    // Access Firestore
    this.firestore = admin.firestore();

    // Access FieldValue
    this.FieldValue = admin.firestore.FieldValue;
  }

  // Example method to get Firestore
  getDocumentbyId(collection, id) {
    let db = this.firebaseAdmin.firestore();
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
  async createUserRecommendations(userRecommendationData, userId) {
    const collectionRef = this.firestore.collection('Food_Recommendation');
    const recommendationRef = await collectionRef.add(
      userRecommendationData.recommendation,
    );

    const userRef = this.firestore.collection('Users').doc(userId);
    const newId = uuidv4();
    await userRef.update({
      food_recommendations: this.FieldValue.arrayUnion({
        food_recommendation_id: recommendationRef,
        quantifier: userRecommendationData.quantifier,
        quantity: userRecommendationData.quantity,
        id: newId,
      }),
    });
  }
  async addRecommendationToFavorites(userId, recommendationId) {
    const recommendationRef = this.firestore
      .collection('Food_Recommendation')
      .doc(recommendationId);

    const userRef = this.firestore.collection('Users').doc(userId);

    await userRef.update({
      favourites: this.FieldValue.arrayUnion(recommendationRef),
    });
  }

  async createDocuments(collectionName: string, dataArray: any[]) {
    const batch = this.firestore.batch();

    dataArray.forEach((data) => {
      const docRef = this.firestore.collection(collectionName).doc();
      batch.set(docRef, data);
    });

    await batch.commit();
  }

}
