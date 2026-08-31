import notification from '@shared/assets/header/notification.svg';
import plus from '@shared/assets/header/plus.svg';
import mail from '@shared/assets/header/mail.svg';
import promos from '@shared/assets/header/promos.svg';
import search from '@shared/assets/header/search.svg';

export function Header() {
  return (
    <header className="flex flex-col gap-4 border-b border-[#F4F4F4] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
      <div className="relative w-full max-w-105">
        <input
          type="search"
          placeholder="Search by name, job, email & Linkedin URL"
          className="w-full rounded-sm bg-[#F1F2F7] py-3 pl-10 pr-3 text-black placeholder-[#3E5A5A] outline-none"
        />
        <img
          src={search}
          alt="Search"
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
        />
      </div>

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
          <button
            type="button"
            aria-label="Promos"
            className="flex h-8 w-8 items-center justify-center rounded-full"
          >
            <img src={promos} alt="Promos" className="h-5 w-5" />
          </button>

          <button
            type="button"
            aria-label="Mail"
            className="flex h-8 w-8 items-center justify-center rounded-full"
          >
            <img src={mail} alt="Mail" className="h-5 w-5" />
          </button>

          <button
            type="button"
            aria-label="Notifications"
            className="flex h-8 w-8 items-center justify-center rounded-full"
          >
            <img src={notification} alt="Notifications" className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
