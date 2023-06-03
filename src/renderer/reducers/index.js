import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
// import { configureStore } from '@reduxjs/toolkit';
import auth from './auth';
import userAccount from './userAccount';
import app from './app';
import builder from './builder';
import nav from './nav';
import notifications from './notifications';
import winCallEvent from './winCallEvent';
import frameworksSliceReducer from '../containers/Frameworks/reduxSlice/frameworksSlice';

// const toolKitReducers = configureStore({
//   reducer: {
//     frameworks: frameworksSliceReducer,
//   },
// });

export default function createRootReducer(history) {
  return combineReducers({
    router: connectRouter(history),
    auth,
    userAccount,
    app,
    builder,
    nav,
    notifications,
    winCallEvent,
    frameworks: frameworksSliceReducer,
  });
}
