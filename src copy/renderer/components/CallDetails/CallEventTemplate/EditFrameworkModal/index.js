import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import EditFrameworkModal from './EditFrameworkModal';

import {
  setCallEventModal,
  setCallEventInitState,
  setFrameworkTemplate,
} from '../../../../actions/app';

const mapStateToProps = state => {
  return {
    activeCall: state.app.activeCall,
    callEventModal: state.app.callEventModal,
    callEventInitState: state.app.callEventInitState,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setCallEventModal,
      setCallEventInitState,
      setFrameworkTemplate,
    },
    dispatch,
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(EditFrameworkModal));
