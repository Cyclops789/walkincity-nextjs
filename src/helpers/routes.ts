import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { 
    faUsers, 
    faPhotoFilm, 
    faFlag, 
    faAddressBook, 
    faClosedCaptioning, 
    faUser, 
    faBug, 
    faFileLines 
} from "@fortawesome/free-solid-svg-icons";
import { NextRouter } from "next/router";

export interface IDashboardRoutes {
    name: string;
    path: string;
    icon: IconDefinition;
    // PermissionID should be equal to the read_ permission of the targeted group (such as videos, users ...), null = doesnt require a permission
    permissionID: number | null;
}

interface IGroupsRoutes {
    name: string;
    before: number;
};

export const DashboardRoutes: IDashboardRoutes[] = [
    {
        name: 'Account',
        path: '/admin/dashboard/account',
        icon: faUser,
        permissionID: null
    },
    {
        name: 'Videos',
        path: '/admin/dashboard/videos',
        icon: faPhotoFilm,
        permissionID: 1
    },
    {
        name: 'Videos Requests',
        path: '/admin/dashboard/requests',
        icon: faClosedCaptioning,
        permissionID: 5
    },
    {
        name: 'Countries',
        path: '/admin/dashboard/countries',
        icon: faFlag,
        permissionID: 10
    },
    {
        name: 'Bugs',
        path: '/admin/dashboard/bugs',
        icon: faBug,
        permissionID: 19
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
    {
        name: 'Pages',
        path: '/admin/dashboard/pages',
        icon: faFileLines,
        permissionID: 15
    },
];

export const GroupsRoutes: IGroupsRoutes[] = [
    {
        name: 'Videos',
        before: 1
    },
    {
        name: 'Countries',
        before: 10
    },
    {
        name: 'Administration',
        before: 19
    },
];

export const refreshRouteSilenced = (router: NextRouter) => {
    router.replace(router.asPath);
}