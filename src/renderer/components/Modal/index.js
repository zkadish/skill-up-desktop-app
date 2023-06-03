import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setCallEventModal } from '../../actions/app';

import Modal from './Modal';

const mapStateToProps = state => {
  return {
    callEventModal: state.app.callEventModal
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ setCallEventModal }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
