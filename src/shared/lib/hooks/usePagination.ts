import { useMemo, useState } from 'react';

export interface UsePaginationOptions<T> {
  items: T[];
  initialPage?: number;
  initialPageSize?: number;
}

export interface UsePaginationReturn<T> {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  fromRecord: number;
  toRecord: number;
  paginatedItems: T[];
  canGoPrevious: boolean;
  canGoNext: boolean;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  nextPage: () => void;
  prevPage: () => void;
}

export function usePagination<T>({
  items,
  initialPage = 1,
  initialPageSize = 10,
}: UsePaginationOptions<T>): UsePaginationReturn<T> {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const totalRecords = items.length;
  const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize));

  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

  const fromRecord = totalRecords === 0 ? 0 : (safeCurrentPage - 1) * pageSize + 1;
  const toRecord = Math.min(safeCurrentPage * pageSize, totalRecords);

  const canGoPrevious = safeCurrentPage > 1;
  const canGoNext = safeCurrentPage < totalPages;

  const paginatedItems = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * pageSize;
    return items.slice(startIndex, startIndex + pageSize);
  }, [items, safeCurrentPage, pageSize]);

  const handleSetPage = (page: number) => {
    const validPage = Math.min(Math.max(1, page), totalPages);
    setCurrentPage(validPage);
  };

  const handleSetPageSize = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const nextPage = () => {
    if (canGoNext) handleSetPage(safeCurrentPage + 1);
  };

  const prevPage = () => {
    if (canGoPrevious) handleSetPage(safeCurrentPage - 1);
  };

  return {
    currentPage: safeCurrentPage,
    pageSize,
    totalPages,
    fromRecord,
    toRecord,
    paginatedItems,
    canGoPrevious,
    canGoNext,
    setPage: handleSetPage,
    setPageSize: handleSetPageSize,
    nextPage,
    prevPage,
  };
}

export interface UsePaginationWindowOptions {
  totalRecords: number;
  currentPage: number;
  recordsPerPage: number;
  maxVisiblePages?: number;
}

export interface UsePaginationWindowReturn {
  totalPages: number;
  fromRecord: number;
  toRecord: number;
  visiblePages: number[];
  canGoPrevious: boolean;
  canGoNext: boolean;
}

export function usePaginationWindow({
  totalRecords,
  currentPage,
  recordsPerPage,
  maxVisiblePages = 7,
}: UsePaginationWindowOptions): UsePaginationWindowReturn {
  const totalPages = Math.max(1, Math.ceil(totalRecords / recordsPerPage));
  const fromRecord = totalRecords === 0 ? 0 : (currentPage - 1) * recordsPerPage + 1;
  const toRecord = Math.min(currentPage * recordsPerPage, totalRecords);

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  const firstVisiblePage = Math.max(
    1,
    Math.min(
      currentPage - Math.floor(maxVisiblePages / 2),
      totalPages - maxVisiblePages + 1
    )
  );
  const lastVisiblePage = Math.min(totalPages, firstVisiblePage + maxVisiblePages - 1);

  const visiblePages = useMemo(() => {
    return Array.from(
      { length: lastVisiblePage - firstVisiblePage + 1 },
      (_, index) => firstVisiblePage + index
    );
  }, [firstVisiblePage, lastVisiblePage]);

  return {
    totalPages,
    fromRecord,
    toRecord,
    visiblePages,
    canGoPrevious,
    canGoNext,
  };
}
