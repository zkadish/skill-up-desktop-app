import * as actionTypes from '../actions/actionTypes';
import { getTodayOffSet } from '../utils/time';

const initialState = {
  settings: null,
  daysEventHistory: [
    { 0: getTodayOffSet(-5).date },
    { 1: getTodayOffSet(-4).date },
    { 2: getTodayOffSet(-3).date },
    { 3: getTodayOffSet(-2).date },
    { 4: getTodayOffSet(-1).date },
  ],
  daysToday: [{ 5: getTodayOffSet(0).date }],
  daysEventFuture: [
    { 6: getTodayOffSet(1).date },
    { 7: getTodayOffSet(2).date },
    { 8: getTodayOffSet(3).date },
    { 9: getTodayOffSet(4).date },
    { 10: getTodayOffSet(5).date },
  ],
};

const userAccount = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER_ACCOUNT: {
      return {
        ...state,
        settings: action.settings,
      };
    }
    case actionTypes.SET_DAYS_EVENT_HISTORY: {
      const daysEventFuture = [];
      for (let i = 1; i <= state.daysEventFuture.length; i += 1) {
        daysEventFuture.push({
          [action.daysEventHistory.length + i]: getTodayOffSet(i).date,
        });
      }
      return {
        ...state,
        daysEventHistory: action.daysEventHistory,
        daysToday: [
          { [action.daysEventHistory.length]: getTodayOffSet(0).date },
        ],
        daysEventFuture,
      };
    }
    case actionTypes.SET_DAYS_EVENT_FUTURE: {
      return {
        ...state,
        daysEventFuture: action.daysEventFuture,
      };
    }
    default:
      return state;
  }
};

export default userAccount;
