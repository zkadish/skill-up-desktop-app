import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import MainWinEventListener from './MainWinEventListener';

import {
  removeCallEventAttendee,
  updateCallEventElement,
  updateCallEventAction,
  updateCallEventNote,
} from '../../actions/app';

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      removeCallEventAttendee,
      updateCallEventElement,
      updateCallEventAction,
      updateCallEventNote,
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(MainWinEventListener);
