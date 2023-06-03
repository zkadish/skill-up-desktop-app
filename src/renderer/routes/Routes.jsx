import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from '../constants/routes';
import App from '../containers/App';
import PasswordReset from '../components/PasswordReset';
import Login from '../components/Login';
import MainWinEventListener from '../containers/MainWinEventListener';
import Authn from '../components/Authn';

const Routes = () => {
  return (
    <MainWinEventListener>
      <Switch>
        <Route path={routes.APP}>
          <Authn>
            <App />
          </Authn>
        </Route>
        <Route path={routes.PASSWORD_RESET}>
          <PasswordReset />
        </Route>
        <Route path={routes.LOGIN} component={Login}>
          <Login />
        </Route>
      </Switch>
    </MainWinEventListener>
  );
};

export default Routes;
