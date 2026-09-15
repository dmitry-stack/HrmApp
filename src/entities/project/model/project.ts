import { DEFAULT_PROJECTS } from '@/entities/project/model/constants';

export type ProjectId = (typeof DEFAULT_PROJECTS)[number]['id'];
export type Project = (typeof DEFAULT_PROJECTS)[number];
