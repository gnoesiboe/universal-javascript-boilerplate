import React from 'react';
import AuthenticationContextProvider from './security/AuthenticationContextProvider';
import { BrowserRouter as Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from './../config/routing/routes';
import { Container } from 'reactstrap';

const App: React.FunctionComponent = () => (
    <Container>
        <AuthenticationContextProvider>
            <Router>{renderRoutes(routes)}</Router>
        </AuthenticationContextProvider>
    </Container>
);

export default App;
