import { create } from 'zustand'

interface IUser {
    id: number;
    username: string;
    email: string;
    role: {
        id: number,
        name: string,
        permissions: string,
    }
}

interface IUserStore {
    user: IUser | {};
    setUser: (user: IUser) => void;
    removeUser: () => void;
}

export const useUserStore = create<IUserStore>((set) => ({
    user: {},
    setUser: (user) => set(() => ({ user })),
    removeUser: () => set(() => ({ user: {} })),
}));