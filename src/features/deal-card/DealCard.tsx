import { SpecialistCard } from './SpecialistCard';
import type { Candidate } from '@/entities/candidate/model/types';
import { DealCardFooter } from './DealCardFooter';

export function DealCard({
  projectName,
  projectCloseDate,
  candidates,
  weightedAmount,
  totalAmount,
}: {
  projectName: string;
  projectCloseDate?: string;
  candidates: Candidate[];
  weightedAmount?: number;
  totalAmount?: number;
}) {
  const formatCloseDate = (date: Date | string | null | undefined) => {
    if (!date) {
      return 'Not set';
    }

    const parsedDate = date instanceof Date ? date : new Date(`${date}T00:00:00`);
    return Number.isNaN(parsedDate.getTime())
      ? 'Not set'
      : parsedDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
  };

  const formatSalary = (salary: number | undefined, currency: string | undefined) => {
    if (typeof salary !== 'number' || salary <= 0) {
      return 'Not set';
    }

    return `${salary.toLocaleString()} ${currency ?? ''}`.trim();
  };

  return (
    <>
      <div className="flex h-full min-h-100 w-90 flex-col overflow-hidden rounded-xl bg-[#F1F2F7] p-3">
        <div className="flex items-center justify-between px-2 py-2">
          <div className="flex items-center gap-2">
            <input type="checkbox" className="h-5 w-5" disabled />
            <h2 className="text-[16px] font-semibold text-[#343434]">{projectName}</h2>
          </div>
          <div className="rounded-full bg-[#DFE0E8] px-2.5 py-1">
            <p className="text-xs text-[#3E566F]">{candidates.length}</p>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto pr-1">
          <div className="space-y-3 pb-1">
            {candidates.map((c) => (
              <SpecialistCard
                key={c.id}
                specialization={c.title}
                companyName={c.owner}
                salary={formatSalary(c.expectedSalary, c.salaryCurrency)}
                closeDate={formatCloseDate(projectCloseDate)}
              />
            ))}
          </div>
        </div>
      </div>
      <DealCardFooter amount={formatSalary(weightedAmount, 'USD')} />
      <DealCardFooter
        title="Total Amount"
        amount={formatSalary(totalAmount, 'USD')}
        color="#229B7D"
      />
    </>
  );
}
