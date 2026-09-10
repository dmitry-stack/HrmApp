import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  signInWithRedirect,
  getRedirectResult,
  type UserCredential,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { auth } from '@/shared/api/firebase';

const googleProvider = new GoogleAuthProvider();

export const sessionService = {
  async signInWithGoogle() {
    try {
      return await signInWithPopup(auth, googleProvider);
    } catch (error: unknown) {
      const isPopupBlocked =
        (error instanceof FirebaseError && error.code === 'auth/popup-blocked') ||
        (typeof error === 'object' &&
          error !== null &&
          'code' in error &&
          (error as { code: string }).code === 'auth/popup-blocked');

      if (isPopupBlocked) {
        console.warn('Popup blocked by browser. Redirecting via signInWithRedirect...');
        await signInWithRedirect(auth, googleProvider);
        return null;
      }

      throw error;
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
