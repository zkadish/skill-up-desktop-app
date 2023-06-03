import * as actionTypes from './actionTypes';

export const setActiveWinCallEvent = (activeWinCallEvent) => {
  return {
    type: actionTypes.SET_ACTIVE_WIN_CALL_EVENT,
    activeWinCallEvent,
  };
};

export const setWinCallEvent = (callEvent) => {
  return {
    type: actionTypes.SET_WIN_CALL_EVENT,
    callEvent,
  };
};

export const updateWinElement = (element) => {
  return {
    type: actionTypes.UPDATE_WIN_ELEMENT,
    element,
  };
};

export const removeCallEventWindowAttendee = (element) => {
  return {
    type: actionTypes.REMOVE_CALL_EVENT_WINDOW_ATTENDEE,
    element,
  };
};
