import { useState } from 'react';
import briefcase from '@shared/assets/navbar/briefcase.svg';
import calendar from '@shared/assets/navbar/calendar.svg';
import diagram from '@shared/assets/navbar/diagram.svg';
import envelope from '@shared/assets/navbar/envelope.svg';
import group from '@shared/assets/navbar/group.svg';
import pig from '@shared/assets/navbar/pig.svg';
import profile from '@shared/assets/navbar/profile.svg';
import settings from '@shared/assets/navbar/settings.svg';
import visuals from '@shared/assets/navbar/visuals.svg';

const topNavItems = [
  { icon: visuals, label: 'Visuals' },
  { icon: group, label: 'Group' },
  { icon: profile, label: 'Profile' },
  { icon: briefcase, label: 'Briefcase' },
  { icon: envelope, label: 'Envelope' },
  { icon: pig, label: 'Pig' },
  { icon: calendar, label: 'Calendar' },
];

const bottomNavItems = [
  { icon: diagram, label: 'Diagram' },
  { icon: settings, label: 'Settings' },
];

const purpleIconFilter =
  'brightness(0) saturate(100%) invert(44%) sepia(31%) saturate(973%) hue-rotate(200deg) brightness(95%) contrast(90%)';

export function Navbar() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const renderButton = (icon: string, label: string) => {
    const isHovered = hoveredItem === label;
    const isActive = activeItem === label;

    return (
      <button
        key={label}
        type="button"
        aria-label={label}
        onMouseEnter={() => setHoveredItem(label)}
        onMouseLeave={() => setHoveredItem(null)}
        onClick={() => setActiveItem(label)}
        className="flex h-12 w-12 items-center justify-center rounded-md bg-transparent transition-all"
        style={{ backgroundColor: isHovered || isActive ? '#707FDD1A' : 'transparent' }}
      >
        <img
          src={icon}
          alt={label}
          className="h-5 w-5"
          style={{ filter: isActive ? purpleIconFilter : 'none' }}
        />
      </button>
    );
  };

  return (
    <nav className="flex h-full w-18 flex-col items-center border-r border-[#F4F4F4] bg-white px-3 py-5 pr-4 sm:gap-6 lg:gap-8">
      <div className="flex flex-col items-center gap-4">
        {topNavItems.map(({ icon, label }) => renderButton(icon, label))}
      </div>

      <div className="mt-auto mb-8 flex flex-col items-center gap-4 ">
        {bottomNavItems.map(({ icon, label }) => renderButton(icon, label))}
      </div>
    </nav>
  );
}
