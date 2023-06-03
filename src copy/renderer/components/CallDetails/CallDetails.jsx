import React, { useState, useEffect } from 'react';
import { object } from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import { Box } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import CallEventTemplate from './CallEventTemplate';
import History from './History';
import CallEventSettings from '../../containers/CallEventSettings';
import routes from '../../constants/routes';

import classes from './CallDetails.styles';

const CallDetails = (props) => {
  const { history } = props;

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
    // history.push('/app/calls/templates');
  }, []);

  const onTabsChange = (e, tabIndex) => {
    setValue(tabIndex);
    switch (tabIndex) {
      case 1:
        history.push(`${routes.HISTORY}`);
        break;
      case 2:
        history.push(`${routes.CALL_EVENT_SETTINGS}`);
        break;
      // case 2:
      //   history.push('/app/calls/notes');
      //   break;
      default:
        history.push(`${routes.CALL_TEMPLATES}`);
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
        <Switch>
          {/* <Route path="/app/calls/notes">
            <Notes />
          </Route> */}
          <Route path={`${routes.CALL_EVENT_SETTINGS}`}>
            <CallEventSettings />
          </Route>
          <Route path={`${routes.HISTORY}`}>
            <History />
          </Route>
          <Route
            path={[
              `${routes.APP}`,
              `${routes.CALLS}`,
              `${routes.CALL_TEMPLATES}`,
            ]}
          >
            <CallEventTemplate />
          </Route>
        </Switch>
      </Paper>
    </Box>
  );
};

CallDetails.propTypes = {
  history: object, // eslint-disable-line
  activeCall: object // eslint-disable-line
};

CallDetails.defaultProps = {
  activeCall: {},
};

export default CallDetails;
