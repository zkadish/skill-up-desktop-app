import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import routes from '../constants/routes';
import App from '../containers/App';
import PasswordReset from '../components/PasswordReset';
import Login from '../components/Login';
import MainWinEventListener from '../containers/MainWinEventListener';
import Authn from '../components/Authn';

function AppRoutes() {
  return (
    <MainWinEventListener>
      <HashRouter>
        <Routes>
          <Route
            path="app/*"
            element={
              <Authn>
                <App />
              </Authn>
            }
          />
          <Route path={routes.PASSWORD_RESET} element={<PasswordReset />} />
          <Route path={routes.LOGIN} element={<Login />} />
        </Routes>
      </HashRouter>
    </MainWinEventListener>
  );
}

export default AppRoutes;
