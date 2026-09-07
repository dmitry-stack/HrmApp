import { createFileRoute } from '@tanstack/react-router';
import { CandidatesPage } from '@pages/candidates/CandidatesPage';

export const Route = createFileRoute('/_authenticated/candidates')({
  component: CandidatesPage,
});
