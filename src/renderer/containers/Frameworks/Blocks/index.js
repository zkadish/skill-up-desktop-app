import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Blocks from './Blocks';

import {
  setBlocks,
  setBlock,
  removeBlock,
  setActiveBlock,
  setBlockName
} from '../../../actions/builder';
import { setAlert, setAlertDialog } from '../../../actions/notifications';

const mapStateToProps = state => {
  return {
    activeTemplate: state.builder.activeTemplate,
    activeBlock: state.builder.activeBlock
    // blocks: state.builder.blocks
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setActiveBlock,
      setBlocks,
      setBlock,
      removeBlock,
      setBlockName,
      setAlert,
      setAlertDialog
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Blocks));
