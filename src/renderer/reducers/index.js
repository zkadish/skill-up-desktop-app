import { combineReducers } from 'redux';
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

export default function createRootReducer() {
  return combineReducers({
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
