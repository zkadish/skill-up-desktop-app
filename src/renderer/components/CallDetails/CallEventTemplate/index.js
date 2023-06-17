import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CallEventTemplate from './CallEventTemplate';

import {
  addFrameworkTemplate,
  setFrameworkTemplate,
  updateCallEventElement,
  removeCallEventAttendee,
  setCallEventNote,
  setCallEventModal,
} from '../../../actions/app';
import { addTemplateFrameworkLibrary } from '../../../actions/builder';
import { setAlert, setAlertDialog } from '../../../actions/notifications';

const mapStateToProps = (state) => {
  return {
    activeCall: state.app.activeCall,
    activeWinCallEvent: state.winCallEvent.activeWinCallEvent,
    templates: state.builder.templates,
    blocks: state.builder.blocks,
    elements: state.builder.elements,
    battleCards: state.builder.battleCards,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      removeCallEventAttendee,
      addFrameworkTemplate,
      addTemplateFrameworkLibrary,
      setFrameworkTemplate,
      setAlert,
      setAlertDialog,
      setCallEventModal,
      setCallEventNote,
      updateCallEventElement,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CallEventTemplate);
