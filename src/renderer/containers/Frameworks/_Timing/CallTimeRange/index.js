import { connect } from 'react-redux';
import CallTimeRange from './CallTimeRange';

const mapStateToProps = state => {
  return {
    timeRangeValues: state.builder.timeRangeValues
  };
};

export default connect(mapStateToProps)(CallTimeRange);
