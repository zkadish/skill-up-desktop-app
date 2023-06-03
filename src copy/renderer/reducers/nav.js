import * as actionTypes from '../actions/actionTypes';

const initialState = {
  // mainNavTabIndex: 0,
  builderTabIndex: 0
};

const nav = (state = initialState, action) => {
  switch (action.type) {
    // case actionTypes.SET_MAIN_NAV_TAB_INDEX: {
    //   return {
    //     ...state,
    //     mainNavTabIndex: action.index
    //   };
    // }
    case actionTypes.SET_BUILDER_TAB_INDEX: {
      return {
        ...state,
        builderTabIndex: action.index
      };
    }
    default:
      return state;
  }
};

export default nav;
