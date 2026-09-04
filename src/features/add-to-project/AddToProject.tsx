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
import { DEFAULT_PROJECTS, type ProjectId } from '@/entities/project/model/constants';

interface AddToProjectProps {
  onSelectProject: (projectId: ProjectId) => void;
  disabled?: boolean;
}

export function AddToProject({ onSelectProject, disabled }: AddToProjectProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <ActionButton
            label="Add to Project"
            icon={{ left: plus, right: dropdown }}
            variant="primary"
            disabled={disabled}
          />
        }
      />
      <DropdownMenuContent
        align="end"
        className="w-56 rounded-none p-0 border border-[#E2E8F0] bg-white shadow-md"
      >
        <DropdownMenuGroup className="max-h-56 overflow-y-auto overflow-x-hidden py-1">
          {DEFAULT_PROJECTS.map((project, index) => (
            <Fragment key={project.id}>
              <DropdownMenuItem
                onClick={() => onSelectProject(project.id)}
                className="rounded-none px-3.5 py-2 text-xs text-[#222423] cursor-pointer transition-colors outline-none hover:bg-[#707FDD1A] hover:text-[#707FDD]"
              >
                {project.name}
              </DropdownMenuItem>
              {index !== DEFAULT_PROJECTS.length - 1 && (
                <DropdownMenuSeparator className="my-0 bg-[#F1F5F9]" />
              )}
            </Fragment>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
