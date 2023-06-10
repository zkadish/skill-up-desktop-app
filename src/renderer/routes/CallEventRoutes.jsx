import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import CallEventWindow from '../containers/CallEventWindow';
import Authn from '../components/Authn';

function FrameWorkRoutes() {
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Authn>
              <CallEventWindow />
            </Authn>
          }
        />
      </Routes>
    </HashRouter>
  );
}

export default FrameWorkRoutes;
