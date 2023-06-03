import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CallEventSettings from './CallEventSettings';
import {
  setDaysEventHistory,
  setDaysEventFuture,
} from '../../actions/userAccount';

function mapStateToProps(state) {
  return {
    daysEventHistory: state.userAccount.daysEventHistory,
    daysEventFuture: state.userAccount.daysEventFuture,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setDaysEventHistory,
      setDaysEventFuture,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CallEventSettings);
