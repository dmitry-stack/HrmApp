import {
  type FirestoreDataConverter,
  type QueryDocumentSnapshot,
  type SnapshotOptions,
  Timestamp,
} from 'firebase/firestore';
import type { Candidate, CandidateFirestoreDto } from '../model/types';

export const candidateConverter: FirestoreDataConverter<
  Candidate,
  CandidateFirestoreDto
> = {
  toFirestore(candidate: Candidate): CandidateFirestoreDto {
    return {
      name: candidate.name,
      city: candidate.city,
      title: candidate.title,
      resumeUrl: candidate.resumeUrl,
      owner: candidate.owner,
      source: candidate.source,
      profileRequest: candidate.profileRequest,
      profileUpdated: Timestamp.fromDate(candidate.profileUpdated),
      projectId: candidate.projectId,
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot<CandidateFirestoreDto>,
    options: SnapshotOptions
  ): Candidate {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      name: data.name,
      city: data.city,
      title: data.title,
      resumeUrl: data.resumeUrl,
      owner: data.owner,
      source: data.source,
      profileRequest: data.profileRequest,
      profileUpdated: data.profileUpdated.toDate(),
      projectId: data.projectId ?? null,
    };
  },
};
