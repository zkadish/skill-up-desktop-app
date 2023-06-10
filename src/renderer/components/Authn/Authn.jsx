import React, { useEffect, useState, useCallback } from 'react';
import { func, object } from 'prop-types';
import { useNavigate } from 'react-router-dom';
import routes from '../../constants/routes';
import { authn } from '../../api/services/authn';

function Authn(props) {
  const { setAuthenticatedUser, children } = props;
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);

  const authResponse = useCallback(
    (status, data) => {
      if (data.authenticated) {
        setAuthenticated(true);
        setAuthenticatedUser(data.user);
        return;
      }
      setAuthenticated(false);
      navigate(routes.LOGIN);
    },
    [setAuthenticated, setAuthenticatedUser, navigate]
  );

  useEffect(() => {
    authn(authResponse)
      .then((response) => {
        const { status, data } = response;
        return authResponse(status, data);
      })
      .catch((err) => {
        console.log(err);
        debugger;
      });
  }, [authResponse]);

  return authenticated && children;
}

Authn.propTypes = {
  children: object.isRequired, // eslint-disable-line
  setAuthenticatedUser: func.isRequired,
};

export default Authn;
