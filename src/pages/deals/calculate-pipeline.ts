import type { Candidate } from '@/entities/candidate/model/types';
import type { Project } from '@/entities/project/model/types';

export function calculatePipeline(candidates: Candidate[], projects: readonly Project[]) {
  const map = new Map<string, Candidate[]>();
  projects.forEach((p) => map.set(p.id, []));

  candidates.forEach((c) => {
    if (c.projectId && map.has(c.projectId)) {
      map.get(c.projectId)!.push(c);
    }
  });

  let weightedSum = 0;
  let totalSum = 0;

  projects.forEach((proj) => {
    const projectCandidates = map.get(proj.id);
    if (projectCandidates && projectCandidates.length > 0) {
      weightedSum += proj.weightedAmount;
      totalSum += proj.totalAmount;
    }
  });

  return {
    candidatesByProject: map,
    totalWeightedPipeline: weightedSum,
    totalPipeline: totalSum,
  };
}
