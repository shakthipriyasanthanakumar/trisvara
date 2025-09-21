export interface User {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'doctor' | 'insurance';
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
  role: 'patient' | 'doctor' | 'insurance';
}