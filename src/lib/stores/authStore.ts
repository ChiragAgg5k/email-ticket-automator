import { Models } from "appwrite";
import { create } from "zustand";

interface IAuth {
  user: Models.User<Models.Preferences> | null;
  loading: boolean;
  token: string | null;
  setUser: (user: Models.User<Models.Preferences> | null) => void;
  setLoading: (loading: boolean) => void;
  setToken: (token: string | null) => void;
}

const useAuthStore = create<IAuth>((set) => ({
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  setLoading: (loading) => set({ loading }),
  user: null,
  token: null,
  loading: false,
}));

export default useAuthStore;
