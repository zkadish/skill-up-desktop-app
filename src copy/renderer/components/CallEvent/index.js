import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CallEvent from './CallEvent';

import { setAlert, toggleNotifyDrawer } from '../../actions/notifications';
import { setActiveCall } from '../../actions/app';
import {
  setActiveWinCallEvent,
} from '../../actions/winCallEvent';

const mapStateToProps = state => {
  return {
    activeCall: state.app.activeCall,
    activeWinCallEvent: state.winCallEvent.activeWinCallEvent,
    eventNotifications: state.notifications.eventNotifications
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setActiveCall,
      setAlert,
      setActiveWinCallEvent,
      toggleNotifyDrawer
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CallEvent);
