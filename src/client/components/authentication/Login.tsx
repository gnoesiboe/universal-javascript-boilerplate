import React from 'react';
import {
    AuthenticationContextProps,
    withAuthenticationContext,
} from './../security/AuthenticationContext';

type Props = {} & AuthenticationContextProps;

const Login: React.FunctionComponent<Props> = ({ isLoggedIn }) => (
    <div>
        <h3>{isLoggedIn ? 'Ingelogd!' : 'Niet ingelogd!'}</h3>
    </div>
);

export default withAuthenticationContext(Login);
