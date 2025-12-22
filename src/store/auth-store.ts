import { create } from "zustand";

interface AuthStore {
    token: string;
    setToken: (token: string) => void;
    clearToken: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    token: '',
    setToken: (token: string) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('token', token);
        }
        set({ token });
    },
    clearToken: () => {
        if (typeof window !== 'undefined') {
            localStorage.clear();
        }
        set({ token: '' });
    },
}));

if (typeof window !== 'undefined') {
    const tokenFromLocalStorage = localStorage.getItem('token');
    useAuthStore.getState().setToken(tokenFromLocalStorage || '');
  }