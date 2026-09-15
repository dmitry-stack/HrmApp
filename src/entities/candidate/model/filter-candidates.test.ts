import { describe, it, expect } from 'vitest';
import { filterCandidates } from './filter-candidates';
import type { Candidate } from './types';

const createCandidate = (overrides: Partial<Candidate> = {}): Candidate => ({
  id: 'c-1',
  name: 'Alex Smith',
  city: 'Warsaw',
  title: 'React Dev',
  owner: 'Recruiter 1',
  source: 'LinkedIn',
  profileRequest: 'Approved',
  resumeUrl: '',
  profileUpdated: new Date(),
  ...overrides,
});

describe('filterCandidates', () => {
  const list: Candidate[] = [
    createCandidate({
      id: 'c-1',
      name: 'Alex Smith',
      city: 'Warsaw',
      title: 'Frontend Lead',
    }),
    createCandidate({
      id: 'c-2',
      name: 'Elena Popova',
      city: 'Berlin',
      title: 'QA Engineer',
    }),
    createCandidate({
      id: 'c-3',
      name: 'John Doe',
      city: 'Krakow',
      title: 'Backend Lead',
    }),
  ];

  it('returns all candidates when the search string is empty', () => {
    expect(filterCandidates(list, '')).toHaveLength(3);
    expect(filterCandidates(list, '   ')).toHaveLength(3);
  });

  it('finds a candidate by name case-insensitively', () => {
    const result = filterCandidates(list, 'alex');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('c-1');
  });

  it('finds a candidate by city or title', () => {
    expect(filterCandidates(list, 'berlin')).toHaveLength(1);
    expect(filterCandidates(list, 'lead')).toHaveLength(2);
  });

  it('returns empty array when nothing matches', () => {
    expect(filterCandidates(list, 'nonexistent')).toHaveLength(0);
  });
});
