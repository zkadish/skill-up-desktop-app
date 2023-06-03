import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MoreMenu from './MoreMenu';

import { setBlockType } from '../../../../actions/builder';

const mapStateToProps = state => {
  return { activeBlock: state.builder.activeBlock };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setBlockType }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MoreMenu);
