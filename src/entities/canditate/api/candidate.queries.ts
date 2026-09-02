import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { candidateService } from './candidate.service';
import type { CreateCandidateDto } from '../model/types';

export const candidateKeys = {
  all: ['candidates'] as const,
  lists: () => [...candidateKeys.all, 'list'] as const,
  details: () => [...candidateKeys.all, 'detail'] as const,
  detail: (id: string) => [...candidateKeys.details(), id] as const,
  amount: (amount: number) => [...candidateKeys.lists(), amount] as const,
};

export function useCandidatesQuery() {
  return useQuery({
    queryKey: candidateKeys.lists(),
    queryFn: () => candidateService.getAll(),
  });
}

export function useCandidateQuery(id: string) {
  return useQuery({
    queryKey: candidateKeys.detail(id),
    queryFn: () => candidateService.getById(id),
    enabled: Boolean(id),
  });
}

export function useCandidatesAmountQuery(amount: number) {
  return useQuery({
    queryKey: [...candidateKeys.lists(), amount],
    queryFn: () => candidateService.getAmount(amount),
  });
}

export function useCreateCandidateMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateCandidateDto) => candidateService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: candidateKeys.lists() });
    },
  });
}
