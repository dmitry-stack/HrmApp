import { useState } from 'react';
import briefcase from '@shared/assets/navbar/briefcase.svg';
import calendar from '@shared/assets/navbar/calendar.svg';
import diagram from '@shared/assets/navbar/diagram.svg';
import envelope from '@shared/assets/navbar/envelope.svg';
import candidates from '@shared/assets/navbar/candidates.svg';
import pig from '@shared/assets/navbar/pig.svg';
import profile from '@shared/assets/navbar/profile.svg';
import settings from '@shared/assets/navbar/settings.svg';
import deals from '@shared/assets/navbar/deals.svg';
import { Link } from '@tanstack/react-router';

type NavItem = {
  icon: string;
  label: string;
  link: string;
};
const topNavItems: NavItem[] = [
  { icon: deals, label: 'Deals', link: '/deals' },
  { icon: candidates, label: 'Candidates', link: '/candidates' },
  { icon: profile, label: 'Profile', link: '/profile' },
  { icon: briefcase, label: 'Briefcase', link: '/briefcase' },
  { icon: envelope, label: 'Envelope', link: '/envelope' },
  { icon: pig, label: 'Pig', link: '/pig' },
  { icon: calendar, label: 'Calendar', link: '/calendar' },
];

const bottomNavItems: NavItem[] = [
  { icon: diagram, label: 'Diagram', link: '/diagram' },
  { icon: settings, label: 'Settings', link: '/settings' },
];

const purpleIconFilter: string =
  'brightness(0) saturate(100%) invert(44%) sepia(31%) saturate(973%) hue-rotate(200deg) brightness(95%) contrast(90%)';

export function Navbar() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const renderButton = (icon: string, label: string, link: string) => {
    const isHovered = hoveredItem === label;
    const isActive = activeItem === label;

    return (
      <Link
        key={label}
        to={link}
        aria-label={label}
        onMouseEnter={() => setHoveredItem(label)}
        onMouseLeave={() => setHoveredItem(null)}
        className="flex h-12 w-12 items-center justify-center rounded-md bg-transparent transition-all"
        style={{
          backgroundColor: isHovered ? '#707FDD1A' : 'transparent',
        }}
        activeProps={{
          style: {
            backgroundColor: '#707FDD1A',
          },
        }}
        onClick={() => setActiveItem(label)}
      >
        <img
          src={icon}
          alt={label}
          className="h-5 w-5"
          style={{ filter: isActive ? purpleIconFilter : 'none' }}
        />
      </Link>
    );
  };

  return (
    <nav className="flex h-full w-18 flex-col items-center border-r border-[#F4F4F4] bg-white px-3 py-5 pr-4 sm:gap-6 lg:gap-8">
      <div className="flex flex-col items-center gap-4">
        {topNavItems.map(({ icon, label, link }) => renderButton(icon, label, link))}
      </div>

      <div className="mt-auto mb-8 flex flex-col items-center gap-4 ">
        {bottomNavItems.map(({ icon, label, link }) => renderButton(icon, label, link))}
      </div>
    </nav>
  );
}
