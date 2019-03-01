import React from 'react';
import {
    AuthenticationContextProps,
    withAuthenticationContext,
} from '../security/AuthenticationContext';
import {
    Response,
    AccountProfileResponseResult,
} from '../../../common/response/types';
import axios from 'axios';
import {
    createApiProfilePath,
    DOMAIN,
} from './../../../common/routing/urlGenerator';
import { Redirect } from 'react-router';
import { createLoginPath } from './../../config/routing/urlGenerator';
import { toast } from 'react-toastify';

type State = {
    profile: AccountProfileResponseResult | null;
};

type Props = {} & AuthenticationContextProps;

class Profile extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            profile: null,
        };
    }

    public componentDidMount() {
        // @todo move to central point + catch 401 responses and logout user
        axios
            .get<Response<AccountProfileResponseResult>>(
                `${DOMAIN}${createApiProfilePath()}`,
                {
                    headers: {
                        Authorization: `Bearer ${this.props.token}`,
                    },
                }
            )
            .then(response => {
                this.setState(currentState => ({
                    profile: response.data.result,
                }));
            });
    }

    public render() {
        const { profile } = this.state;

        if (!profile) {
            return <div>Loading..</div>;
        }

        return (
            <div>
                <h1>{profile.email}</h1>
                <h3>{profile.userId}</h3>
            </div>
        );
    }
}

export default withAuthenticationContext(Profile);
