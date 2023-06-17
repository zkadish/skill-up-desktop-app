import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Elements from './Elements';

import {
  setFrameworkElement,
  setActiveFrameworkElement,
  setFrameworkElementName,
  removeFrameworkElement,
  setFrameworkElements,
  setFrameworkElementType,
} from '../../../../../actions/app';
import { setAlert, setAlertDialog } from '../../../../../actions/notifications';

const mapStateToProps = (state) => {
  return {
    activeFrameworkBlock: state.app.activeFrameworkBlock,
    activeFrameworkElement: state.app.activeFrameworkElement
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setFrameworkElement,
      setActiveFrameworkElement,
      setFrameworkElementName,
      removeFrameworkElement,
      setFrameworkElements,
      setFrameworkElementType,
      setAlert,
      setAlertDialog,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Elements);
