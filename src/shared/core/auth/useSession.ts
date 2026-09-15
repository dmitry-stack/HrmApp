import { useRouter } from '@tanstack/react-router';
import { sessionService } from './session.service';

export interface UseSessionReturn {
  signIn: (redirectTo?: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export function useSession(): UseSessionReturn {
  const router = useRouter();

  const signIn = async (redirectTo = '/deals'): Promise<void> => {
    await sessionService.signInWithGoogle();
    await router.navigate({ to: redirectTo });
  };

  const signOut = async (): Promise<void> => {
    await sessionService.signOut();
    await router.navigate({ to: '/login' });
  };

  return { signIn, signOut };
}
