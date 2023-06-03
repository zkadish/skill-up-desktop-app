import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/notifications';

import Alert from './Alert';

const mapStateToProps = state => {
  return {
    alert: state.notifications.alert
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ setAlert }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
