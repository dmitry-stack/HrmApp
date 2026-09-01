import tables from '@shared/assets/candidates/tables.svg';

import dropdown from '@shared/assets/candidates/arrow.svg';
import plus from '@shared/assets/header/plus.svg';

import { ActionButton } from '@features/action-button/ActionButton';
import { SearchInput } from '@features/search-input/SearchInput';

export function CandidatesPage() {
  return (
    <div className="flex gap-4 border-b border-[#F4F4F4] px-4 py-4 pb-2 sm:flex-row sm:items-center sm:justify-between sm:px-8">
      <div className="flex items-center gap-4">
        <img src={tables} alt="candidates" className="w-4 h-4" />
        <p className="text-[#3E566F] font-medium">Candidates List</p>
        <h2>Page 1</h2>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <ActionButton
          label="Add candidate"
          icon={{ left: plus, right: dropdown }}
          variant="primary"
        />
        <ActionButton label="Resume Parser" icon={{ left: plus }} variant="primary" />
        <SearchInput />
      </div>
    </div>
  );
}
