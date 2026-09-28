import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '../types/index.js';
import { api } from '../services/api.js';

interface AuthContextValue {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, password: string, role?: 'admin' | 'customer') => Promise<{ success: boolean; error?: string }>;
  register: (payload: any) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('ion_auth_token'));
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('ion_auth_token');
      if (storedToken) {
        try {
          const res = await api.get<User>('/auth/me');
          if (res.success && res.data) {
            setUser(res.data);
            setToken(storedToken);
          } else {
            localStorage.removeItem('ion_auth_token');
            setUser(null);
            setToken(null);
          }
        } catch {
          localStorage.removeItem('ion_auth_token');
          setUser(null);
          setToken(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string, role?: 'admin' | 'customer') => {
    const res = await api.post<{ token: string; user: User }>('/auth/login', {
      email,
      password,
      role,
    });

    if (res.success && res.data) {
      localStorage.setItem('ion_auth_token', res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
      return { success: true };
    }

    return { success: false, error: res.error || 'Authentication failed' };
  };

  const register = async (payload: any) => {
    const res = await api.post<{ token: string; user: User }>('/auth/register', payload);

    if (res.success && res.data) {
      localStorage.setItem('ion_auth_token', res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
      return { success: true };
    }

    return { success: false, error: res.error || 'Registration failed' };
  };

  const logout = () => {
    localStorage.removeItem('ion_auth_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
