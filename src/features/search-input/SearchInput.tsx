import search from '@shared/assets/candidates/search.svg';

export function SearchInput({
  placeholder = 'Advanced search',
  maxWidth = '220px',
  value,
  onChange,
}: {
  placeholder?: string;
  maxWidth?: string;
  value?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <div className="relative w-full" style={{ maxWidth: maxWidth }}>
      <img
        src={search}
        alt="Search"
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-sm bg-[#F1F2F7] py-3 pl-10 pr-3 text-sm text-[#3E566F] placeholder-[#6B7A8F] outline-none focus:bg-[#eef1f8]"
      />
    </div>
  );
}
