export function DealCardFooter({
  title = 'Weighted amount',
  amount = '$0',
  color = '#000000',
}: {
  title?: string;
  amount?: string;
  color?: string;
}) {
  return (
    <div className="flex items-center justify-between p-4 mt-2 w-90 border border-[#F4F4F4] rounded-md">
      <p className="text-sm text-[#9DA5A6]">{title}</p>
      <p className="text-sm font-semibold text-[#343434]" style={{ color }}>
        {amount}
      </p>
    </div>
  );
}
