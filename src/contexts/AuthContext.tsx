import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';
import axios from 'axios';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'technician' | 'viewer';
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
  checkAuth: () => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      await checkAuth();
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const checkAuth = async (): Promise<boolean> => {
    // In a real application, you would check if the user is authenticated
    // by sending a request to your backend API
    const token = localStorage.getItem('auth_token');

    if (!token) {
      setUser(null);
      setIsAuthenticated(false);
      return false;
    }

    try {
      // Simulate API call
      // In a real app, you would validate the token with your API
      // const response = await axios.get('/api/auth/me');
      // setUser(response.data);
      
      // For the sake of demo, we'll just simulate a successful auth check
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      setUser(null);
      setIsAuthenticated(false);
      return false;
    }
  };

  const login = async (email: string, password: string) => {
  try {
    setIsLoading(true);

    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.error || 'Login failed');

    const user = data.user;

    localStorage.setItem('auth_token', 'demo_token_' + Math.random());
    localStorage.setItem('user', JSON.stringify(user));

    setUser(user);
    setIsAuthenticated(true);
    toast.success('Login successful');
  } catch (error) {
    console.error('Login failed:', error);
    toast.error('Login failed. Please check your credentials.');
    throw error;
  } finally {
    setIsLoading(false);
  }
};


     

  const register = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast.success('Registration successful! You can now log in.');
    } catch (error) {
      console.error('Registration failed:', error);
      toast.error('Registration failed. Please try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      isAuthenticated, 
      login, 
      logout,
      register,
      checkAuth
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
