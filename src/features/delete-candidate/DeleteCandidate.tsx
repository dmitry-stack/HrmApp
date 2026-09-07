import { ActionButton } from '../action-button/ActionButton';
import { useDeleteCandidates } from '@/entities/candidate/api/candidate.queries';
import { toast } from 'sonner';

interface DeleteCandidateProps {
  candidateIds: string[];
  onDeleted: () => void;
}

export function DeleteCandidate({ candidateIds, onDeleted }: DeleteCandidateProps) {
  const { mutate, isPending } = useDeleteCandidates();

  const handleDelete = () => {
    const count = candidateIds.length;
    if (count === 0) return;

    mutate(candidateIds, {
      onSuccess: () => {
        toast.success(`${count} candidate${count === 1 ? '' : 's'} deleted`);
        onDeleted();
      },
      onError: () => {
        toast.error('Failed to delete the selected candidates');
      },
    });
  };

  return (
    <ActionButton
      label={isPending ? 'Deleting…' : 'Delete candidate'}
      onClick={handleDelete}
      variant="delete"
      disabled={candidateIds.length === 0 || isPending}
    />
  );
}
