import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CallDetails from './CallDetails';

// const mapStateToProps = state => {
//   return {
//     activeCall: state.app.activeCall
//   };
// };

// TODO: make sure withRouter is being used
export default connect()(withRouter(CallDetails));
