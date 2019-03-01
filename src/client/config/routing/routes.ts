import { RouteConfig } from 'react-router-config';
import Login from './../../components/login/Login';
import Profile from './../../components/profile/Profile';
import Logout from '../../components/logout/Logout';
import {
    createLoginPath,
    createProfilePath,
    createLogoutPath,
} from './urlGenerator';
import Base from './../../components/Base';

const routes: RouteConfig[] = [
    {
        component: Base,
        path: '/',
        routes: [
            { path: createLoginPath(), component: Login, exact: true },
            { path: createProfilePath(), component: Profile, exact: true },
            { path: createLogoutPath(), component: Logout, exact: true },
        ],
    },
];

export default routes;
