import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: any | null;
  login: (token: string, user: any) => void;
  logout: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  token: null,
  user: null,
  
  initialize: () => {
    const token = localStorage.getItem('kisan_token');
    const user = localStorage.getItem('kisan_user');
    
    if (token && user) {
      set({ isAuthenticated: true, token, user: JSON.parse(user) });
    }
  },

  login: (token, user) => {
    localStorage.setItem('kisan_token', token);
    localStorage.setItem('kisan_user', JSON.stringify(user));
    set({ isAuthenticated: true, token, user });
  },

  logout: () => {
    localStorage.removeItem('kisan_token');
    localStorage.removeItem('kisan_user');
    set({ isAuthenticated: false, token: null, user: null });
  },
}));
