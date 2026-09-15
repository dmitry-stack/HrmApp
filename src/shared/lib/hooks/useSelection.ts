import { useState, useCallback } from 'react';

export interface UseSelectionOptions<T = string> {
  initialSelected?: T[];
}

export interface UseSelectionReturn<T = string> {
  selectedIds: T[];
  toggleSelect: (id: T, checked: boolean) => void;
  clearSelection: () => void;
  selectAll: (ids: T[]) => void;
  isSelected: (id: T) => boolean;
  selectedCount: number;
}

export function useSelection<T = string>(
  options: UseSelectionOptions<T> = {}
): UseSelectionReturn<T> {
  const [selectedIds, setSelectedIds] = useState<T[]>(options.initialSelected ?? []);

  const toggleSelect = useCallback((id: T, checked: boolean) => {
    setSelectedIds((current) =>
      checked ? [...current, id] : current.filter((item) => item !== id)
    );
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedIds([]);
  }, []);

  const selectAll = useCallback((ids: T[]) => {
    setSelectedIds(ids);
  }, []);

  const isSelected = useCallback((id: T) => selectedIds.includes(id), [selectedIds]);

  return {
    selectedIds,
    toggleSelect,
    clearSelection,
    selectAll,
    isSelected,
    selectedCount: selectedIds.length,
  };
}
