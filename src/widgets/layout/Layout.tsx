import { Navbar } from '@widgets/navbar/Navbar';

export function Layout({ children }: { children: React.ReactNode }) {
  <div>
    <nav>
      <Navbar />
    </nav>
    <main>{children}</main>
  </div>;
}
