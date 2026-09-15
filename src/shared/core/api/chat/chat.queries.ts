import { useEffect, useState } from 'react';
import { ChatService } from './chat.service';
import type { ChatMessage, SendMessageDto } from '@/entities/chat';
import { useMutation, type UseMutationResult } from '@tanstack/react-query';

export interface UseLiveChatMessagesReturn {
  messages: ChatMessage[];
  isLoading: boolean;
  error: Error | null;
  retry: () => void;
}

export function useLiveChatMessages(): UseLiveChatMessagesReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const unsubscribe = ChatService.subscribeToMessages(
      (newMessages) => {
        setMessages(newMessages);
        setIsLoading(false);
      },
      (subscriptionError) => {
        setError(subscriptionError);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [retryCount]);

  return {
    messages,
    isLoading,
    error,
    retry: () => {
      setIsLoading(true);
      setError(null);
      setRetryCount((count) => count + 1);
    },
  };
}

export function useSendMessage(): UseMutationResult<void, Error, SendMessageDto> {
  return useMutation({
    mutationFn: (payload: SendMessageDto) => ChatService.sendMessage(payload),
  });
}

export function useDeleteChatMessage(): UseMutationResult<void, Error, string> {
  return useMutation({
    mutationFn: (messageId: string) => ChatService.deleteMessage(messageId),
  });
}
