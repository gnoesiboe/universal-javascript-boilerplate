import React from 'react';
import AuthenticationContext, {
    AuthenticationContextProps,
} from './AuthenticationContext';

type Props = {};

type State = {
    isLoggedIn: boolean;
};

export default class AuthenticationContextProvider extends React.Component<
    Props,
    State
> {
    constructor(props: Props) {
        super(props);

        this.state = {
            isLoggedIn: false,
        };
    }

    public render() {
        const props: AuthenticationContextProps = {
            isLoggedIn: this.state.isLoggedIn,
        };

        return (
            <AuthenticationContext.Provider value={props}>
                {this.props.children}
            </AuthenticationContext.Provider>
        );
    }
}
