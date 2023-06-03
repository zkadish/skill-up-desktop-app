import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TemplatesLibrary from './TemplatesLibrary';

import {
  setTemplates,
  setTemplate,
  removeTemplate,
  setActiveTemplate,
  setTemplateName
} from '../../../actions/builder';
import { setAlert, setAlertDialog } from '../../../actions/notifications';

const mapStateToProps = state => {
  return {
    activeTemplate: state.builder.activeTemplate,
    templates: state.builder.templates
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setTemplates,
      setTemplate,
      removeTemplate,
      setActiveTemplate,
      setTemplateName,
      setAlert,
      setAlertDialog
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(TemplatesLibrary);
