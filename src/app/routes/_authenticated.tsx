import { createFileRoute, redirect, Outlet } from '@tanstack/react-router';
import { Layout } from '@/widgets/layout/Layout';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: ({ context, location }) => {
    if (!context?.auth || context.auth.isLoading) {
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

  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});
