import { DealsSummary } from '@/features/deals-summary/DealsSummary';
import { DealCard } from '@/features/deal-card/DealCard';

const cards = Array.from({ length: 6 });

export function DealsPage() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <DealsSummary
          totalWeightedPipeline="$822,001"
          totalPipeline="$2,796,756"
          dealsWon="$60,000"
          dealsLost="$60,000"
        />
      </div>

      <div className="flex min-w-0 gap-4 overflow-x-auto pb-2 pr-1 [&::-webkit-scrollbar]:h-2.5 [&::-webkit-scrollbar]:w-2.5 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#C5C9D6] hover:[&::-webkit-scrollbar-thumb]:bg-[#A7AEC2]">
        {cards.map((_, index) => (
          <div key={index} className="shrink-0">
            <DealCard />
          </div>
        ))}
      </div>
    </div>
  );
}
