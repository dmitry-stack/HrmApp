import { createRoute, redirect } from '@tanstack/react-router';
import { DealsPage } from '@pages/deals/DealsPage';
import { CandidatesPage } from '@pages/candidates/CandidatesPage';
import { Route as rootRoute } from './__route';

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: () => {
    throw redirect({ to: '/deals' });
  },
});

const dealsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/deals',
  component: DealsPage,
});

const canditatesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/candidates',
  component: CandidatesPage,
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/profile',
  component: () => (
    <div className="flex h-full w-full items-center justify-center">
      <h1 className="text-2xl font-bold">This Page is in development</h1>
    </div>
  ),
});

const briefcaseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/briefcase',
  component: () => (
    <div className="flex h-full w-full items-center justify-center">
      <h1 className="text-2xl font-bold">This Page is in development</h1>
    </div>
  ),
});

const envelopeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/envelope',
  component: () => (
    <div className="flex h-full w-full items-center justify-center">
      <h1 className="text-2xl font-bold">This Page is in development</h1>
    </div>
  ),
});

const pigRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/pig',
  component: () => (
    <div className="flex h-full w-full items-center justify-center">
      <h1 className="text-2xl font-bold">This Page is in development</h1>
    </div>
  ),
});

const calendarRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/calendar',
  component: () => (
    <div className="flex h-full w-full items-center justify-center">
      <h1 className="text-2xl font-bold">This Page is in development</h1>
    </div>
  ),
});

const diagramRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/diagram',
  component: () => (
    <div className="flex h-full w-full items-center justify-center">
      <h1 className="text-2xl font-bold">This Page is in development</h1>
    </div>
  ),
});

const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/settings',
  component: () => (
    <div className="flex h-full w-full items-center justify-center">
      <h1 className="text-2xl font-bold">This Page is in development</h1>
    </div>
  ),
});

export const routeTree = rootRoute.addChildren([
  indexRoute,
  dealsRoute,
  canditatesRoute,
  profileRoute,
  briefcaseRoute,
  envelopeRoute,
  pigRoute,
  calendarRoute,
  diagramRoute,
  settingsRoute,
]);
