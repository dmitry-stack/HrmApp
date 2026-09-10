import { useEffect } from 'react';
import { useRouter } from '@tanstack/react-router';
import { sessionService } from '../api/session.service';

const REDIRECT_STORAGE_KEY = 'auth_redirect_target';

export function useSession() {
  const router = useRouter();

  useEffect(() => {
    sessionService
      .checkRedirectResult()
      .then((credential) => {
        if (credential?.user) {
          const savedTarget = sessionStorage.getItem(REDIRECT_STORAGE_KEY) || '/deals';
          sessionStorage.removeItem(REDIRECT_STORAGE_KEY);
          router.navigate({ to: savedTarget });
        }
      })
      .catch((err) => {
        console.error('Failed to handle redirect login:', err);
      });
  }, [router]);

  const signIn = async (redirectTo = '/deals') => {
    sessionStorage.setItem(REDIRECT_STORAGE_KEY, redirectTo);

    const credential = await sessionService.signInWithGoogle();

    if (credential?.user) {
      sessionStorage.removeItem(REDIRECT_STORAGE_KEY);
      await router.navigate({ to: redirectTo });
    }
  };

  const signOut = async () => {
    await sessionService.signOut();
    await router.navigate({ to: '/login' });
  };

  return { signIn, signOut };
}
