import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Attending from './Attending';

import { setAlert } from '../../actions/notifications';
import { removeCallEventAttendee } from '../../actions/app';

// const mapStateToProps = state => {
//   return {};
// };

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ removeCallEventAttendee, setAlert }, dispatch);
}

export default connect(null, mapDispatchToProps)(Attending);
