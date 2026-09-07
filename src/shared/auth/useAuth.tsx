import { createContext, useContext } from 'react';
import type { User } from 'firebase/auth';

export interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthContext.Provider');
  }

  return context;
}
