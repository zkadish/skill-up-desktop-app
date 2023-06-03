// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Timing from './Timing';

// import { setTimeRangeValues } from '../../../actions/builder';

const mapStateToProps = state => {
  return {
    timeRangeValues: state.builder.timeRangeValues
  };
};

// const mapDispatchToProps = dispatch => {
//   return bindActionCreators({ setTimeRangeValues }, dispatch);
// };

export default connect(mapStateToProps)(Timing);
