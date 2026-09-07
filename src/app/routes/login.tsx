import { createFileRoute, redirect } from '@tanstack/react-router';
import { z } from 'zod';
import { LoginPage } from '@pages/login/LoginPage';

export const Route = createFileRoute('/login')({
  validateSearch: (search) =>
    z
      .object({
        redirect: z.string().optional(),
      })
      .parse(search),
  beforeLoad: ({ context, search }) => {
    if (context.auth && !context.auth.isLoading && context.auth.user) {
      throw redirect({ to: search.redirect || '/deals' });
    }
  },
  component: LoginPage,
});
