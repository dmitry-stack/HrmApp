import tables from '@/shared/assets/candidates/tables.svg';
import { SearchInput } from '@/shared/ui/search-input/SearchInput';
import { CandidatesTable } from '@/widgets/candidates-table/CandidatesTable';
import { ActionBar } from '@/widgets/candidates-table/ActionBar';
import { AddCandidateDialog } from './components/add-candidate/AddCandidateDialog';
import { AddToProject } from './components/add-to-project/AddToProject';
import { DeleteCandidate } from './components/delete-candidate/DeleteCandidate';
import { Loader2 } from 'lucide-react';
import { useCandidatesTable } from './model/useCandidatesTable';

export function CandidatesPage() {
  const {
    filteredCandidates,
    paginatedCandidates,
    isLoading,
    isError,
    error,
    searchValue,
    handleSearchChange,
    currentPage,
    recordsPerPage,
    setCurrentPage,
    setRecordsPerPage,
    selectedCandidateIds,
    handleCandidateSelection,
    clearSelection,
    handleAddToProject,
    isAddingToProject,
  } = useCandidatesTable();

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
            onDeleted={clearSelection}
          />
          <AddCandidateDialog />
          <AddToProject
            onSelectProject={handleAddToProject}
            disabled={isAddingToProject}
          />

          <div className="w-full sm:w-auto sm:max-w-55">
            <SearchInput value={searchValue} onChange={handleSearchChange} />
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
          Failed to load candidates: {error ? error.message : 'Unknown error'}
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
            onRecordsPerPageChange={setRecordsPerPage}
            selectedCount={selectedCandidateIds.length}
          />
        </div>
      )}
    </div>
  );
}
