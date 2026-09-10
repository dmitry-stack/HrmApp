import { DEFAULT_PROJECTS } from '@/entities/project/model/constants';
import { useCandidatesQuery } from '@/entities/candidate/api/candidate.queries';
import { DealCard } from '@/entities/deal/ui/deal-card/DealCard';
import { useMemo } from 'react';
import { DealsSummary } from '@/entities/deal/ui/deals-summary/DealsSummary';
import { calculatePipeline } from './calculate-pipeline';

export function DealsPage() {
  const { data: candidates = [] } = useCandidatesQuery();

  const { candidatesByProject, totalWeightedPipeline, totalPipeline } = useMemo(() => {
    return calculatePipeline(candidates, DEFAULT_PROJECTS);
  }, [candidates]);

  return (
    <div>
      <DealsSummary
        totalWeightedPipeline={totalWeightedPipeline}
        totalPipeline={totalPipeline}
        dealsWon={120}
        dealsLost={15}
      />
      <div className="flex min-w-0 gap-4 overflow-x-auto scale-y-[-1] pb-2 pr-1">
        {DEFAULT_PROJECTS.map((project) => {
          const candidates = candidatesByProject.get(project.id) ?? [];

          if (candidates.length === 0) {
            return null;
          }

          return (
            <div
              key={project.id}
              className="shrink-0 scale-y-[-1] self-stretch flex flex-col"
            >
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
