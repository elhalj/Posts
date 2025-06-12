import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * The type of the user object.
 */
export type User = {
    email: string;
  password: string;
};

/**
 * The type of the auth state.
 */
export type AuthStore = {
  isAuthenticated: boolean;
  user: User | null;
    token: string | null;
    login: (user: User, token: string) => Promise<void>;
    logout: () => void;
};
/**
 * Auth store for managing user authentication state.
 */
export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
          user: null,
          token: null,
          isAuthenticated: false,
        
          login: async (userData: User, token: string) => {
              set({
                  user: userData,
                  token: token,
                  isAuthenticated:true,
              })
          },
            logout: () => {
                set({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                });
            },
    }),
    {
      name: "auth-storage", // unique name for the storage
      storage: {
        getItem: (name: string) => {
          const item = localStorage.getItem(name);
          return Promise.resolve(item ? JSON.parse(item) : null);
        },
        setItem: (name: string, value) =>
          Promise.resolve(localStorage.setItem(name, value ? JSON.stringify(value) : "")),
        removeItem: (name: string) => Promise.resolve(localStorage.removeItem(name)),
      }
    }
  )
);
