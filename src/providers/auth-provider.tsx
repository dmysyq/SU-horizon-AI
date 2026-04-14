'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { MockUser, STORAGE_KEY } from '@/types/auth';

interface AuthContextType {
  user: MockUser | null;
  isAuthenticated: boolean;
  isPending: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string, role: MockUser['role']) => Promise<void>;
  signOut: () => void;
  isTeacher: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isPending: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: () => {},
  isTeacher: false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [isPending, setIsPending] = useState(true);

  const loadUser = useCallback(() => {
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
      if (raw) {
        const parsed = JSON.parse(raw) as MockUser;
        setUser(parsed);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setIsPending(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const signIn = async (email: string, password: string) => {
    setIsPending(true);
    const role: MockUser['role'] = email.toLowerCase().includes('teacher') || email.toLowerCase().includes('admin') ? 'teacher' : 'student';
    const newUser: MockUser = {
      id: crypto.randomUUID(),
      email,
      name: email.split('@')[0],
      role,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    setUser(newUser);
    setIsPending(false);
  };

  const signUp = async (email: string, password: string, name: string, role: MockUser['role']) => {
    setIsPending(true);
    const newUser: MockUser = {
      id: crypto.randomUUID(),
      email,
      name: name || email.split('@')[0],
      role,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    setUser(newUser);
    setIsPending(false);
  };

  const signOut = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isPending,
        signIn,
        signUp,
        signOut,
        isTeacher: user?.role === 'teacher',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
