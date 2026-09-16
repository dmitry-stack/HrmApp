import type { ProjectId } from '@/entities/project';

export interface Candidate {
  id: string;
  name: string;
  city: string;
  title: string;
  resumeUrl: string;
  owner: string;
  source: 'LinkedIn' | 'HeadHunter' | 'Referral' | 'Career Site' | 'Other';
  profileRequest: 'Pending' | 'Approved' | 'Rejected';
  profileUpdated: Date;
  projectId?: ProjectId | null;
  expectedSalary?: number;
  salaryCurrency?: 'USD' | 'EUR' | 'Other';
}
