import type { Candidate } from '@/entities/candidate/model/types';
import { DEFAULT_PROJECTS } from '@/entities/project/model/constants';
import { useCandidatesQuery } from '@/entities/candidate/api/candidate.queries';
import { DealCard } from '@/features/deal-card/DealCard';
import { useMemo } from 'react';

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

  return (
    <div className="flex min-w-0 gap-4 overflow-x-auto pb-2 pr-1">
      {DEFAULT_PROJECTS.map((project) => {
        const candidates = candidatesByProject.get(project.id) ?? [];

        if (candidates.length === 0) {
          return null;
        }

        return (
          <div key={project.id} className="shrink-0">
            <DealCard
              projectName={project.name}
              projectCloseDate={project.closeDate}
              candidates={candidates}
            />
          </div>
        );
      })}
    </div>
  );
}
