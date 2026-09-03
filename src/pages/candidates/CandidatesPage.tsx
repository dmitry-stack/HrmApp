import tables from '@shared/assets/candidates/tables.svg';

import { SearchInput } from '@features/search-input/SearchInput';
import { CandidatesTable } from '@features/candidates-table/CandidatesTable';
import { useCandidatesQuery } from '@/entities/candidate/api/candidate.queries';
import { Loader2 } from 'lucide-react';
//import { Database } from 'lucide-react';
import { useState } from 'react';
// import { useQueryClient } from '@tanstack/react-query';
// import { seedCandidatesDatabase } from '@entities/canditate/api/candidate.seed';
// import { candidateKeys } from '@entities/canditate/api/candidate.queries';
import { ActionBar } from '@/features/table-action-bar/ActionBar';
import { AddCandidateDialog } from '@/features/add-candidate/AddCandidateDialog';
import { AddToProject } from '@/features/add-to-project/AddToProject';

export function CandidatesPage() {
  const { data: candidates, isLoading, isError, error } = useCandidatesQuery();

  // const [isSeeding, setIsSeeding] = useState(false);
  //const queryClient = useQueryClient();

  //   const handleSeedData = async () => {
  //     try {
  //       setIsSeeding(true);
  //       await seedCandidatesDatabase();

  //       await queryClient.invalidateQueries({ queryKey: candidateKeys.lists() });
  //     } catch (err) {
  //       console.error('Database seeding error:', err);
  //     } finally {
  //       setIsSeeding(false);
  //     }
  //   };

  //temporary function to get checked candidates from the table

  //   function getCheckedCandidates() {
  //     const checkboxes = document.querySelectorAll<HTMLInputElement>(
  //       'input[type="checkbox"]:checked'
  //     );
  //     const checkedIds: string[] = [];
  //     checkboxes.forEach((checkbox) => {
  //       const row = checkbox.closest('tr');
  //       if (row) {
  //         const idCell = row.querySelector('td:nth-child(2)');
  //         if (idCell) {
  //           checkedIds.push(idCell.textContent || '');
  //         }
  //       }
  //     });
  //     return checkedIds;
  //   }

  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  //   const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [selectedCandidateIds, setSelectedCandidateIds] = useState<string[]>([]);

  const handleCandidateSelection = (candidateId: string, checked: boolean) => {
    setSelectedCandidateIds((current) =>
      checked ? [...current, candidateId] : current.filter((id) => id !== candidateId)
    );
  };

  const handleAddToProject = (projectId: string) => {
    if (selectedCandidateIds.length === 0) {
      alert('Please select at least one candidate to add to the project.');
      return;
    }
    console.log({ projectId, candidateIds: selectedCandidateIds });

    // Later:
    // addCandidatesToProject({ projectId, candidateIds: selectedCandidateIds });
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
        {/* <button
          onClick={handleSeedData}
          disabled={isSeeding}
          className="flex items-center gap-2 px-4 ml-4 py-1.5 bg-[#707FDD] hover:bg-[#6476d6] text-white  whitespace-nowrap rounded-md text-sm font-medium transition disabled:opacity-50"
        >
          <Database className="w-4 h-4" />
          {isSeeding ? 'Filling Firestore...' : 'Fill with test candidates'}
        </button> */}

        <div className="flex w-full flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end">
          <AddCandidateDialog />
          <AddToProject onSelectProject={handleAddToProject} />

          {/* //   <ActionButton
          //     label="Add candidate"
          //     icon={{ left: plus, right: dropdown }}
          //     variant="primary"

          // }
          // /> */}

          {/* <ActionButton
            label="Add to Project"
            icon={{ left: plus, right: dropdown }}
            variant="primary"
            onClick={() => {
              const checkedCandidates = getCheckedCandidates();
              console.log('Checked candidates:', checkedCandidates);
            }}
          /> */}
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
