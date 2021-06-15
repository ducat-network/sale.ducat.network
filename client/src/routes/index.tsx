import React from 'react';
import { Route, Switch, Redirect, BrowserRouter as Routes } from 'react-router-dom';

import { IRouter } from '@interfaces/IRouter';
import { Home } from '@pages/Home';

const baseRoutes: React.FC = () => (
    <Switch>
        <Route path='/' exact component={Home} />
        <Redirect to='/' />
    </Switch>
);

const useRoutes: React.FC<IRouter> = ({ accessStatus }) => {
    switch(accessStatus) {
        case 'NOT_AUTH_ACCOUNTANT': return baseRoutes(null);
        default: return baseRoutes(null);
    }
};

export const Router: React.FC = () => {
    const currentRoutes = useRoutes({ accessStatus: 'NOT_AUTH_ACCOUNTANT' });
    return (<Routes>{ currentRoutes }</Routes>);
};