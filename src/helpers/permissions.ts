const permissions = [
    // Videos
    {
        id: 1,
        name: 'read_videos',
        dashboardPath: '/admin/dashboard/videos',
        apiPath: ''
    },
    {
        id: 2,
        name: 'edit_videos',
        dashboardPath: '/admin/dashboard/videos/{id}',
        apiPath: '/api/admin/videos/edit'
    },
    {
        id: 3,
        name: 'delete_videos',
        dashboardPath: '',
        apiPath: '/api/admin/videos/delete'
    },
    {
        id: 4,
        name: 'create_videos',
        dashboardPath: '/admin/dashboard/videos/new',
        apiPath: '/api/admin/videos/new'
    },
    {
        id: 5,
        name: 'verify_videos',
        dashboardPath: '',
        apiPath: '/api/admin/videos/verify'
    },
    {
        id: 18,
        name: 'accept_reject_videos',
        dashboardPath: '/admin/dashboard/requests',
        apiPath: '/api/admin/requests/action'
    },

    // Users
    {
        id: 6,
        name: 'read_users',
        dashboardPath: '/admin/dashboard/users',
        apiPath: ''
    },
    {
        id: 7,
        name: 'edit_users',
        dashboardPath: '/admin/dashboard/users/{id}',
        apiPath: '/api/admin/users/edit'
    },
    {
        id: 8,
        name: 'delete_users',
        dashboardPath: '',
        apiPath: '/api/admin/users/delete'
    },
    {
        id: 9,
        name: 'create_users',
        dashboardPath: '/admin/dashboard/users/new',
        apiPath: '/api/admin/users/new'
    },

    // Countries
    {
        id: 10,
        name: 'read_countries',
        dashboardPath: '/admin/dashboard/countries',
        apiPath: ''
    },
    {
        id: 11,
        name: 'edit_countries',
        dashboardPath: '/admin/dashboard/countries/{id}',
        apiPath: '/api/admin/countries/edit'
    },
    {
        id: 12,
        name: 'delete_countries',
        dashboardPath: '',
        apiPath: '/api/admin/countries/delete'
    },
    {
        id: 13,
        name: 'create_countries',
        dashboardPath: '/admin/dashboard/countries/new',
        apiPath: '/api/admin/countries/new'
    },    
    
    // Roles
    {
        id: 14,
        name: 'read_roles',
        dashboardPath: '/admin/dashboard/roles',
        apiPath: ''
    },
    {
        id: 15,
        name: 'edit_roles',
        dashboardPath: '/admin/dashboard/roles/{id}',
        apiPath: '/api/admin/roles/edit'
    },
    {
        id: 16,
        name: 'delete_roles',
        dashboardPath: '',
        apiPath: '/api/admin/roles/delete'
    },
    {
        id: 17,
        name: 'create_roles',
        dashboardPath: '/admin/dashboard/roles/new',
        apiPath: '/api/admin/roles/new'
    },

    // Bugs
    {
        id: 19,
        name: 'actions_bugs',
        dashboardPath: '/admin/dashboard/bugs',
        apiPath: '/api/admin/bugs/action'
    },
];

export default permissions;