import tables from '@shared/assets/candidates/tables.svg';
import { SearchInput } from '@/shared/ui/search-input/SearchInput';
import { CandidatesTable } from '@/widgets/candidates-table/CandidatesTable';
import { useCandidatesQuery } from '@/entities/candidate/api/candidate.queries';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { ActionBar } from '@/widgets/candidates-table/ActionBar';
import { AddCandidateDialog } from '@/features/add-candidate/AddCandidateDialog';
import { AddToProject } from '@/features/add-to-project/AddToProject';
import { toast } from 'sonner';
import type { ProjectId } from '@/entities/project/model/constants';
import { DEFAULT_PROJECTS } from '@/entities/project/model/constants';
import { useAddCandidatesToProject } from '@/entities/candidate/api/candidate.queries';
import { DeleteCandidate } from '@/features/delete-candidate/DeleteCandidate';

export function CandidatesPage() {
  const { data: candidates, isLoading, isError, error } = useCandidatesQuery();
  const { mutate: addToProject, isPending: isAddingToProject } =
    useAddCandidatesToProject();

  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [selectedCandidateIds, setSelectedCandidateIds] = useState<string[]>([]);

  const handleCandidateSelection = (candidateId: string, checked: boolean) => {
    setSelectedCandidateIds((current) =>
      checked ? [...current, candidateId] : current.filter((id) => id !== candidateId)
    );
  };

  const handleAddToProject = (projectId: ProjectId) => {
    if (selectedCandidateIds.length === 0) {
      toast.error('Select at least one candidate first');
      return;
    }

    const projectName =
      DEFAULT_PROJECTS.find((p) => p.id === projectId)?.name ?? projectId;

    addToProject(
      { candidateIds: selectedCandidateIds, projectId },
      {
        onSuccess: () => {
          toast.success(
            `Added ${selectedCandidateIds.length} candidate(s) to ${projectName}`
          );
          setSelectedCandidateIds([]);
        },
        onError: () => {
          toast.error('Failed to add candidates to project');
        },
      }
    );
  };
  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    setCurrentPage(1);
  };

  const handleRecordsPerPageChange = (pageSize: number) => {
    setRecordsPerPage(pageSize);
    setCurrentPage(1);
  };

  const filteredCandidates = (candidates ?? []).filter((candidate) => {
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

  const startIndex = (currentPage - 1) * recordsPerPage;
  const paginatedCandidates = filteredCandidates.slice(
    startIndex,
    startIndex + recordsPerPage
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 border-b border-[#F4F4F4] px-4 py-4 pb-2 sm:flex-row sm:items-center sm:justify-between sm:px-4">
        <div className="flex items-center gap-8 ">
          <img src={tables} alt="candidates" className="w-4 h-4" />
          <p className="text-[#3E566F] font-medium whitespace-nowrap">Candidates List</p>
          <h2 className="text-sm text-muted-foreground whitespace-nowrap">
            Page {currentPage}
          </h2>
        </div>

        <div className="flex w-full flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end">
          <DeleteCandidate
            candidateIds={selectedCandidateIds}
            onDeleted={() => setSelectedCandidateIds([])}
          />
          <AddCandidateDialog />
          <AddToProject
            onSelectProject={handleAddToProject}
            disabled={isAddingToProject}
          />

          <div className="w-full sm:w-auto sm:max-w-55">
            <SearchInput
              value={searchValue}
              onChange={(value) => {
                handleSearchChange(value);
              }}
            />
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center p-12 text-muted-foreground">
          <Loader2 className="w-6 h-6 animate-spin mr-2" />
          <span>Loading candidates...</span>
        </div>
      )}

      {isError && (
        <div className="mx-8 p-4 border border-destructive text-destructive rounded-md bg-destructive/10 text-sm">
          Failed to load candidates:
          {error instanceof Error ? error.message : 'Unknown error'}
        </div>
      )}

      {!isLoading && !isError && (
        <div className="overflow-x-auto">
          <CandidatesTable
            selectedCandidateIds={selectedCandidateIds}
            onCandidateSelection={handleCandidateSelection}
            candidates={paginatedCandidates}
          />
          <ActionBar
            totalRecords={filteredCandidates.length}
            currentPage={currentPage}
            recordsPerPage={recordsPerPage}
            onPageChange={setCurrentPage}
            onRecordsPerPageChange={(pageSize) => {
              handleRecordsPerPageChange(pageSize);
            }}
          />
        </div>
      )}
    </div>
  );
}
