import { Button } from '@/shared/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
  const totalPages = Math.max(1, Math.ceil(totalRecords / recordsPerPage));
  const fromRecord = totalRecords === 0 ? 0 : (currentPage - 1) * recordsPerPage + 1;
  const toRecord = Math.min(currentPage * recordsPerPage, totalRecords);

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  // Ограничиваем количество видимых кнопок для десктопа
  const maxVisiblePages = 7;
  const firstVisiblePage = Math.max(
    1,
    Math.min(
      currentPage - Math.floor(maxVisiblePages / 2),
      totalPages - maxVisiblePages + 1
    )
  );
  const lastVisiblePage = Math.min(totalPages, firstVisiblePage + maxVisiblePages - 1);

  return (
    <div className="flex flex-col gap-3 border-t border-slate-200/80 bg-white px-4 py-3 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
      {/* Левая часть: Выбранные строки + Счётчик записей */}
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
            {Array.from(
              { length: lastVisiblePage - firstVisiblePage + 1 },
              (_, index) => {
                const pageNumber = firstVisiblePage + index;
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
              }
            )}
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
