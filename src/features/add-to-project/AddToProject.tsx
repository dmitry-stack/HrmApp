import { ActionButton } from '@features/action-button/ActionButton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSeparator,
} from '@/shared/ui/dropdown-menu';
import { Fragment } from 'react';
import dropdown from '@shared/assets/candidates/arrow.svg';
import plus from '@shared/assets/header/plus.svg';

interface AddToProjectProps {
  projects?: Array<{ id: string; name: string }>;
  onSelectProject?: (projectId: string) => void;
  onCreateNewProject?: () => void;
}

const DEFAULT_PROJECTS = [
  { id: 'proj-1', name: 'Swiggy' },
  { id: 'proj-2', name: 'LuxApp CRM' },
  { id: 'proj-3', name: 'Recruit App-mo' },
  { id: 'proj-4', name: 'Recruit LuxApp' },
  { id: 'proj-5', name: 'EY' },
  { id: 'proj-6', name: 'Zapier' },
  { id: 'proj-7', name: 'Recruit CRM' },
];

export function AddToProject({
  projects = DEFAULT_PROJECTS,
  onSelectProject,
}: AddToProjectProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <ActionButton
            label="Add to Project"
            icon={{ left: plus, right: dropdown }}
            variant="primary"
          />
        }
      />

      <DropdownMenuContent
        align="end"
        className="w-56 rounded-none p-0 border border-[#E2E8F0] bg-white shadow-md"
      >
        <DropdownMenuGroup className="max-h-56 overflow-y-auto overflow-x-hidden py-1">
          {projects.map((project, index) => {
            const isLast = index === projects.length - 1;

            return (
              <Fragment key={project.id}>
                <DropdownMenuItem
                  onClick={() => onSelectProject?.(project.id)}
                  className="rounded-none px-3.5 py-2 text-xs text-[#222423] cursor-pointer transition-colors outline-none hover:bg-[#707FDD1A] hover:text-[#707FDD] focus:bg-[#707FDD1A] focus:text-[#707FDD]"
                >
                  {project.name}
                </DropdownMenuItem>

                {!isLast && <DropdownMenuSeparator className="my-0 bg-[#F1F5F9]" />}
              </Fragment>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
