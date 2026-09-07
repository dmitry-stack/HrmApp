import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { useEffect, useState } from 'react';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { User } from 'firebase/auth';
import './styles/index.css';
import { routeTree } from './routeTree.gen';
import { auth } from '@/shared/api/firebase';
import { AuthContext } from '@/shared/auth/useAuth';
import { onAuthStateChanged } from 'firebase/auth';

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

const router = createRouter({
  routeTree,
  context: {
    auth: { user: null, isLoading: true },
  },
});

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (nextUser) => {
      const authState = { user: nextUser, isLoading: false };
      router.update({ context: { auth: authState } });
      setUser(nextUser);
      setIsLoading(false);
      await router.invalidate();
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {isLoading ? (
        <div className="flex h-screen w-full items-center justify-center bg-[#F8FAFC]">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#707FDD] border-t-transparent" />
        </div>
      ) : (
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} context={{ auth: { user, isLoading } }} />
        </QueryClientProvider>
      )}
    </AuthContext.Provider>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
