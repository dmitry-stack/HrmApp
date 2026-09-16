import type { Timestamp } from 'firebase/firestore';
import type { ProjectId } from '@/entities/project';
import type { Candidate } from './candidate';

export type CreateCandidateDto = Omit<Candidate, 'id' | 'profileUpdated'>;

export interface CandidateFirestoreDto {
  name: string;
  city: string;
  title: string;
  resumeUrl: string;
  owner: string;
  source: Candidate['source'];
  profileRequest: Candidate['profileRequest'];
  profileUpdated: Timestamp;
  projectId?: ProjectId | null;
  expectedSalary?: number;
  salaryCurrency?: 'USD' | 'EUR' | 'Other';
}
