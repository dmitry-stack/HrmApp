import { Navbar } from '@widgets/navbar/Navbar';
import { Header } from '@widgets/header/Header';
import React from 'react';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-white">
      <aside className="shrink-0">
        <Navbar />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="w-full">
          <Header />
        </header>

        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
