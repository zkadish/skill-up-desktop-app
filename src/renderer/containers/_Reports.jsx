import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Reports from '../components/Reports';

function mapStateToProps(state) {
  return {
    currentPage: state.currentPage
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Reports);
