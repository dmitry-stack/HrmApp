import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import { Layout } from '@widgets/layout/Layout';
import { DealsPage } from '@/pages/deals/DealsPage';

export function App() {
  return (
    <div>
      <Layout>
        <DealsPage />
      </Layout>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
