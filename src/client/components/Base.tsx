import React from 'react';
import { Link } from 'react-router-dom';
import {
    createLoginPath,
    createProfilePath,
    createLogoutPath,
} from '../config/routing/urlGenerator';
import { renderRoutes } from 'react-router-config';
import { RouteConfigComponentProps } from 'react-router-config';
import {
    Navbar,
    NavItem,
    Nav,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import {
    withAuthenticationContext,
    AuthenticationContextProps,
} from './security/AuthenticationContext';
import { ToastContainer, toast } from 'react-toastify';

type Props = {} & RouteConfigComponentProps & AuthenticationContextProps;

const Base: React.FunctionComponent<Props> = ({ route, isLoggedIn }) => {
    return (
        <div>
            <Navbar color="dark" dark expand="md">
                <Nav className="ml-auto" navbar>
                    {!isLoggedIn && (
                        <NavItem>
                            <Link to={createLoginPath()} className="nav-link">
                                Inloggen
                            </Link>
                        </NavItem>
                    )}
                    {isLoggedIn && (
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                My account
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    <Link to={createProfilePath()}>
                                        Profile
                                    </Link>
                                </DropdownItem>
                                <DropdownItem>
                                    <Link to={createLogoutPath()}>Logout</Link>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    )}
                </Nav>
            </Navbar>
            {renderRoutes(route.routes)}
            <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
        </div>
    );
};

export default withAuthenticationContext(Base);
