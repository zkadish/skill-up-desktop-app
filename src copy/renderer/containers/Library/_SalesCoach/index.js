import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

// import { searchBattleCardTalkTrack } from '../../../actions/builder';

import SalesCoach from './SalesCoach';

const mapStateToProps = state => {
  return {
    activeTemplate: state.builder.activeTemplate,
  };
};

// const mapDispatchToProps = dispatch => {
//   return bindActionCreators(
//     {
//       searchBattleCardTalkTrack
//     },
//     dispatch
//   );
// };

export default connect(mapStateToProps)(SalesCoach);
