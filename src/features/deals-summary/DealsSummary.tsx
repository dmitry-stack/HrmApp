export function DealsSummary() {
  return (
    <div className="ml-26.5 my-6 flex gap-4">
      <div className="flex items-center border-r border-[#9DA5A6] pr-4">
        <h2 className="font-semibold">Deals</h2>
      </div>

      <div className="border-r border-[#9DA5A6] pr-4">
        <h2 className="text-[#3E5A5A]">Total Weighted Pipeline</h2>
        <p className="font-semibold">$822,001</p>
      </div>

      <div className="border-r border-[#9DA5A6] pr-4">
        <h2 className="text-[#3E5A5A]">Total Pipeline</h2>
        <p className="font-semibold">$2,796,756</p>
      </div>

      <div className="border-r border-[#9DA5A6] pr-4 text-[#229B7D]">
        <h2>Deals Won</h2>
        <p className="font-semibold">$60,000</p>
      </div>

      <div className="text-[#E14B55]">
        <h2>Deals Lost</h2>
        <p className="font-semibold">$60,000</p>
      </div>
    </div>
  );
}
