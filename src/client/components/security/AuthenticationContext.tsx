import React from 'react';
import { Subtract } from 'utility-types';

export type AuthenticationContextProps = {
    isLoggedIn: boolean;
};

const defaultValue: AuthenticationContextProps = {
    isLoggedIn: false,
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
