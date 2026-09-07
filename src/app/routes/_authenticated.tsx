import { createFileRoute, redirect, Outlet } from '@tanstack/react-router';
import { Layout } from '@/widgets/layout/Layout';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: ({ context, location }) => {
    if (context.auth.isLoading) {
      return;
    }

    if (!context.auth.user) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      });
    }
  },
  pendingComponent: () => (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#707FDD] border-t-transparent" />
    </div>
  ),

  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});
