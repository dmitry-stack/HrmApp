export function DealsSummary({
  totalWeightedPipeline,
  totalPipeline,
  dealsWon,
  dealsLost,
}: {
  totalWeightedPipeline: string;
  totalPipeline: string;
  dealsWon: string;
  dealsLost: string;
}) {
  return (
    <div className="my-2 flex flex-wrap gap-4 px-4 sm:px-8 lg:flex-nowrap">
      <div className="flex items-center border-r border-[#9DA5A6] pr-4">
        <h2 className="font-semibold">Deals</h2>
      </div>

      <div className="border-r border-[#9DA5A6] pr-4">
        <h2 className="text-[#3E5A5A]">Total Weighted Pipeline</h2>
        <p className="font-semibold">{totalWeightedPipeline}</p>
      </div>

      <div className="border-r border-[#9DA5A6] pr-4">
        <h2 className="text-[#3E5A5A]">Total Pipeline</h2>
        <p className="font-semibold">{totalPipeline}</p>
      </div>

      <div className="border-r border-[#9DA5A6] pr-4 text-[#229B7D]">
        <h2>Deals Won</h2>
        <p className="font-semibold">{dealsWon}</p>
      </div>

      <div className="text-[#E14B55]">
        <h2>Deals Lost</h2>
        <p className="font-semibold">{dealsLost}</p>
      </div>
    </div>
  );
}
