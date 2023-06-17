import React, { useState, useEffect } from 'react';
import { object } from 'prop-types';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { Box } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import CallEventTemplate from './CallEventTemplate';
import History from './History';
import CallEventSettings from '../../containers/CallEventSettings';
// import routes from '../../constants/routes';

import classes from './CallDetails.styles';

function CallDetails() {
  const navigate = useNavigate();

  const [value, setValue] = useState(0);
  // const [settingsPage, setSettingsPage] = useState(null);

  // useEffect(() => {
  //   if (window.location.hash.includes('calls')) {
  //     setSettingsPage(false);
  //   }
  //   if (window.location.hash.includes('settings')) {
  //     setSettingsPage(true);
  //   }
  // }, [window.location.hash]);

  useEffect(() => {
    setValue(0);
    // navigate('/app/calls/templates');
  }, []);

  const onTabsChange = (e, tabIndex) => {
    setValue(tabIndex);
    switch (tabIndex) {
      case 1:
        navigate('history');
        break;
      case 2:
        navigate('settings');
        break;
      // case 2:
      //   navigate('/app/calls/notes');
      //   break;
      default:
        navigate('templates');
    }
  };

  return (
    <Box sx={{ ...classes.root }}>
      <AppBar sx={{ ...classes.appBar }} position="static">
        <Tabs
          value={value}
          onChange={onTabsChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="call details" sx={{ ...classes.tab }} />
          <Tab label="history" sx={{ ...classes.tab }} />
          <Tab label="settings" sx={{ ...classes.tab }} />
          {/* <Tab label="notes" /> */}
        </Tabs>
      </AppBar>
      <Paper sx={{ ...classes.paper }}>
        <Routes>
          <Route path="templates/*" element={<CallEventTemplate />} />
          <Route path="history" element={<History />} />
          <Route path="settings" element={<CallEventSettings />} />
          {/* <Route path="/app/calls/notes" elements={<Notes />} /> */}
          {/* <Route path={routes.APP} element={<CallEventTemplate />} />
          <Route path={routes.CALLS} element={<CallEventTemplate />} /> */}
        </Routes>
      </Paper>
    </Box>
  );
}

CallDetails.propTypes = {
  activeCall: object, // eslint-disable-line
};

CallDetails.defaultProps = {
  activeCall: {},
};

export default CallDetails;
