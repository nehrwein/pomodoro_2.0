import { create } from "zustand";

interface UserState {
  userId: string | null;
  username: string | null;
  accessToken: string | null;
  error: string | null;
  setUserId: (userId: string | null) => void;
  setUsername: (username: string | null) => void;
  setAccessToken: (accessToken: string | null) => void;
  setError: (error: string | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  userId: null,
  username: null,
  accessToken: null,
  error: null,
  setUserId: (userId) => set({ userId }),
  setUsername: (username) => set({ username }),
  setAccessToken: (accessToken) => set({ accessToken }),
  setError: (error) => set({ error }),
}));
