import { useRouter } from '@tanstack/react-router';
import { sessionService } from '../api/session.service';

export function useSession() {
  const router = useRouter();

  const signIn = async (redirectTo = '/deals') => {
    await sessionService.signInWithGoogle();
    await router.navigate({ to: redirectTo });
  };

  const signOut = async () => {
    await sessionService.signOut();
    await router.navigate({ to: '/login' });
  };

  return { signIn, signOut };
}
