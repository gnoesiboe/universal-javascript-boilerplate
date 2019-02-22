import React from 'react';
import AuthenticationContextProvider from './security/AuthenticationContextProvider';
import Login from './authentication/Login';

const App: React.FunctionComponent<{}> = () => (
    <div className="container">
        <h1>Some app</h1>
        <AuthenticationContextProvider>
            <Login />
        </AuthenticationContextProvider>
    </div>
);

export default App;
