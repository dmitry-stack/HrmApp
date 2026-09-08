import { useEffect, useState } from 'react';
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

import { Menu, X } from 'lucide-react';

interface NavItem {
  icon: string;
  label: string;
  link: string;
}

const navItems: NavItem[] = [
  { icon: deals, label: 'Deals', link: '/deals' },
  { icon: candidates, label: 'Candidates', link: '/candidates' },
  { icon: profile, label: 'Profile', link: '/profile' },
  { icon: briefcase, label: 'Briefcase', link: '/briefcase' },
  { icon: envelope, label: 'Envelope', link: '/envelope' },
  { icon: pig, label: 'Pig', link: '/pig' },
  { icon: calendar, label: 'Calendar', link: '/calendar' },
  { icon: diagram, label: 'Analytics', link: '/diagram' },
  { icon: settings, label: 'Settings', link: '/settings' },
];

const PURPLE_ICON_FILTER =
  'brightness(0) saturate(100%) invert(44%) sepia(31%) saturate(973%) hue-rotate(200deg) brightness(95%) contrast(90%)';

export function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle mobile menu"
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 md:hidden"
      >
        <Menu className="h-6 w-6 text-slate-700 transition-transform duration-150" />
      </button>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm transition-opacity md:hidden"
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 flex h-full w-72 flex-col bg-white p-6 shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <span className="text-lg font-bold text-slate-900">CRM Navigation</span>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-4 flex flex-1 flex-col gap-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.link}
              to={item.link}

              onClick={closeMenu}
              className="flex items-center gap-3.5 rounded-xl px-3.5 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-[#707FDD]/10 hover:text-[#707FDD]"
              activeProps={{
                className: 'bg-[#707FDD]/10 text-[#707FDD] font-semibold',
              }}
            >
              {({ isActive }) => (
                <>
                  <img
                    src={item.icon}
                    alt={item.label}
                    className="h-5 w-5 shrink-0"
                    style={{
                      filter: isActive ? PURPLE_ICON_FILTER : 'none',
                    }}
                  />
                  <span>{item.label}</span>
                </>
              )}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
