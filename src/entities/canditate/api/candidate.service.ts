import { collection, getDocs, getDoc, doc, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/shared/api/firebase';
import { candidateConverter } from './candidate.converter';
import type { Candidate, CreateCandidateDto } from '../model/types';

const COLLECTION_NAME = 'candidates';

const candidatesRef = collection(db, COLLECTION_NAME).withConverter(candidateConverter);

export const candidateService = {
  async getAll(): Promise<Candidate[]> {
    const snapshot = await getDocs(candidatesRef);
    return snapshot.docs.map((doc) => doc.data());
  },

  async getById(id: string): Promise<Candidate | null> {
    const docRef = doc(db, COLLECTION_NAME, id).withConverter(candidateConverter);
    const snapshot = await getDoc(docRef);
    return snapshot.exists() ? snapshot.data() : null;
  },

  async create(dto: CreateCandidateDto): Promise<string> {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...dto,
      profileUpdated: Timestamp.now(),
    });
    return docRef.id;
  },
};
