import * as actionTypes from './actionTypes';

// NOTIFICATIONS
export const setNotifications = (notifications) => {
  return {
    type: actionTypes.SET_NOTIFICATIONS,
    notifications,
  };
};

export const setEventNotification = (notification) => {
  return {
    type: actionTypes.SET_EVENT_NOTIFICATION,
    notification,
  };
};

export const closeEventNotification = (notification) => {
  return {
    type: actionTypes.CLOSE_EVENT_NOTIFICATION,
    notification,
  };
};

export const toggleNotifyDrawer = () => {
  return {
    type: actionTypes.TOGGLE_NOTIFY_DRAWER,
  };
};

// ALERTS
export const setAlert = (alert) => {
  return {
    type: actionTypes.SET_ALERT,
    alert,
  };
};

export const setAlertDialog = (alertDialog) => {
  return {
    type: actionTypes.SET_ALERT_DIALOG,
    alertDialog,
  };
};
