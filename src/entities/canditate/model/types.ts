import type { Timestamp } from 'firebase/firestore';

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
}

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
}
