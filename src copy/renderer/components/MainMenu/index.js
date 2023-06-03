import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import MainMenu from './MainMenu';
import { toggleNotifyDrawer } from '../../actions/notifications';

// TODO: decide when to use a container to wrap components or its index file
const mapStateToProps = state => {
  return {
    user: state.auth.user,
    mainNavTabIndex: state.app.mainNavTabIndex,
    router: state.router,
    eventNotifications: state.notifications.eventNotifications
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      // setMainNavTabIndex,
      toggleNotifyDrawer
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);
