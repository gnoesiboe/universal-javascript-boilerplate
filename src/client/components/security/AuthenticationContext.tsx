import React from 'react';
import { Subtract } from 'utility-types';
import { AxiosPromise } from 'axios';

export type LoginHandler = (
    email: string,
    password: string
) => Promise<boolean>;

export type LogoutHandler = () => void;

export type AuthenticationContextProps = {
    isLoggedIn: boolean;
    handleLogin: LoginHandler;
    handleLogout: LogoutHandler;
    token: string | null;
};

const defaultValue: AuthenticationContextProps = {
    isLoggedIn: false,
    handleLogin: () => Promise.reject(),
    handleLogout: () => undefined,
    token: null,
};

const AuthenticationContext = React.createContext<AuthenticationContextProps>(
    defaultValue
);

export default AuthenticationContext;

export const withAuthenticationContext = <P extends AuthenticationContextProps>(
    WrappedComponent: React.ComponentType<P>
): React.FunctionComponent<
    Subtract<P, AuthenticationContextProps>
> => props => (
    <AuthenticationContext.Consumer>
        {contextProps => <WrappedComponent {...props as P} {...contextProps} />}
    </AuthenticationContext.Consumer>
);
