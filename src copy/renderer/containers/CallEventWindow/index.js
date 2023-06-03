import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CallEventWindow from './CallEventWindow';

import { setWinCallEvent } from '../../actions/winCallEvent';

// const mapStateToProps = state => {
//   return {
//     callEvent: state.winCallEvent.callEvent
//   };
// };

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ setWinCallEvent }, dispatch);
};

export default connect(null, mapDispatchToProps)(CallEventWindow);
