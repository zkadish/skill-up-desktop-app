import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Blocks from './Blocks';

import {
  setFrameworkBlocks,
  setFrameworkBlock,
  setActiveFrameworkBlock,
  removeFrameworkBlock,
  setFrameworkBlockName,
  setFrameworkBlockType
} from '../../../../../actions/app';
import { setAlert, setAlertDialog } from '../../../../../actions/notifications';

const mapStateToProps = state => {
  return {
    // activeCall: state.app.activeCall,
    callEventModal: state.app.callEventModal,
    activeFrameworkBlock: state.app.activeFrameworkBlock
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setFrameworkBlocks,
      setFrameworkBlock,
      setActiveFrameworkBlock,
      removeFrameworkBlock,
      setFrameworkBlockName,
      setFrameworkBlockType,
      setAlert,
      setAlertDialog
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Blocks));
