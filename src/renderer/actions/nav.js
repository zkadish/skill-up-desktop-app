/* eslint-disable import/prefer-default-export */
import * as actionTypes from './actionTypes';

// note: not being used
// export const setMainNavTabIndex = index => {
//   return {
//     type: actionTypes.SET_MAIN_NAV_TAB_INDEX,
//     index
//   };
// };

export const setBuilderTabIndex = index => {
  return {
    type: actionTypes.SET_BUILDER_TAB_INDEX,
    index
  };
};
