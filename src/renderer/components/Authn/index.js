import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setAuthenticatedUser } from '../../actions/auth';

import Authn from './Authn';

// const mapStateToProps = state => {
//   return {
//     user: state.auth.user,
//   };
// };

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      setAuthenticatedUser,
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(Authn);
