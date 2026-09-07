import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { auth } from '@/shared/api/firebase';

const googleProvider = new GoogleAuthProvider();

export const sessionService = {
  async signInWithGoogle() {
    return signInWithPopup(auth, googleProvider);
  },
  async signOut() {
    return firebaseSignOut(auth);
  },
};
