import { User } from '@supabase/supabase-js';
import { create } from 'zustand';

type State = {
  user: User | null;
};

type Action = {
  setUser: (user: State['user']) => void;
};

export const useUserStore = create<State & Action>((set) => ({
  user: null,
  setUser: (user) => set(() => ({ user })),
}));
