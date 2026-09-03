export const DEFAULT_PROJECTS = [
  { id: 'proj-1', name: 'Swiggy' },
  { id: 'proj-2', name: 'LuxApp CRM' },
  { id: 'proj-3', name: 'Recruit App-mo' },
  { id: 'proj-4', name: 'Recruit LuxApp' },
  { id: 'proj-5', name: 'EY' },
  { id: 'proj-6', name: 'Zapier' },
  { id: 'proj-7', name: 'Recruit CRM' },
] as const;

export type ProjectId = (typeof DEFAULT_PROJECTS)[number]['id'];
