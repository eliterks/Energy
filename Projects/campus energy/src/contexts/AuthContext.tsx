import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '@/lib/api';

interface User {
  id: string;
  email: string;
  full_name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('campusEnergy_token');
      if (token) {
        try {
          const response = await api.get('/auth/me');
          setUser(response.data);
        } catch (error) {
          console.error('Failed to fetch user', error);
          localStorage.removeItem('campusEnergy_token');
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('username', email);
      formData.append('password', password);

      const response = await api.post('/auth/login', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { access_token } = response.data;
      localStorage.setItem('campusEnergy_token', access_token);
      api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

      const userResponse = await api.get('/auth/me');
      setUser(userResponse.data);
      setLoading(false);
      return true;
    } catch (error) {
      console.error('Login failed', error);
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('campusEnergy_token');
    delete api.defaults.headers.common['Authorization'];
  };

  const value = {
    user,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};