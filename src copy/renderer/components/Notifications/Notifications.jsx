import React from 'react';
import { array, object, func } from 'prop-types';

import { MenuList, MenuItem, Divider, Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import IconButton from '@mui/material/IconButton';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

// import scss from '../../styles/_variables.module.scss';

// const menuListStyles = makeStyles({
//   root: {
//     backgroundColor: scss.BACKGROUND_PRIMARY_LIGHT
//   }
// });

// TODO: remove Notification from list after onClick Notification
// TODO: Highlight call onClick Notification

const menuItemStyles = makeStyles({
  root: {
    display: 'block',
    minWidth: '340px',
    // minHeight: '60px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '14px',
    fontWeight: '500',
  },
});

const iconButtonStyles = makeStyles({
  root: {
    padding: '4px',
  },
  svg: {
    width: '.75em',
    height: '.75em',
  },
});

const Notifications = (props) => {
  const {
    history,
    // notifications,
    eventNotifications,
    closeEventNotification,
  } = props;
  const menuItemClasses = menuItemStyles();
  const iconButtonClasses = iconButtonStyles();

  const onEventNotificationClick = (notification) => () => {
    closeEventNotification(notification);
    history.push(notification.link);
  };

  const onCloseNotification = (notification) => (e) => {
    e.stopPropagation();
    closeEventNotification(notification);
  };

  return (
    <MenuList>
      <Divider />
      {/* {notifications.map(notification => {
        return (
          <Box key={notification.id}>
            <Link to={notification.link} onClick={onNotificationClick}>
              <MenuItem className={menuItemClasses.root}>
                <Box>{notification.name}</Box>
                <Box>{notification.message}</Box>
              </MenuItem>
            </Link>
            <Divider />
          </Box>
        );
      })} */}
      {eventNotifications.map((notification) => {
        return (
          <Box key={notification.id}>
            <MenuItem
              className={menuItemClasses.root}
              onClick={onEventNotificationClick(notification)}
            >
              <Box className={menuItemClasses.header}>
                <Box>Call Event</Box>
                <IconButton
                  onClick={onCloseNotification(notification)}
                  className={iconButtonClasses.root}
                  size="large"
                >
                  <CloseOutlinedIcon className={iconButtonClasses.svg} />
                </IconButton>
              </Box>
              <Box>{notification.name}</Box>
              <Box>{notification.message}</Box>
            </MenuItem>
            <Divider />
          </Box>
        );
      })}
    </MenuList>
  );
};

Notifications.propTypes = {
  history: object, // eslint-disable-line
  notifications: array, // eslint-disable-line
  eventNotifications: array, // eslint-disable-line
  closeEventNotification: func.isRequired,
};

export default Notifications;
