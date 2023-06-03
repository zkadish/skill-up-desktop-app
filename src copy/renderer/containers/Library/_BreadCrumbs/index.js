import { connect } from 'react-redux';
// import { BindActionsCreator } from 'redux';
import { withRouter } from 'react-router-dom';

import BreadCrumbs from './BreadCrumbs';

// import {} from '../../../actions/notifications';

const mapStateToProps = state => {
  return {
    activeTemplate: state.builder.activeTemplate,
    activeBlock: state.builder.activeBlock,
    // activeElement: state.builder.activeElement,
    activeBattleCard: state.builder.activeBattleCard
    // elements: state.builder.elements
  };
};

// const mapDispatchToProps = dispatch => {
//   return BindActionsCreator({}, dispatch);
// };

export default connect(
  mapStateToProps
  // mapDispatchToProps
)(withRouter(BreadCrumbs));
