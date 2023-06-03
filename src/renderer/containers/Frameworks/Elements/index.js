import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import Elements from './Elements';

import {
  setActiveElement,
  setElements,
  setElement,
  removeElement,
  setElementName,
  setElementType,
} from '../../../actions/builder';
import { setAlert, setAlertDialog } from '../../../actions/notifications';

const mapStateToProps = (state) => {
  return {
    activeTemplate: state.builder.activeTemplate,
    activeBlock: state.builder.activeBlock,
    activeElement: state.builder.activeElement,
    elements: state.builder.elements,
    companyResearch: state.builder.companyResearch,
    contactResearch: state.builder.contactResearch,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setActiveElement,
      setElements,
      setElement,
      removeElement,
      setElementName,
      setElementType,
      setAlert,
      setAlertDialog,
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Elements));
