import { DEFAULT_PROJECTS } from './constants';

export type ProjectId = (typeof DEFAULT_PROJECTS)[number]['id'];

export interface Project {
  id: string;
  name: string;
  closeDate: string;
  totalAmount: number;
  weightedAmount: number;
  currency: string;
}
