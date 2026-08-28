import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';

export function App() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Welcome to the App</h1>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
