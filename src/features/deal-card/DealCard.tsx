import { SpecialistCard } from './SpecialistCard';
import { DealCardFooter } from './DealCardFooter';

export function DealCard() {
  return (
    <>
      <div className="flex h-220 w-90 flex-col overflow-hidden rounded-xl bg-[#F1F2F7] p-3">
        <div className="flex items-center justify-between px-2 py-2">
          <div className="flex items-center gap-2">
            <input type="checkbox" className="h-5 w-5 accent-[#707FDD]" />
            <h2 className="text-[16px] font-semibold text-[#343434]">Open Deal</h2>
          </div>

          <div className="rounded-full bg-[#DFE0E8] px-2.5 py-1">
            <p className="text-xs text-[#3E566F]">6 / 55</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-1 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#C5C9D6] hover:[&::-webkit-scrollbar-thumb]:bg-[#A7AEC2]">
          <div className="space-y-3 pb-1">
            <SpecialistCard
              specialization="Software Engineer"
              companyName="Tech Corp"
              salary="$75,000"
              closeDate="Oct 26, 2021"
            />
          </div>
        </div>
      </div>
      <DealCardFooter title="Weighted amount" amount="$53275" />
      <DealCardFooter title="Total amount" amount="$328500" color={'#229B7D'} />
    </>
  );
}
