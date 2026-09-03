import { useState } from 'react';
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
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const totalPages: number = Math.max(1, Math.ceil(totalRecords / recordsPerPage));
  const fromRecord = totalRecords === 0 ? 0 : (currentPage - 1) * recordsPerPage + 1;
  const toRecord = Math.min(currentPage * recordsPerPage, totalRecords);

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  const maxVisiblePages = 12;

  const firstVisiblePage = Math.max(
    1,
    Math.min(
      currentPage - Math.floor(maxVisiblePages / 2),
      totalPages - maxVisiblePages + 1
    )
  );

  const lastVisiblePage = Math.min(totalPages, firstVisiblePage + maxVisiblePages - 1);
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 border-t bg-card text-xs text-muted-foreground">
      <div className="flex items-center gap-2">
        {selectedCount > 0 && (
          <span className="font-medium text-foreground bg-muted px-2 py-0.5 rounded">
            {selectedCount} selected
          </span>
        )}
        <p>
          Showing records{' '}
          <span className="font-medium text-foreground">{fromRecord}</span> to
          <span className="font-medium text-foreground"> {toRecord}</span> of
          <span className="font-medium text-foreground"> {totalRecords}</span> records
        </p>
      </div>

      <div className="flex items-center gap-4">
        {onRecordsPerPageChange && (
          <div className="flex items-center gap-2">
            <span>Rows per page:</span>
            <Select
              value={String(recordsPerPage)}
              onValueChange={(val) => onRecordsPerPageChange(Number(val))}
            >
              <SelectTrigger className="h-8 w-17 text-xs">
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

        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1.5 mr-1">
            <Select
              value={String(currentPage)}
              onValueChange={(val) => onPageChange?.(Number(val))}
            >
              <SelectTrigger className="h-8 w-16 text-xs font-medium">
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
            className="h-8 w-8 border-0 bg-transparent shadow-none hover:bg-[#707FDD1A]"
            onClick={() => onPageChange?.(currentPage - 1)}
            disabled={!canGoPrevious}
            title="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="px-1 text-foreground font-medium flex items-center gap-1">
            {Array.from(
              { length: lastVisiblePage - firstVisiblePage + 1 },
              (_, index) => {
                const pageNumber = firstVisiblePage + index;
                const isPageHovered = hoveredItem === pageNumber;
                const isPageActive = currentPage === pageNumber;

                return (
                  <button
                    key={pageNumber}
                    type="button"
                    aria-label={`Go to page ${pageNumber}`}
                    onMouseEnter={() => setHoveredItem(pageNumber)}
                    onMouseLeave={() => setHoveredItem(null)}
                    onClick={() => onPageChange?.(pageNumber)}
                    className="flex h-8 w-8 items-center justify-center rounded-md text-xs transition-all"
                    style={{
                      backgroundColor:
                        isPageActive || isPageHovered ? '#707FDD1A' : 'transparent',
                      color: isPageActive ? '#707FDD' : '#222423E5',
                    }}
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
            className="h-8 w-8 border-0 bg-transparent shadow-none hover:bg-[#707FDD1A]"
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
