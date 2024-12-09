import { Routes } from '@angular/router';
import { AuthGuard } from './admin-layout/auth/services/auth.guard';

export const routes: Routes = [

    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'admin',
    },

    //ADMIN layout
    {
        path: 'admin',
        loadComponent: () => import('./admin-layout/admin-page.component')
            .then(mod => mod.AdminPageComponent),
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                loadComponent: () => import('./admin-layout/dashboard/containers/dashboard-list-container/dashboard-list-container.component')
                    .then(mod => mod.AdminDashboardContainerComponent),
                data: { title: 'Дошка' }
            },
            {
                path: 'contacts',
                loadComponent: () => import('./admin-layout/users/component/users/users.component')
                    .then(mod => mod.ContactsComponent),
                data: { title: 'Наші користувачі' }
            },

            {
                path: 'profile-settings',
                loadComponent: () => import('./admin-layout/profile/profile-page.component')
                    .then(mod => mod.ProfilePageComponent),
                data: { title: 'Налаштування' },
                children: [
                    // {
                    //     path: '',
                    //     redirectTo: 'change-password',
                    //     pathMatch: 'full'
                    // },
                    {
                        path: 'change-password',
                        loadComponent: () => import('./admin-layout/profile/components/change-password/change-password.component')
                            .then(mod => mod.ChangePasswordComponent),
                        data: { title: 'Зміна паролю' }
                    },
                ]
            },
        ]
    },

    {
        path: 'login',
        loadComponent: () => import('./admin-layout/auth/components/login/containers/login-container/login-container.component')
            .then(mod => mod.AdminLoginContainerComponent),
    },
    {
        path: 'reset-password',
        loadComponent: () => import('./admin-layout/auth/components/resetPassword/containers/resetPassword-container/resetPassword-container.component')
            .then(mod => mod.AdminResetPasswordContainerComponent),
    },

     {
        path: 'registration',
        loadComponent: () => import('./admin-layout/auth/components/registration/registration.component')
            .then(mod => mod.RegistrationComponent),
    },
    //default route
    {
        path: '**',
        redirectTo: 'admin'
    }
];
