import React from 'react';
import {
    withAuthenticationContext,
    AuthenticationContextProps,
} from '../security/AuthenticationContext';
import { Redirect } from 'react-router';
import { createHomePath } from './../../config/routing/urlGenerator';
import { toast } from 'react-toastify';

type Props = {} & AuthenticationContextProps;

const Logout: React.FunctionComponent<Props> = ({ handleLogout }) => {
    handleLogout();

    toast.success('You are logged out');

    return <Redirect to={createHomePath()} />;
};

export default withAuthenticationContext(Logout);
