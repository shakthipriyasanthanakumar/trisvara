import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState, LoginCredentials } from '@/types/auth';
import { mockLogin } from '@/lib/mockApi';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
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
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    token: null,
  });

  // Load auth state from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('trisvara_token');
    const storedUser = localStorage.getItem('trisvara_user');
    
    if (storedToken && storedUser) {
      setAuthState({
        user: JSON.parse(storedUser),
        isAuthenticated: true,
        token: storedToken,
      });
    }
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      const response = await mockLogin(credentials);
      
      if (response.success && response.user && response.token) {
        const newAuthState = {
          user: response.user,
          isAuthenticated: true,
          token: response.token,
        };
        
        setAuthState(newAuthState);
        
        // Persist to localStorage
        localStorage.setItem('trisvara_token', response.token);
        localStorage.setItem('trisvara_user', JSON.stringify(response.user));
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      token: null,
    });
    
    localStorage.removeItem('trisvara_token');
    localStorage.removeItem('trisvara_user');
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};