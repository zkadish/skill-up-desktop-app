import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

import History from './History';

const mapStateToProps = state => {
  return {
    activeCall: state.app.activeCall,
    domainHistory: state.app.domainHistory
    // activeCallTemplate: state.app.activeCallTemplate,
    // templates: state.builder.templates,
    // blocks: state.builder.blocks,
    // elements: state.builder.elements
  };
};

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(
//     {},
//     dispatch
//   );
// }

export default connect(mapStateToProps)(History);
