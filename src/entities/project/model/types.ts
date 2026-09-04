import type { ProjectId } from './constants';

export interface Project {
  id: ProjectId;
  name: string;
  closedDate?: Date | null;
}
