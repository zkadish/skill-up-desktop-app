import * as actionTypes from '../actions/actionTypes';
import { severity, SKILL_UP_NO_TEMPLATE } from '../constants/notifications';

import { notifications as mockData } from '../mockData/notifications';

const initialState = {
  notifications: mockData,
  eventNotifications: [],
  notifyDrawer: false,
  alert: {
    open: false,
    duration: null,
    severity: severity.SUCCESS,
    message: SKILL_UP_NO_TEMPLATE
  },
  alertDialog: {
    open: false,
    title: '',
    message: '',
    type: '',
    action: () => {}
  }
};

const notifications = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.notifications
      };
    case actionTypes.SET_EVENT_NOTIFICATION:
      return {
        ...state,
        eventNotifications: [...state.eventNotifications, action.notification]
      };
    case actionTypes.CLOSE_EVENT_NOTIFICATION: {
      const eventNotifications = [...state.eventNotifications];
      const { notification } = action;

      const index = eventNotifications.findIndex(n => n.id === notification.id);
      eventNotifications.splice(index, 1);

      return {
        ...state,
        eventNotifications
      };
    }
    case actionTypes.TOGGLE_NOTIFY_DRAWER:
      return {
        ...state,
        notifyDrawer: !state.notifyDrawer
      };
    case actionTypes.SET_ALERT:
      return {
        ...state,
        alert: action.alert
      };
    case actionTypes.SET_ALERT_DIALOG:
      return {
        ...state,
        alertDialog: action.alertDialog
      };
    default:
      return state;
  }
};

export default notifications;
