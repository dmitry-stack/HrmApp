import { useState, useMemo } from 'react';
import type { Candidate } from '@/entities/candidate';
import { filterCandidates } from '@/entities/candidate/model/filter-candidates';
import { DEFAULT_PROJECTS, type ProjectId } from '@/entities/project';
import { useCandidatesQuery, useAddCandidatesToProject } from '@/shared/core';
import { usePagination, useSelection } from '@/shared/lib/hooks';
import { toast } from 'sonner';

export interface UseCandidatesTableReturn {
  candidates: Candidate[] | undefined;
  filteredCandidates: Candidate[];
  paginatedCandidates: Candidate[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;

  searchValue: string;
  handleSearchChange: (value: string) => void;

  currentPage: number;
  recordsPerPage: number;
  setCurrentPage: (page: number) => void;
  setRecordsPerPage: (size: number) => void;

  selectedCandidateIds: string[];
  handleCandidateSelection: (candidateId: string, checked: boolean) => void;
  clearSelection: () => void;

  handleAddToProject: (projectId: ProjectId) => void;
  isAddingToProject: boolean;
}

export function useCandidatesTable(): UseCandidatesTableReturn {
  const { data: candidates, isLoading, isError, error } = useCandidatesQuery();
  const { mutate: addToProject, isPending: isAddingToProject } =
    useAddCandidatesToProject();

  const [searchValue, setSearchValue] = useState('');

  const filteredCandidates = useMemo(
    () => filterCandidates(candidates, searchValue),
    [candidates, searchValue]
  );

  const pagination = usePagination<Candidate>({
    items: filteredCandidates,
    initialPage: 1,
    initialPageSize: 10,
  });

  const selection = useSelection<string>();

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    pagination.setPage(1);
  };

  const handleAddToProject = (projectId: ProjectId) => {
    if (selection.selectedIds.length === 0) {
      toast.error('Select at least one candidate first');
      return;
    }

    const projectName =
      DEFAULT_PROJECTS.find((p) => p.id === projectId)?.name ?? projectId;

    addToProject(
      { candidateIds: selection.selectedIds, projectId },
      {
        onSuccess: () => {
          toast.success(
            `Added ${selection.selectedIds.length} candidate(s) to ${projectName}`
          );
          selection.clearSelection();
        },
        onError: () => {
          toast.error('Failed to add candidates to project');
        },
      }
    );
  };

  return {
    candidates,
    filteredCandidates,
    paginatedCandidates: pagination.paginatedItems,
    isLoading,
    isError,
    error: error instanceof Error ? error : null,
    searchValue,
    handleSearchChange,
    currentPage: pagination.currentPage,
    recordsPerPage: pagination.pageSize,
    setCurrentPage: pagination.setPage,
    setRecordsPerPage: pagination.setPageSize,
    selectedCandidateIds: selection.selectedIds,
    handleCandidateSelection: selection.toggleSelect,
    clearSelection: selection.clearSelection,
    handleAddToProject,
    isAddingToProject,
  };
}
