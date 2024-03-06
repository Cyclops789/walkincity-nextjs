import { create } from 'zustand'

export interface INotification {
    id: number;
    link: string;
    user_id: number;
    message: string;
    is_read: boolean;
    created_at: string;
}

export interface INotificationsStore {
    notifications: INotification[] | null;
    setNotifications: (notifications: INotification[]) => void;
    markNotificationAsRead: (id: number) => void;
    addNotification: (notification: INotification) => void;
}

const updateNotificationsMarkAsRead = (id: number, notifications: INotification[] | null): INotification[] | null => {
    const updatedNotifications = notifications?.map(notification => {
        if (notification.id === id) {
            return { ...notification, is_read: true };
        }
        return notification;
    });

    return (updatedNotifications || null);
}

export const useNotificationsStore = create<INotificationsStore>((set) => ({
    notifications: null,
    setNotifications: (notifications) => set(() => ({ notifications })),
    markNotificationAsRead: (id) => set(({ notifications }) => ({ notifications: updateNotificationsMarkAsRead(id, notifications) })),
    addNotification: (notification) => set(({ notifications }) => ({ notifications: [...notifications as INotification[], notification] })),
}));