import { Routes } from '@angular/router';
import { Home } from '../Components/home/home';
import { About } from '../Components/about/about';
import { Dashboard } from '../Components/dashboard/dashboard';
import { Admin } from '../Components/admin/admin';
import { Login } from '../Pages/login/login';
import { Register } from '../Pages/register/register';
import { CreateUsers } from '../Pages/create-users/create-users';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: Home },
    { path: 'about', component: About },
    { path: 'dashboards', component:Dashboard },
    { path: 'Admin', component: Admin},
    { path: 'login', component: Login},
    { path: 'register', component: Register},
    { path: 'users', component: CreateUsers}
];
