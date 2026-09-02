import tables from '@shared/assets/candidates/tables.svg';
import dropdown from '@shared/assets/candidates/arrow.svg';
import plus from '@shared/assets/header/plus.svg';
import { ActionButton } from '@features/action-button/ActionButton';
import { SearchInput } from '@features/search-input/SearchInput';
import { CandidatesTable } from '@features/candidates-table/CandidatesTable';
import { useCandidatesQuery } from '@entities/canditate/api/candidate.queries';
import { Loader2, Database } from 'lucide-react';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { seedCandidatesDatabase } from '@entities/canditate/api/candidate.seed';
import { candidateKeys } from '@entities/canditate/api/candidate.queries';
import { ActionBar } from '@/features/table-action-bar/ActionBar';

export function CandidatesPage() {
  const { data: candidates, isLoading, isError, error } = useCandidatesQuery();

  const [isSeeding, setIsSeeding] = useState(false);
  const queryClient = useQueryClient();

  const handleSeedData = async () => {
    try {
      setIsSeeding(true);
      await seedCandidatesDatabase();

      await queryClient.invalidateQueries({ queryKey: candidateKeys.lists() });
    } catch (err) {
      console.error('Database seeding error:', err);
    } finally {
      setIsSeeding(false);
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    setCurrentPage(1);
  };

  const handleRecordsPerPageChange = (pageSize: number) => {
    setRecordsPerPage(pageSize);
    setCurrentPage(1);
  };

  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);

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
        <button
          onClick={handleSeedData}
          disabled={isSeeding}
          className="flex items-center gap-2 px-4 ml-4 py-1.5 bg-[#707FDD] hover:bg-[#6476d6] text-white  whitespace-nowrap rounded-md text-sm font-medium transition disabled:opacity-50"
        >
          <Database className="w-4 h-4" />
          {isSeeding ? 'Filling Firestore...' : 'Fill with test candidates'}
        </button>

        <div className="flex w-full flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end">
          <ActionButton
            label="Add candidate"
            icon={{ left: plus, right: dropdown }}
            variant="primary"
          />
          <ActionButton label="Resume Parser" icon={{ left: plus }} variant="primary" />
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
          <CandidatesTable candidates={paginatedCandidates} />
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
