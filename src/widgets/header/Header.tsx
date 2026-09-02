import notification from '@shared/assets/header/notification.svg';
import plus from '@shared/assets/header/plus.svg';
import mail from '@shared/assets/header/mail.svg';
import promos from '@shared/assets/header/promos.svg';

import { useState } from 'react';
import { SearchInput } from '@/features/search-input/SearchInput';

const purpleIconFilter =
  'brightness(0) saturate(100%) invert(44%) sepia(31%) saturate(973%) hue-rotate(200deg) brightness(95%) contrast(90%)';

export function Header() {
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
    <header className="flex flex-col gap-4 border-b border-[#F4F4F4] px-4 py-4 pb-2 sm:flex-row sm:items-center sm:justify-between sm:px-8">
      <SearchInput
        placeholder="Search by name, job, email & Linkedin URL"
        maxWidth="414px"
        value=""
        onChange={() => {}}
      />

      <h2 className="text-center text-[16px] font-normal text-[#343E48] ">CRM Recruit</h2>

      <div className="flex items-center justify-center gap-4 sm:gap-6">
        <button
          type="button"
          aria-label="Add new item"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#707FDD] shadow-sm"
        >
          <img src={plus} alt="Add" className="h-4 w-4" />
        </button>

        <div className="h-8 w-px bg-[#9A9D9E]" />

        <div className="flex items-center gap-4 sm:gap-6">
          {renderButton(promos, 'Promos')}
          {renderButton(mail, 'Mail')}
          {renderButton(notification, 'Notifications')}
        </div>
      </div>
    </header>
  );
}
