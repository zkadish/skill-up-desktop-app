import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MoreMenu from './MoreMenu';

import { setElementType } from '../../../../actions/builder';

const mapStateToProps = state => {
  return { activeElement: state.builder.activeElement };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setElementType }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MoreMenu);
