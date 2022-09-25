export const adminMenu = [
    { //Quan ly nguoi dung
        // name: 'menu.admin.manage-user',
        // xmenus: [
        //     {
        //         name: 'menu.system.system-administrator.header',
        //         subMenus: [
        //             { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
        //             { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
        //             { name: 'menu.system.system-administrator.product-manage', link: '/system/product-manage' },
        //             { name: 'menu.system.system-administrator.register-package-group-or-account', link: '/system/register-package-group-or-account' },
        //         ]
        //     },
        //     // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
        // ]
        name: 'menu.admin.manage-user',
        menus: [
            {
                name: 'menu.admin.crud', link: '/system/user-manage',
            },
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux',
            },
            {
                name: 'menu.admin.manage-doctor', link: '/system/manage-doctor',
            },
            // {
            //     name: 'menu.admin.manage-admin', link: '/system/user-admin',
            // }

            {
                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule',
            },
            // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },


            // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
        ]
    },

    { //Quan ly nphong kham
        name: 'menu.admin.clinic',
        menus: [
            {
                name: 'menu.admin.manage-clinic', link: '/system/manage-clinic',
            },
        ]
    },
    { //Quan ly chuyen khoa
        name: 'menu.admin.specialty',
        menus: [
            {
                name: 'menu.admin.manage-specialty', link: '/system/manage-specialty',
            },
        ]
    },
    { //Quan ly cam nang
        name: 'menu.admin.handbook',
        menus: [
            {
                name: 'menu.admin.manage-handbook', link: '/system/manage-handbook',
            },
        ]
    },
];

export const doctorMenu = [
    { //Quan ly nguoi dung
        // name: 'menu.admin.manage-user',
        // xmenus: [
        //     {
        //         name: 'menu.system.system-administrator.header',
        //         subMenus: [
        //             { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
        //             { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
        //             { name: 'menu.system.system-administrator.product-manage', link: '/system/product-manage' },
        //             { name: 'menu.system.system-administrator.register-package-group-or-account', link: '/system/register-package-group-or-account' },
        //         ]
        //     },
        //     // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
        // ]
        name: 'menu.admin.manage-user',
        menus: [
            {

                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule',
            },
            // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
        ]
    },
];