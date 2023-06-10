import { connect } from 'react-redux';
// import { BindActionsCreator } from 'redux';

import BreadCrumbs from './BreadCrumbs';

const mapStateToProps = (state) => {
  return {
    activeCall: state.app.activeCall,
    activeFrameworkBlock: state.app.activeFrameworkBlock,
    // activeFrameworkElement: state.app.activeFrameworkElement,
    activeFrameworkBattleCard: state.app.activeFrameworkBattleCard
  };
};

// const mapDispatchToProps = dispatch => {
//   return BindActionsCreator({}, dispatch);
// };

export default connect(
  mapStateToProps
  // mapDispatchToProps
)(BreadCrumbs);
