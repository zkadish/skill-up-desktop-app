import React, { useEffect, useState, useCallback } from 'react';
import { func, object, array, bool, number } from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Drawer from '@material-ui/core/Drawer';

import MainMenu from '../../components/MainMenu';
import Notifications from '../../components/Notifications';
import Calls from '../../components/Calls';
// import Reports from '../Reports';
import Frameworks from '../Frameworks';
import Library from '../Library';
import AppSettings from '../AppSettings';
import Alert from '../../components/Alert';
import AlertDialog from '../../components/AlertDialog';
import Modal from '../../components/Modal';
import routes from '../../constants/routes';

// import { createCallEvents } from '../../api/integration/googleCalendar';
// import { getNotifications } from '../../api/services/cues/api';

import classes from './App.styles';

const App = (props) => {
  const {
    user,
    // setNotifications,
    getEvents,
    getTemplates,
    templates,
    // daysDates,
    // setDaysEvents,
    notifyDrawer,
    toggleNotifyDrawer,
    setAlert,
    setAlertDialog,
    // setCallEventModal,
    // setEventNotification,
    // eventNotifications,
    daysEventFuture,
    daysEventHistory,
  } = props;

  // const [templatesRequested, setTemplatesRequested] = useState(false);

  /**
   * these useEffects get the necessary data to run the app.
   */
  useEffect(() => {
    // TODO: refactor this useEffect to be a custom hook to better control when its fired
    // and to create an update function or callback.
    // if (!templatesRequested && user && templates.length === 0) {
    if (user && templates.length === 0) {
      /**
       * Get the system and user created templates
       * Maybe move this call to web worker or to the Frameworks page
       */
      // setTemplatesRequested(true);
      getTemplates();
    }
  }, [getTemplates, templates, user]);

  useEffect(() => {
    // if (user && !eventsRequested) {
    if (user) {
      getEvents(daysEventFuture, daysEventHistory);
    }
  }, [
    getEvents,
    user,
    // eventsRequested,
    daysEventFuture,
    daysEventHistory,
  ]);

  const toggleDrawer = useCallback(() => {
    toggleNotifyDrawer();
  }, [toggleNotifyDrawer]);

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlert({
      open: false,
    });
  };

  const handleCloseAlertDialog = () => {
    setAlertDialog({
      open: false,
    });
  };

  return (
    <Box sx={{ ...classes.root }}>
      <MainMenu />
      <Switch>
        <Route path={`${routes.APP_SETTINGS}`}>
          <AppSettings />
        </Route>
        <Route path={`${routes.LIBRARY}`}>
          <Library />
        </Route>
        <Route path={`${routes.FRAMEWORKS}`}>
          <Frameworks />
        </Route>
        {/* <Route path={`${routes.REPORTS}`} component={Reports} /> */}
        <Route path={[routes.APP, `${routes.CALLS}`]}>
          <Calls />
        </Route>
      </Switch>
      <Drawer anchor="right" open={notifyDrawer} onClose={toggleDrawer}>
        <Notifications />
      </Drawer>
      <Alert handleClose={handleCloseAlert} />
      <AlertDialog handleClose={handleCloseAlertDialog} />
      <Modal />
    </Box>
  );
};

App.propTypes = {
  // daysDates: array.isRequired, // eslint-disable-line
  daysEventFuture: array.isRequired, // eslint-disable-line
  daysEventHistory: array.isRequired, // eslint-disable-line
  getTemplates: func.isRequired,
  getEvents: func.isRequired,
  notifyDrawer: bool,
  // setDaysEvents: func.isRequired,
  // setNotifications: func.isRequired,
  templates: array, // eslint-disable-line
  toggleNotifyDrawer: func.isRequired,
  setAlert: func.isRequired,
  setAlertDialog: func.isRequired,
  // setCallEventModal: func.isRequired,
  // setEventNotification: func.isRequired,
  eventNotifications: array.isRequired, // eslint-disable-line
  user: object, // eslint-disable-line
};

App.defaultProps = {
  // daysEventFuture: [],
  // daysEventHistory: [],
  notifyDrawer: false,
  // toggleNotifyDrawer: () => {}
};

export default App;
