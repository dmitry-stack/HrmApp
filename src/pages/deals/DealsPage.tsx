import { DealCard } from '@/widgets/deals-board/deal-card/DealCard';
import { DealsSummary } from '@/widgets/deals-board/deals-summary/DealsSummary';
import { useDealsPipeline } from './hooks/useDealsPipeline';

export function DealsPage() {
  const { candidatesByProject, totalWeightedPipeline, totalPipeline, projects } =
    useDealsPipeline();

  return (
    <div>
      <DealsSummary
        totalWeightedPipeline={totalWeightedPipeline}
        totalPipeline={totalPipeline}
        dealsWon={120}
        dealsLost={15}
      />
      <div className="flex min-w-0 gap-4 overflow-x-auto scale-y-[-1] pb-2 pr-1">
        {projects.map((project) => {
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
