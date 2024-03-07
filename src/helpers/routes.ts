import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faUsers, faPhotoFilm, faFlag, faAddressBook, faClosedCaptioning, faUser } from "@fortawesome/free-solid-svg-icons";
import { NextRouter } from "next/router";

export interface IDashboardRoutes {
    name: string;
    path: string;
    icon: IconDefinition;
    // PermissionID should be equal to the read_ permission of the targeted group (such as videos, users ...), null = doesnt require a permission
    permissionID: number | null;
}

export const DashboardRoutes: IDashboardRoutes[] = [
    {
        name: 'Account',
        path: '/admin/dashboard/account',
        icon: faUser,
        permissionID: null
    },
    {
        name: 'Videos Requests',
        path: '/admin/dashboard/requests',
        icon: faClosedCaptioning,
        permissionID: 5
    },
    {
        name: 'Videos',
        path: '/admin/dashboard/videos',
        icon: faPhotoFilm,
        permissionID: 1
    },
    {
        name: 'Countries',
        path: '/admin/dashboard/countries',
        icon: faFlag,
        permissionID: 10
    },
    {
        name: 'Users',
        path: '/admin/dashboard/users',
        icon: faUsers,
        permissionID: 6
    },
    {
        name: 'Roles',
        path: '/admin/dashboard/roles',
        icon: faAddressBook,
        permissionID: 14
    },
];

export const refreshRouteSilenced = (router: NextRouter) => {
    router.replace(router.asPath);
}