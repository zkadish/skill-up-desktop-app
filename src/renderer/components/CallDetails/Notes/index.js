import { connect } from 'react-redux';
import Notes from './Notes';

const mapStateToProps = state => {
  return {
    activeCall: state.app.activeCall
  };
};

export default connect(mapStateToProps)(Notes);
