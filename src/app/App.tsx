import { useEffect, useState } from 'react';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { User } from 'firebase/auth';
import './styles/index.css';
import { routeTree } from './routeTree.gen';
import { auth } from '@/shared/api/firebase';
import { AuthContext } from '@/entities/session';
import { onAuthStateChanged } from 'firebase/auth';
import { Toaster } from '@/shared/ui/sonner';

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

export function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      void router.invalidate();
    }
  }, [user, isLoading]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#707FDD] border-t-transparent" />
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ user, isLoading }}>
        <RouterProvider router={router} context={{ auth: { user, isLoading } }} />
      </AuthContext.Provider>
      <Toaster duration={2000} position="top-right" />
    </QueryClientProvider>
  );
}
