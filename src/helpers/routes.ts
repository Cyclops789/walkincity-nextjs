import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faChartLine, faUsers, faPhotoFilm, faFlag, faCity, faAddressBook } from "@fortawesome/free-solid-svg-icons";

export interface IDashboardRoutes {
    name: string;
    path: string;
    icon: IconDefinition;
}

export const DashboardRoutes: IDashboardRoutes[] = [
    {
        name: 'Dashboard',
        path: '/admin/dashboard',
        icon: faChartLine
    },
    {
        name: 'Videos',
        path: '/admin/dashboard/videos',
        icon: faPhotoFilm
    },
    {
        name: 'Users',
        path: '/admin/dashboard/users',
        icon: faUsers
    },
    {
        name: 'Roles',
        path: '/admin/dashboard/roles',
        icon: faAddressBook
    },
    {
        name: 'Countries',
        path: '/admin/dashboard/countries',
        icon: faFlag
    },
]