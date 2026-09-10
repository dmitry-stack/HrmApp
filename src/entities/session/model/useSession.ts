import { useEffect, useRef } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { sessionService } from '../api/session.service';

const REDIRECT_STORAGE_KEY = 'auth_redirect_target';

export function useSession() {
  const navigate = useNavigate();
  const isCheckingRedirect = useRef(false);

  useEffect(() => {
    if (isCheckingRedirect.current) return;
    isCheckingRedirect.current = true;

    sessionService
      .checkRedirectResult()
      .then((credential) => {
        if (credential?.user) {
          const savedTarget = sessionStorage.getItem(REDIRECT_STORAGE_KEY) || '/deals';
          sessionStorage.removeItem(REDIRECT_STORAGE_KEY);
          navigate({ to: savedTarget });
        }
      })
      .catch((err) => {
        console.error('Failed to handle redirect login:', err);
      });
  }, [navigate]);

  const signIn = async (redirectTo = '/deals') => {
    sessionStorage.setItem(REDIRECT_STORAGE_KEY, redirectTo);

    const credential = await sessionService.signInWithGoogle();

    if (credential?.user) {
      sessionStorage.removeItem(REDIRECT_STORAGE_KEY);
      await navigate({ to: redirectTo });
    }
  };

  const signOut = async () => {
    await sessionService.signOut();
    await navigate({ to: '/login' });
  };

  return { signIn, signOut };
}
