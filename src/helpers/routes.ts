import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faChartLine, faUsers, faPhotoFilm, faFlag, faAddressBook } from "@fortawesome/free-solid-svg-icons";

export interface IDashboardRoutes {
    name: string;
    path: string;
    icon: IconDefinition;
    // PermissionID should be equal to the read_ permission of the targeted group (such as videos, users ...), null = doesnt require a permission
    permissionID: number | null;
}

export const DashboardRoutes: IDashboardRoutes[] = [
    {
        name: 'Videos',
        path: '/admin/dashboard/videos',
        icon: faPhotoFilm,
        permissionID: 1
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
        name: 'Countries',
        path: '/admin/dashboard/countries',
        icon: faFlag,
        permissionID: 10
    },
]