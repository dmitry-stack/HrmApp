import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  type UserCredential,
} from 'firebase/auth';
import { auth } from '@/shared/api/firebase';

const googleProvider = new GoogleAuthProvider();

export const sessionService = {
  async signInWithGoogle(): Promise<UserCredential> {
    return signInWithPopup(auth, googleProvider);
  },
  async signOut(): Promise<void> {
    return firebaseSignOut(auth);
  },
};
