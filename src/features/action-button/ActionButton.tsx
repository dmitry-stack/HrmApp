type ActionButtonProps = {
  label: string;
  icon?: {
    left?: string;
    right?: string;
  };
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
};

export function ActionButton({
  label,
  icon,
  variant = 'primary',
  onClick,
}: ActionButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-sm px-4 py-3 text-sm font-medium transition-colors';

  const variants = {
    primary: 'bg-[#707FDD] text-white hover:bg-[#6476d6]',
    secondary: 'bg-[#F1F2F7] text-[#3E566F] hover:bg-[#e8ebf3]',
  };

  return (
    <button className={`${base} ${variants[variant]}`} onClick={onClick}>
      {icon?.left && <img src={icon.left} alt="" className="h-4 w-4" />}
      {label}
      {icon?.right && <img src={icon.right} alt="" className="h-3 w-3" />}
    </button>
  );
}
