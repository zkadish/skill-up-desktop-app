import * as actionTypes from './actionTypes';
import { getTodayOffSet } from '../utils/time';
import { updateUserAccount } from '../api/services/userAccounts';

// USER ACCOUNT
export const setUserAccount = (settings) => {
  return {
    type: actionTypes.SET_USER_ACCOUNT,
    settings,
  };
};

export const setDaysEventHistory = (daysHistory) => {
  return (dispatch, store) => {
    const state = store();
    updateUserAccount(state.auth.user, { callEventHistory: daysHistory })
      .then((data) => data)
      .catch((err) => {
        console.log(err);
        debugger;
      });

    const daysEventHistory = [];
    if (daysHistory > 0) {
      for (let i = 0; i < daysHistory; i += 1) {
        daysEventHistory.push({
          [i]: getTodayOffSet((daysHistory - i) * -1).date,
        });
      }
    }

    dispatch({
      type: actionTypes.SET_DAYS_EVENT_HISTORY,
      daysEventHistory,
    });
  };
};

export const setDaysEventFuture = (daysFuture, daysHistory) => {
  return (dispatch, store) => {
    const state = store();
    updateUserAccount(state.auth.user, { callEventFuture: daysFuture })
      .then((data) => data)
      .catch((err) => {
        console.log(err);
        debugger;
      });

    const daysEventFuture = [];
    for (let i = 1; i <= daysFuture; i += 1) {
      daysEventFuture.push({ [daysHistory + i]: getTodayOffSet(i).date });
    }

    dispatch({
      type: actionTypes.SET_DAYS_EVENT_FUTURE,
      daysEventFuture,
    });
  };
};
