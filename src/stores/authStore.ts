import { getAccessToken } from 'utils/tokenManager';
import { create } from 'zustand';

interface AuthState {
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLogin: !!getAccessToken(),
  setIsLogin: (isLogin: boolean) => set({ isLogin }),
}));
