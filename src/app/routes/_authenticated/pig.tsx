import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/pig')({
  component: PlaceholderPage,
});

function PlaceholderPage() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <h1 className="text-2xl font-bold">This Page is in development</h1>
    </div>
  );
}
