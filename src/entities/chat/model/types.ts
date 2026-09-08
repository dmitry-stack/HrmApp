import type { Timestamp } from 'firebase/firestore';

export interface ChatMessage {
  id: string;
  userId: string;
  userName?: string;
  userAvatar?: string;
  content: string;
  createdAt: Timestamp | null;
}

export type SendMessageDto = {
  userId: string;
  userName?: string;
  userAvatar?: string;
  content: string;
};
