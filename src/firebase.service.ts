import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class FirebaseService {
  private firebaseAdmin: admin.app.App;

  constructor() {
    // Path to your Firebase service account key file
    const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

    // Initialize the Firebase Admin SDK
    this.firebaseAdmin = admin.initializeApp({
      credential: admin.credential.cert(require(serviceAccountPath)),
    });
  }

  // Example method to get Firestore
  getFirestore() {
    let db = this.firebaseAdmin.firestore();
    return db.collection('test').doc('R1lKPKSsNpyef6wpUYiP');
  }
}
