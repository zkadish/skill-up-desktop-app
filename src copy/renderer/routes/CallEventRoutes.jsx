import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CallEventWindow from '../containers/CallEventWindow';
import Authn from '../components/Authn';

const FrameWorkRoutes = () => {
  return (
    <Switch>
      <Route path="/">
        <Authn>
          <CallEventWindow />
        </Authn>
      </Route>
    </Switch>
  );
};

export default FrameWorkRoutes;
