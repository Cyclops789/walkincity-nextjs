import { create } from 'zustand'

export interface IUser {
    id: number;
    username: string;
    email: string;
    image: string;
    role: {
        id: number,
        name: string,
        permissions: string,
    }
}

export interface IUserStore {
    user: IUser | null;
    setUser: (user: IUser) => void;
    modifyUser: ({ ...keys }) => void;
    removeUser: () => void;
}

export const useUserStore = create<IUserStore>((set) => ({
    user: null,
    setUser: (user) => set(() => ({ user })),
    modifyUser: ({ ...keys }) => set(({ user }) => ({ user: { ...user as IUser, keys } })),
    removeUser: () => set(() => ({ user: null })),
}));