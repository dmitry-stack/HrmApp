export const DEFAULT_PROJECTS = [
  { id: 'proj-1', name: 'Swiggy', closeDate: '2023-08-15' },
  { id: 'proj-2', name: 'LuxApp CRM', closeDate: '2021-07-15' },
  { id: 'proj-3', name: 'Recruit App-mo', closeDate: '2025-10-07' },
  { id: 'proj-4', name: 'Recruit LuxApp', closeDate: '2020-01-15' },
  { id: 'proj-5', name: 'EY', closeDate: '2022-08-16' },
  { id: 'proj-6', name: 'Zapier', closeDate: '2019-08-28' },
  { id: 'proj-7', name: 'Recruit CRM', closeDate: '2023-10-16' },
] as const;

export type ProjectId = (typeof DEFAULT_PROJECTS)[number]['id'];
