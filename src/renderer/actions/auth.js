import * as actionTypes from './actionTypes';

// AUTHENTICATION
export const setAuthenticatedUser = (user) => {
  return {
    type: actionTypes.SET_AUTHENTICATED_USER,
    user,
  };
};

// AUTHORIZATION

export const setAccessToken = (token) => {
  return {
    type: actionTypes.SET_ACCESS_TOKEN,
    token,
  };
};
