import { Navbar } from '@widgets/navbar/Navbar';
import { Header } from '@widgets/header/Header';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-white">
      <header className="pl-18">
        <Header />
      </header>

      <nav className="absolute left-0 top-0 z-10">
        <Navbar />
      </nav>

      <main>{children}</main>
    </div>
  );
}
