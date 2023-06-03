import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import App from './App';
import {
  // setNotifications,
  toggleNotifyDrawer,
  setEventNotification,
  setAlert,
  setAlertDialog,
} from '../../actions/notifications';
import getTemplates from '../../actions/templates';
import getEvents from '../../actions/callEvents';
import { setCallEventModal, setDaysEvents } from '../../actions/app';

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    router: state.router,
    // daysDates: state.app.daysDates,
    pastEvents: state.app.pastEvents,
    templates: state.builder.templates,
    notifyDrawer: state.notifications.notifyDrawer,
    eventNotifications: state.notifications.eventNotifications,
    daysEventFuture: state.userAccount.daysEventFuture,
    daysEventHistory: state.userAccount.daysEventHistory,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getEvents,
      getTemplates,
      setDaysEvents,
      toggleNotifyDrawer,
      // setNotifications,
      setEventNotification,
      setAlert,
      setAlertDialog,
      setCallEventModal,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
