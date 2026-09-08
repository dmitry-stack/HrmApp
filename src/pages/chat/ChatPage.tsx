import { useEffect, useRef } from 'react';
import {
  useDeleteChatMessage,
  useLiveChatMessages,
} from '@/entities/chat/api/chat.queries';
import { SendChatMessage } from '@/features/send-chat-message/SendChatMessage';
import { useAuth } from '@/entities/session';
import { X, Users } from 'lucide-react';
import { toast } from 'sonner';

export function ChatPage() {
  const { messages, isLoading, error, retry } = useLiveChatMessages();
  const { user } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isFirstLoad = useRef(true);
  const { mutate: deleteMessage } = useDeleteChatMessage();

  useEffect(() => {
    if (messages.length === 0) return;

    if (isFirstLoad.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
      isFirstLoad.current = false;
    } else {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="mx-auto flex h-[calc(100vh-6rem)] w-full max-w-4xl flex-col rounded-2xl border border-slate-200/80 bg-white shadow-sm overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-100 bg-white px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#707FDD]/10 text-[#707FDD]">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-800">Team General Chat</h2>
            <p className="text-xs text-slate-400">
              {messages.length} {messages.length === 1 ? 'message' : 'messages'}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 bg-[#F8FAFC]">
        {isLoading ? (
          <div className="flex h-full items-center justify-center text-sm text-slate-400">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#707FDD] border-t-transparent" />
          </div>
        ) : error ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
            <p className="text-sm text-slate-600">Unable to load chat messages.</p>
            <button
              type="button"
              onClick={retry}
              className="rounded-lg bg-[#707FDD] px-3.5 py-1.5 text-xs font-medium text-white transition hover:bg-[#5e6ec8]"
            >
              Try again
            </button>
          </div>
        ) : (
          messages.map((msg) => {
            const isMe = msg.userId === user?.uid;

            return (
              <div
                key={msg.id}
                className={`group flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`flex items-center gap-1.5 mb-1 text-xs text-slate-400 ${
                    isMe ? 'flex-row-reverse' : ''
                  }`}
                >
                  {msg.userAvatar ? (
                    <img
                      src={msg.userAvatar}
                      alt={msg.userName}
                      className="h-5 w-5 rounded-full object-cover shadow-xs"
                    />
                  ) : (
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 text-[10px] font-bold text-slate-600">
                      {msg.userName?.[0]?.toUpperCase() ?? '?'}
                    </div>
                  )}

                  <span className="font-medium text-slate-500">{msg.userName}</span>

                  {isMe && (
                    <button
                      type="button"
                      onClick={() =>
                        deleteMessage(msg.id, {
                          onError: (deleteError) => {
                            console.error('Failed to delete message:', deleteError);
                            toast.error('Message could not be deleted.');
                          },
                        })
                      }
                      title="Delete message"
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded-full hover:bg-red-50 text-slate-400 hover:text-red-500"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>

                <div
                  className={`max-w-[80%] sm:max-w-md rounded-2xl px-4 py-2 text-sm leading-relaxed wrap-break-word shadow-xs transition-all ${
                    isMe
                      ? 'bg-[#707FDD] text-white rounded-tr-xs'
                      : 'bg-white text-slate-700 border border-slate-200/80 rounded-tl-xs'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-slate-100 bg-white p-3">
        <SendChatMessage />
      </div>
    </div>
  );
}
