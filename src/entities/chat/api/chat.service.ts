import {
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
  serverTimestamp,
  onSnapshot,
  deleteDoc,
  doc,
  type Unsubscribe,
} from 'firebase/firestore';
import { db } from '@/shared/api/firebase';
import type { ChatMessage, SendMessageDto } from '../model/types';

const COLLECTION_NAME = 'chat';
const chatRef = collection(db, COLLECTION_NAME);

export const ChatService = {
  getChatMessages: async (): Promise<ChatMessage[]> => {
    const q = query(chatRef, orderBy('createdAt', 'asc'));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as ChatMessage[];
  },

  sendMessage: async (payload: SendMessageDto): Promise<void> => {
    await addDoc(chatRef, {
      ...payload,
      createdAt: serverTimestamp(),
    });
  },

  deleteMessage: async (messageId: string): Promise<void> => {
    await deleteDoc(doc(db, COLLECTION_NAME, messageId));
  },

  subscribeToMessages: (
    callback: (messages: ChatMessage[]) => void,
    onError: (error: Error) => void
  ): Unsubscribe => {
    const q = query(chatRef, orderBy('createdAt', 'asc'));

    return onSnapshot(
      q,
      (snapshot) => {
        const messages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as ChatMessage[];

        callback(messages);
      },
      onError
    );
  },
};
