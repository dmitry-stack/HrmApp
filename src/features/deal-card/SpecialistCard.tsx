import person from '@shared/assets/person.svg';

export function SpecialistCard({
  specialization,
  companyName,
  salary,
  closeDate,
}: {
  specialization: string;
  companyName: string;
  salary: string;
  closeDate: string;
}) {
  return (
    <div className="w-full rounded-xl bg-white p-3 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <input type="checkbox" className="h-4 w-4 accent-[#707FDD]" />
          <h2 className="text-[16px] font-semibold text-[#343434]">{specialization}</h2>
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-2 pl-6">
        <p className="text-sm font-bold text-[#707FDD]">{companyName}</p>
        <p className="text-sm font-semibold text-[#343434]">{salary}</p>
        <div className="flex items-center justify-between gap-2 text-xs text-[#3E5A5A]">
          <p>Close date: {closeDate}</p>
          <img src={person} alt="person" className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
