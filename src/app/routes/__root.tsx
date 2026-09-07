import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';

import type { User } from 'firebase/auth';
import type { QueryClient } from '@tanstack/react-query';

export interface AuthState {
  user: User | null;
  isLoading: boolean;
}

export interface RouterContext {
  auth: AuthState;
  queryClient?: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  notFoundComponent: () => (
    <div className="flex h-screen w-full items-center justify-center">
      <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
    </div>
  ),

  component: () => (
    <>
      <Outlet />
    </>
  ),
});
