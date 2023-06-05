import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CallEventWindow from '../containers/CallEventWindow';
import Authn from '../components/Authn';

function FrameWorkRoutes() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Authn>
            <CallEventWindow />
          </Authn>
        </Route>
      </Switch>
    </Router>
  );
}

export default FrameWorkRoutes;
