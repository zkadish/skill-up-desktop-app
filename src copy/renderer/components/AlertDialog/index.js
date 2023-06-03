import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setAlertDialog } from '../../actions/notifications';

import AlertDialog from './AlertDialog';

const mapStateToProps = state => {
  return {
    alertDialog: state.notifications.alertDialog
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ setAlertDialog }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AlertDialog);
