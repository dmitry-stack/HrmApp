import { createFileRoute } from '@tanstack/react-router';
import { DealsPage } from '@pages/deals/DealsPage';

export const Route = createFileRoute('/_authenticated/deals')({
  component: DealsPage,
});
