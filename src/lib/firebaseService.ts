// src/lib/firebaseService.ts
import { db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

export const getUserData = async (userId: string) => {
  const docRef = doc(db, 'users', userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    throw new Error('User data not found in Firestore');
  }
};
