import type { Candidate } from '@/entities/candidate/model/types';

export function filterCandidates(
  candidates: Candidate[] | null | undefined,
  searchValue: string
): Candidate[] {
  return (candidates ?? []).filter((candidate) => {
    if (!searchValue.trim()) {
      return true;
    }
    const searchLower = searchValue.toLowerCase();
    return (
      candidate.name.toLowerCase().includes(searchLower) ||
      candidate.title.toLowerCase().includes(searchLower) ||
      candidate.city.toLowerCase().includes(searchLower) ||
      candidate.owner.toLowerCase().includes(searchLower) ||
      candidate.source.toLowerCase().includes(searchLower) ||
      candidate.id.toLowerCase().includes(searchLower)
    );
  });
}
