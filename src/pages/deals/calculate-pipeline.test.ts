import { describe, it, expect } from 'vitest';
import { calculatePipeline } from '@/pages/deals/calculate-pipeline';
import type { ProjectId } from '@/entities/project/model/constants';
import type { Project } from '@/entities/project/model/types';
import type { Candidate } from '@/entities/candidate/model/types';

const createMockCandidate = (overrides: Partial<Candidate> = {}): Candidate => ({
  id: 'cand-default',
  name: 'John Doe',
  city: 'New York',
  title: 'Frontend Developer',
  resumeUrl: 'https://example.com/resume.pdf',
  owner: 'owner-1',
  source: 'LinkedIn',
  profileRequest: 'Approved',
  profileUpdated: new Date('2026-01-01'),
  projectId: null,
  ...overrides,
});

describe('calculateProjectPipeline', () => {
  const mockProjects: Project[] = [
    {
      id: 'proj-alpha',
      name: 'Alpha Project',
      closeDate: '2026-12-31',
      totalAmount: 10000,
      weightedAmount: 4000,
      currency: 'USD',
    },
    {
      id: 'proj-beta',
      name: 'Beta Project',
      closeDate: '2026-11-30',
      totalAmount: 25000,
      weightedAmount: 12500,
      currency: 'USD',
    },
    {
      id: 'proj-gamma',
      name: 'Gamma Project (Empty)',
      closeDate: '2026-10-15',
      totalAmount: 50000,
      weightedAmount: 20000,
      currency: 'USD',
    },
  ];

  it('groups candidates by projects and sums amounts only for projects with candidates', () => {
    const candidates: Candidate[] = [
      createMockCandidate({ id: 'c1', projectId: 'proj-alpha' as ProjectId }),
      createMockCandidate({ id: 'c2', projectId: 'proj-alpha' as ProjectId }),
      createMockCandidate({ id: 'c3', projectId: 'proj-beta' as ProjectId }),
    ];

    const result = calculatePipeline(candidates, mockProjects);

    expect(result.candidatesByProject.get('proj-alpha')).toHaveLength(2);
    expect(result.candidatesByProject.get('proj-beta')).toHaveLength(1);
    expect(result.candidatesByProject.get('proj-gamma')).toHaveLength(0);

    expect(result.totalPipeline).toBe(35000);
    expect(result.totalWeightedPipeline).toBe(16500);
  });

  it('returns 0 for sums when an empty list of candidates is passed', () => {
    const result = calculatePipeline([], mockProjects);

    expect(result.totalPipeline).toBe(0);
    expect(result.totalWeightedPipeline).toBe(0);
    expect(result.candidatesByProject.get('proj-alpha')).toEqual([]);
    expect(result.candidatesByProject.get('proj-beta')).toEqual([]);
    expect(result.candidatesByProject.get('proj-gamma')).toEqual([]);
  });

  it('correctly handles candidates without projectId (null or undefined)', () => {
    const candidates: Candidate[] = [
      createMockCandidate({ id: 'c1', projectId: null }),
      createMockCandidate({ id: 'c2', projectId: undefined }),
      createMockCandidate({ id: 'c3', projectId: 'unknown-id' as ProjectId }),
    ];

    const result = calculatePipeline(candidates, mockProjects);

    expect(result.totalPipeline).toBe(0);
    expect(result.totalWeightedPipeline).toBe(0);
    expect(result.candidatesByProject.get('proj-alpha')).toHaveLength(0);
  });
});
