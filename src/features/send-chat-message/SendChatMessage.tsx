import { useState, type SubmitEventHandler } from 'react';
import { Send } from 'lucide-react';
import { ChatService } from '@/entities/chat/api/chat.service';
import { useAuth } from '@/entities/session';
import { toast } from 'sonner';

export function SendChatMessage() {
  const [text, setText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const { user } = useAuth();

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || !user || isSending) return;

    try {
      setIsSending(true);
      await ChatService.sendMessage({
        userId: user.uid,
        userName: user.displayName || user.email || 'Anonymous',
        userAvatar: user.photoURL || undefined,
        content: trimmed,
      });
      setText('');
    } catch (error) {
      console.error('Failed to send message:', error);
      toast.error('Message could not be sent. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 border-t border-slate-200 bg-white p-3"
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-800 outline-none transition focus:border-[#707FDD] focus:bg-white"
      />
      <button
        type="submit"
        disabled={!text.trim() || isSending}
        aria-label="Send message"
        className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#707FDD] text-white transition hover:bg-[#5e6ec8] disabled:opacity-50"
      >
        <Send className="h-4 w-4" />
      </button>
    </form>
  );
}
