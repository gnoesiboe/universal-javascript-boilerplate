import React from 'react';
import {
    AuthenticationContextProps,
    withAuthenticationContext,
} from './../security/AuthenticationContext';
import { Redirect } from 'react-router';
import { createHomePath } from '../../config/routing/urlGenerator';
import LoginForm, { OnSubmittedAndValidCallback } from './components/LoginForm';

type Props = {} & AuthenticationContextProps;

class Login extends React.Component<Props> {
    private onFormSubmittedAndValid: OnSubmittedAndValidCallback = values => {
        this.props.handleLogin(values.email, values.password);
    };

    public render() {
        const { isLoggedIn } = this.props;

        if (isLoggedIn) {
            return <Redirect to={createHomePath()} />;
        }

        return (
            <LoginForm onFormSubmittedAndValid={this.onFormSubmittedAndValid} />
        );
    }
}

export default withAuthenticationContext(Login);
