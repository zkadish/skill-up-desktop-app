import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { setActiveCall } from '../../actions/app';
import { setEventNotification } from '../../actions/notifications';

import Calls from './Calls';

function mapStateToProps(state) {
  return {
    activeCall: state.app.activeCall,
    daysEvents: state.app.daysEvents,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setActiveCall,
      setEventNotification,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Calls));
