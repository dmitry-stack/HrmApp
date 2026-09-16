import { useMemo } from 'react';
import type { Candidate } from '@/entities/candidate';
import { DEFAULT_PROJECTS, type Project } from '@/entities/project';
import { useCandidatesQuery } from '@/shared/core';
import { calculatePipeline } from '../utils/calculate-pipeline';

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
    return calculatePipeline(candidates, projects);
  }, [candidates, projects]);

  return {
    candidatesByProject,
    totalWeightedPipeline,
    totalPipeline,
    projects,
    isLoading,
  };
}
