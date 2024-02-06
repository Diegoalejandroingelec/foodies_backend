import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';

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
}
