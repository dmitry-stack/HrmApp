export const DEFAULT_PROJECTS = [
  {
    id: 'proj-1',
    name: 'Swiggy',
    closeDate: '2023-08-15',
    totalAmount: 100000,
    weightedAmount: 50000,
    currency: 'USD',
  },
  {
    id: 'proj-2',
    name: 'LuxApp CRM',
    closeDate: '2021-07-15',
    totalAmount: 240000,
    weightedAmount: 192000,
    currency: 'USD',
  },
  {
    id: 'proj-3',
    name: 'Recruit App-mo',
    closeDate: '2025-10-07',
    totalAmount: 85000,
    weightedAmount: 34000,
    currency: 'USD',
  },
  {
    id: 'proj-4',
    name: 'Recruit LuxApp',
    closeDate: '2020-01-15',
    totalAmount: 160000,
    weightedAmount: 160000,
    currency: 'USD',
  },
  {
    id: 'proj-5',
    name: 'EY',
    closeDate: '2022-08-16',
    totalAmount: 350000,
    weightedAmount: 245000,
    currency: 'USD',
  },
  {
    id: 'proj-6',
    name: 'Zapier',
    closeDate: '2019-08-28',
    totalAmount: 120000,
    weightedAmount: 24000,
    currency: 'USD',
  },
  {
    id: 'proj-7',
    name: 'Recruit CRM',
    closeDate: '2023-10-16',
    totalAmount: 195000,
    weightedAmount: 117000,
    currency: 'USD',
  },
] as const;

export type ProjectId = (typeof DEFAULT_PROJECTS)[number]['id'];
export type Project = (typeof DEFAULT_PROJECTS)[number];
