import { Link } from '@tanstack/react-router';
import briefcase from '@shared/assets/navbar/briefcase.svg';
import calendar from '@shared/assets/navbar/calendar.svg';
import diagram from '@shared/assets/navbar/diagram.svg';
import envelope from '@shared/assets/navbar/envelope.svg';
import candidates from '@shared/assets/navbar/candidates.svg';
import pig from '@shared/assets/navbar/pig.svg';
import profile from '@shared/assets/navbar/profile.svg';
import settings from '@shared/assets/navbar/settings.svg';
import deals from '@shared/assets/navbar/deals.svg';

interface NavItem {
  icon: string;
  label: string;
  link: string;
}

const topNavItems: NavItem[] = [
  { icon: deals, label: 'Deals', link: '/deals' },
  { icon: candidates, label: 'Candidates', link: '/candidates' },
  { icon: profile, label: 'Profile', link: '/profile' },
  { icon: briefcase, label: 'Briefcase', link: '/briefcase' },
  { icon: envelope, label: 'Chat', link: '/chat' },
  { icon: pig, label: 'Pig', link: '/pig' },
  { icon: calendar, label: 'Calendar', link: '/calendar' },
];

const bottomNavItems: NavItem[] = [
  { icon: diagram, label: 'Diagram', link: '/diagram' },
  { icon: settings, label: 'Settings', link: '/settings' },
];

const PURPLE_ICON_FILTER =
  'brightness(0) saturate(100%) invert(44%) sepia(31%) saturate(973%) hue-rotate(200deg) brightness(95%) contrast(90%)';

export function Navbar() {
  const renderButton = ({ icon, label, link }: NavItem) => (
    <Link
      key={label}
      to={link}
      aria-label={label}
      className="group flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-150 hover:bg-[#707FDD]/10"
      activeProps={{
        className: 'bg-[#707FDD]/10',
      }}
    >
      {({ isActive }) => (
        <img
          src={icon}
          alt={label}
          className="h-5 w-5 transition-transform duration-150 group-hover:scale-110"
          style={{
            filter: isActive ? PURPLE_ICON_FILTER : 'none',
          }}
        />
      )}
    </Link>
  );

  return (
    <nav className="flex h-full w-20 flex-col items-center border-r border-[#F4F4F4] bg-white px-3 py-5">
      <div className="flex flex-col items-center gap-2">
        {topNavItems.map(renderButton)}
      </div>

      <div className="mt-auto flex flex-col items-center gap-2">
        {bottomNavItems.map(renderButton)}
      </div>
    </nav>
  );
}
