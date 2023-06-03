import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CallEventAccordion from './CallEventAccordion';

import {
  removeCallEventWindowAttendee,
  updateWinElement,
} from '../../../actions/winCallEvent';

const mapStateToProps = (state) => {
  return {
    callEvent: state.winCallEvent.callEvent,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      removeCallEventWindowAttendee,
      updateWinElement,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CallEventAccordion);
