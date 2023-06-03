import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { setAuthenticatedUser, setAccessToken } from '../../actions/auth';
import {
  setUserAccount,
  setDaysEventHistory,
  setDaysEventFuture,
} from '../../actions/userAccount';
import Login from './Login';

// const mapStateToProps = state => {
//   return {
//     user: state.auth.user,
//   };
// };

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      setAuthenticatedUser,
      setAccessToken,
      setUserAccount,
      setDaysEventHistory,
      setDaysEventFuture,
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(withRouter(Login));
