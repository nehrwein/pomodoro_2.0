import { create } from "zustand";

interface UserState {
  userId: string | null;
  username: string | null;
  accessToken: string | null;
  error: string | null;
  workMinutes: number;
  shortBreakMinutes: number;
  longBreakMinutes: number;
  setUserId: (userId: string | null) => void;
  setUsername: (username: string | null) => void;
  setAccessToken: (accessToken: string | null) => void;
  setError: (error: string | null) => void;
  setWorkMinutes: (minutes: number) => void;
  setShortBreakMinutes: (minutes: number) => void;
  setLongBreakMinutes: (minutes: number) => void;
}

export const useUserStore = create<UserState>((set) => ({
  userId: null,
  username: null,
  accessToken: null,
  error: null,
  workMinutes: 25,
  shortBreakMinutes: 5,
  longBreakMinutes: 15,
  setUserId: (userId) => set({ userId }),
  setUsername: (username) => set({ username }),
  setAccessToken: (accessToken) => set({ accessToken }),
  setError: (error) => set({ error }),
  setWorkMinutes: (minutes) => set({ workMinutes: minutes }),
  setShortBreakMinutes: (minutes) => set({ shortBreakMinutes: minutes }),
  setLongBreakMinutes: (minutes) => set({ longBreakMinutes: minutes }),
}));
