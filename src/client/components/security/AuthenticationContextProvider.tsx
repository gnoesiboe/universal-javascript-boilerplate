import React from 'react';
import AuthenticationContext, {
    AuthenticationContextProps,
    LoginHandler,
    LogoutHandler,
} from './AuthenticationContext';
import axios from 'axios';
import {
    DOMAIN,
    createApiLoginPath,
} from './../../../common/routing/urlGenerator';
import {
    AuthenticationLoginResponseResult,
    Response,
} from './../../../common/response/types';
import store from 'store';

type Props = {};

export const TOKEN_STORE_NAMESPACE = 'token';

type State = {
    isLoggedIn: boolean;
    token: string | null;
};

export default class AuthenticationContextProvider extends React.Component<
    Props,
    State
> {
    constructor(props: Props) {
        super(props);

        this.state = {
            isLoggedIn: false,
            token: store.get(TOKEN_STORE_NAMESPACE, null),
        };
    }

    public componentDidMount() {
        if (this.state.token) {
            this.setState(currentState => ({
                ...currentState,
                isLoggedIn: true,
            }));
        }
    }

    private handleLogin: LoginHandler = (email, password) => {
        const url = `${DOMAIN}${createApiLoginPath()}`;
        const data = { username: email, password };

        return axios
            .post<Response<AuthenticationLoginResponseResult>>(url, data)
            .then(response => {
                const token = response.data.result.token;

                this.setState(
                    currentState => ({
                        ...currentState,
                        isLoggedIn: true,
                    }),
                    () => {
                        store.set(TOKEN_STORE_NAMESPACE, token);
                    }
                );

                return true;
            })
            .catch(() => false);
    };

    private handleLogout: LogoutHandler = () => {
        store.remove(TOKEN_STORE_NAMESPACE);

        this.setState(currentState => ({
            ...currentState,
            isLoggedIn: false,
            token: null,
        }));
    };

    public render() {
        const props: AuthenticationContextProps = {
            isLoggedIn: this.state.isLoggedIn,
            handleLogin: this.handleLogin,
            handleLogout: this.handleLogout,
            token: this.state.token,
        };

        return (
            <AuthenticationContext.Provider value={props}>
                {this.props.children}
            </AuthenticationContext.Provider>
        );
    }
}
