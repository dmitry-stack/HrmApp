import { Button } from '@/shared/ui/Button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/Select';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePaginationWindow } from '@/shared/lib/hooks';

interface ActionBarProps {
  totalRecords: number;
  currentPage: number;
  recordsPerPage: number;
  onPageChange?: (page: number) => void;
  onRecordsPerPageChange?: (limit: number) => void;
  selectedCount?: number;
}

export function ActionBar({
  totalRecords = 0,
  currentPage,
  recordsPerPage,
  onPageChange,
  onRecordsPerPageChange,
  selectedCount = 0,
}: ActionBarProps) {
  const { totalPages, fromRecord, toRecord, visiblePages, canGoPrevious, canGoNext } =
    usePaginationWindow({
      totalRecords,
      currentPage,
      recordsPerPage,
      maxVisiblePages: 7,
    });

  return (
    <div className="flex flex-col gap-3 border-t border-slate-200/80 bg-white px-4 py-3 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
      {/* Left side: Selection counter + Record counter */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
        {selectedCount > 0 && (
          <span className="rounded-md bg-slate-100 px-2 py-0.5 font-medium text-slate-900">
            {selectedCount} selected
          </span>
        )}
        <p className="text-center sm:text-left">
          Showing <span className="font-medium text-slate-900">{fromRecord}</span>–
          <span className="font-medium text-slate-900">{toRecord}</span> of{' '}
          <span className="font-medium text-slate-900">{totalRecords}</span>
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-end sm:gap-3">
        {onRecordsPerPageChange && (
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 whitespace-nowrap">
              <span className="sm:hidden">Rows:</span>
              <span className="hidden sm:inline">Rows per page:</span>
            </span>
            <Select
              value={String(recordsPerPage)}
              onValueChange={(val) => onRecordsPerPageChange(Number(val))}
              aria-label="Select records per page"
            >
              <SelectTrigger className="h-8 w-16 px-2 text-xs">
                <SelectValue placeholder={recordsPerPage} />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 50, 100].map((pageSize) => (
                  <SelectItem key={pageSize} value={String(pageSize)} className="text-xs">
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="flex items-center gap-1">
          <div className="flex items-center gap-1 sm:mr-1">
            <Select
              value={String(currentPage)}
              onValueChange={(val) => onPageChange?.(Number(val))}
              aria-label="Select current page"
            >
              <SelectTrigger className="h-8 w-15 px-2 text-xs font-medium">
                <SelectValue placeholder={currentPage} />
              </SelectTrigger>
              <SelectContent side="top" className="max-h-48 min-w-16">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <SelectItem key={pageNum} value={String(pageNum)} className="text-xs">
                    {pageNum}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-slate-600 hover:bg-[#707FDD]/10 hover:text-[#707FDD] disabled:opacity-30"
            onClick={() => onPageChange?.(currentPage - 1)}
            disabled={!canGoPrevious}
            title="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="hidden items-center gap-1 md:flex">
            {visiblePages.map((pageNumber) => {
              const isPageActive = currentPage === pageNumber;

              return (
                <button
                  key={pageNumber}
                  type="button"
                  onClick={() => onPageChange?.(pageNumber)}
                  className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-medium transition-colors ${
                    isPageActive
                      ? 'bg-[#707FDD]/10 text-[#707FDD]'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-slate-600 hover:bg-[#707FDD]/10 hover:text-[#707FDD] disabled:opacity-30"
            onClick={() => onPageChange?.(currentPage + 1)}
            disabled={!canGoNext}
            title="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
