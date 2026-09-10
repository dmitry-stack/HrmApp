import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  signInWithRedirect,
  getRedirectResult,
  type UserCredential,
} from 'firebase/auth';
import { auth } from '@/shared/api/firebase';

const googleProvider = new GoogleAuthProvider();

export const sessionService = {
  async signInWithGoogle() {
    try {
      return await signInWithPopup(auth, googleProvider);
    } catch (error: unknown) {
      if (error instanceof Error && error.message.includes('popup closed by user')) {
        await signInWithRedirect(auth, googleProvider);
        return null;
      } else {
        throw error;
      }
    }
  },

  async checkRedirectResult(): Promise<UserCredential | null> {
    try {
      return await getRedirectResult(auth);
    } catch (error) {
      console.error('Redirect sign-in error:', error);
      throw error;
    }
  },
  async signOut() {
    return firebaseSignOut(auth);
  },
};
