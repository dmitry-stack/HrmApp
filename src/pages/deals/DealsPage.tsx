import type { Candidate } from '@/entities/candidate/model/types';
import { DEFAULT_PROJECTS } from '@/entities/project/model/constants';
import { useCandidatesQuery } from '@/entities/candidate/api/candidate.queries';
import { DealCard } from '@/features/deal-card/DealCard';
import { useMemo } from 'react';
import { DealsSummary } from '@/features/deals-summary/DealsSummary';

export function DealsPage() {
  const { data: candidates } = useCandidatesQuery();

  const candidatesByProject = useMemo(() => {
    const map = new Map<string, Candidate[]>();
    DEFAULT_PROJECTS.forEach((p) => map.set(p.id, []));
    candidates?.forEach((c) => {
      if (c.projectId && map.has(c.projectId)) {
        map.get(c.projectId)!.push(c);
      }
    });
    return map;
  }, [candidates]);

  function calculateTotalWeightedPipeline(): number {
    const totalWeighted: number[] = [];
    DEFAULT_PROJECTS.forEach((proj) => {
      const candidates = candidatesByProject.get(proj.id) ?? [];

      if (candidates.length > 0) {
        totalWeighted.push(proj.weightedAmount);
      }
    });

    const totalWeightedPipeline = totalWeighted.reduce((acc, num) => acc + num, 0);
    return totalWeightedPipeline;
  }

  function calculateTotalPipeline(): number {
    const total: number[] = [];
    DEFAULT_PROJECTS.forEach((proj) => {
      const candidates = candidatesByProject.get(proj.id) ?? [];

      if (candidates.length > 0) {
        total.push(proj.totalAmount);
      }
    });

    const totalWeightedPipeline = total.reduce((acc, num) => acc + num, 0);

    return totalWeightedPipeline;
  }

  return (
    <div>
      <DealsSummary
        totalWeightedPipeline={calculateTotalWeightedPipeline()}
        totalPipeline={calculateTotalPipeline()}
        dealsWon={120}
        dealsLost={15}
      />
      <div className="flex min-w-0 gap-4 overflow-x-auto pb-2 pr-1">
        {DEFAULT_PROJECTS.map((project) => {
          const candidates = candidatesByProject.get(project.id) ?? [];

          if (candidates.length === 0) {
            return null;
          }

          return (
            <div key={project.id} className="shrink-0 self-stretch flex flex-col">
              <DealCard
                projectName={project.name}
                projectCloseDate={project.closeDate}
                candidates={candidates}
                weightedAmount={project.weightedAmount}
                totalAmount={project.totalAmount}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
