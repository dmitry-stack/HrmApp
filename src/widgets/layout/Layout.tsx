import { Navbar } from '@widgets/navbar/Navbar';
import { Header } from '@widgets/header/Header';

export function Layout() {
  return (
    <div>
      <header>
        <Header />
      </header>
      <nav>
        <Navbar />
      </nav>
      <main></main>
    </div>
  );
}
