import React, { useState, useEffect } from 'react';
import { object, func, bool, array } from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import LaunchIcon from '@mui/icons-material/Launch';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Accordion from './Accordion';
import NotificationBtn from '../NotificationBtn';

import {
  severity,
  SKILL_UP_NO_TEMPLATE,
  ONLY_ONE_SKILL_UP,
  SKILL_UP_SESSION_STARTED,
} from '../../constants/notifications';

import { spacing } from '../../styles/variables.styles';
import classes from './CallEvent.styles';

function CallEvent(props) {
  const {
    event,
    setActiveCall,
    activeCall,
    setAlert,
    setActiveWinCallEvent,
    activeWinCallEvent,
    toggleNotifyDrawer,
    eventNotifications,
  } = props;

  const [active, setActive] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // useEffect(() => {
  //   console.log(maxWidth1292);
  //   debugger
  // }, [maxWidth1292]);

  useEffect(() => {
    const notifies = eventNotifications.filter(
      (eventN) => eventN.eventId === event.id
    );
    setNotifications(notifies);
  }, [eventNotifications, event.id]);

  useEffect(() => {
    setActive(false);
    if (!activeCall) return;
    if (event.id === activeCall.id) setActive(true);
  }, [activeCall, event.id]);

  const onDetailsClick = () => {
    setActiveCall(event);
  };

  const onNotificationsClick = () => {
    toggleNotifyDrawer();
  };

  // TODO: Put the launch button on lock down...
  // if its past the time and date of the event
  const onLaunchClick = () => {
    // if Sales Coach is running let user know they
    // can't launch another Sales Coach instance.
    // Preventing click handler from launching another sales coach instance
    // TODO: add disabled to all launch btn as well
    if (activeWinCallEvent) {
      // warn user they can't run 2 sales coach windows at the same time
      setAlert({
        open: true,
        duration: 20000,
        severity: severity.WARNING,
        message: ONLY_ONE_SKILL_UP,
      });
      return;
    }

    // Should launch btn set active call? I'm leaning towards no.
    // Only details btn should set active call. Keep state events
    // to doing only one thing! Leaving for now...
    setActiveCall(event);

    // Check for a template
    if (!event.frameworkTemplate.id) {
      // warn user the call event needs a template before sales coach up can be launched
      setAlert({
        open: true,
        duration: 20000,
        severity: severity.WARNING,
        message: SKILL_UP_NO_TEMPLATE,
      });
      return;
    }
    // you could send the event id?
    setActiveWinCallEvent(true);
    setAlert({
      open: true,
      duration: null,
      severity: severity.INFO,
      message: SKILL_UP_SESSION_STARTED,
    });

    // open callEventWindow
    // window.electron.ipcRenderer.openCallEventWin(event);
    window.electron.ipcRenderer.sendMessage('open-call-event-win', event);
    window.electron.ipcRenderer.once('close-call-event-win', () => {
      setActiveWinCallEvent(false);
      setAlert({
        open: false,
        duration: null,
        severity: severity.INFO,
        message: SKILL_UP_SESSION_STARTED,
      });
    });
  };

  return (
    <Card
      variant="outlined"
      sx={{
        ...classes.card,
        ...(active && classes.active),
      }}
    >
      <CardContent onClick={onDetailsClick}>
        <Typography>{`${event.start?.time} to ${event.end?.time}`}</Typography>
        <NotificationBtn
          number={notifications.length}
          color="secondary"
          onClick={onNotificationsClick}
          sx={{
            '&.MuiButtonBase-root': {
              position: 'absolute',
              top: '2px',
              right: '2px',
            },
          }}
        />
        <Typography
          sx={{
            '&.MuiTypography-root': {
              margin: `0 0 ${spacing.XS}`,
              fontSize: 18,
              fontWeight: 'bold',
            },
          }}
        >
          {event.summary}
        </Typography>
        <ButtonGroup
          fullWidth
          variant="outlined"
          aria-label="contained primary button group"
          sx={{ ...classes.launchBtn }}
        >
          <Button
            onClick={onLaunchClick}
            startIcon={
              activeWinCallEvent || event.frameworkTemplate.locked ? (
                <LockOutlinedIcon />
              ) : (
                <LaunchIcon sx={{ ...classes.launchBtnIcon }} />
              )
            }
            disabled={activeWinCallEvent || event.frameworkTemplate.locked}
            sx={{ backgroundColor: 'inherit' }}
          >
            Sales Coach
          </Button>
          {/* <Button
            style={maxWidth1292 ? { fontSize: '10px' } : { fontSize: '12px' }}
            onClick={onLaunchClick}
            startIcon={
              activeWinCallEvent || event.frameworkTemplate.locked ? (
                <LockOutlinedIcon />
              ) : (
                <LaunchIcon className={launchBtnClasses.transform} />
              )
            }
            disabled={activeWinCallEvent || event.frameworkTemplate.locked}
          >
            Sales Coach
          </Button> */}
          {/* <Button
            style={maxWidth1292 ? { fontSize: '10px' } : { fontSize: '12px' }}
            onClick={onDetailsClick}
          >
            Details
          </Button> */}
        </ButtonGroup>
        <Accordion event={event} />
      </CardContent>
    </Card>
  );
}

CallEvent.propTypes = {
  event: object.isRequired, // eslint-disable-line
  setActiveCall: func.isRequired,
  setAlert: func.isRequired,
  activeCall: object, // eslint-disable-line
  setActiveWinCallEvent: func.isRequired,
  activeWinCallEvent: bool.isRequired,
  toggleNotifyDrawer: func.isRequired,
  eventNotifications: array // eslint-disable-line
};

export default CallEvent;
