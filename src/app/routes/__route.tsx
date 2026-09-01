import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Layout } from '@widgets/layout/Layout';

export const Route = createRootRoute({
  notFoundComponent: () => (
    <div className="flex h-full w-full items-center justify-center">
      <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
    </div>
  ),

  component: () => (
    <Layout>
      <>
        <Outlet />
        <TanStackRouterDevtools />
      </>
    </Layout>
  ),
});
