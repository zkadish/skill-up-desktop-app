import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// import { setBuilderTabIndex } from '../../actions/nav';
import {
  setTemplates,
  setActiveTemplate,
  setBlocks,
  setElements,
} from '../../actions/builder';
// import getFrameworks from './actionCreators/frameWorks';

import Frameworks from './Frameworks';

const mapStateToProps = (state) => {
  return {
    activeTemplate: state.builder.activeTemplate,
    templates: state.builder.templates,
    activeBlock: state.builder.activeBlock,
    builderTabIndex: state.nav.builderTabIndex,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      // setBuilderTabIndex,
      // getFrameworks,
      setTemplates,
      setActiveTemplate,
      setBlocks,
      setElements,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Frameworks));
