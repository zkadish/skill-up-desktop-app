import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Notifications from './Notifications';

import { closeEventNotification } from '../../actions/notifications';

const mapStateToProps = (state) => {
  return {
    // notifications: state.notifications.notifications,
    eventNotifications: state.notifications.eventNotifications
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ closeEventNotification }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
