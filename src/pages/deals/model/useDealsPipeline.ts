import { useMemo } from 'react';
import type { Candidate } from '@/entities/candidate';
import { DEFAULT_PROJECTS, type Project } from '@/entities/project';
import { useCandidatesQuery } from '@/shared/core';

export interface UseDealsPipelineOptions {
  candidates?: Candidate[];
  projects?: readonly Project[];
}

export interface UseDealsPipelineReturn {
  candidatesByProject: Map<string, Candidate[]>;
  totalWeightedPipeline: number;
  totalPipeline: number;
  projects: readonly Project[];
  isLoading: boolean;
}

export function useDealsPipeline(
  options: UseDealsPipelineOptions = {}
): UseDealsPipelineReturn {
  const { data: queryCandidates = [], isLoading } = useCandidatesQuery();
  const candidates = options.candidates ?? queryCandidates;
  const projects = options.projects ?? DEFAULT_PROJECTS;

  const { candidatesByProject, totalWeightedPipeline, totalPipeline } = useMemo(() => {
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
  }, [candidates, projects]);

  return {
    candidatesByProject,
    totalWeightedPipeline,
    totalPipeline,
    projects,
    isLoading,
  };
}
