import { ChatPage } from '@/pages/chat/ChatPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/chat')({
  component: ChatPage,
});
