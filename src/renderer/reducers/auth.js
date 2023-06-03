import * as actionTypes from '../actions/actionTypes';

const initialState = {
  user: null,
  accessToken: null,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_AUTHENTICATED_USER: {
      return {
        ...state,
        user: action.user,
      };
    }
    case actionTypes.SET_ACCESS_TOKEN: {
      return {
        ...state,
        accessToken: action.token,
      };
    }
    default:
      return state;
  }
};

export default auth;
