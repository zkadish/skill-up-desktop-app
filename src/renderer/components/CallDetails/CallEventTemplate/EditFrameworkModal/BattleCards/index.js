import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BattleCards from './BattleCards';

import {
  setFrameworkBattleCardName,
  removeFrameworkBattleCard,
  setFrameworkElements,
  setFrameworkBattleCard,
  setActiveFrameworkBattleCard,
} from '../../../../../actions/app';
import { setAlert, setAlertDialog } from '../../../../../actions/notifications';

const mapStateToProps = (state) => {
  return {
    activeFrameworkBlock: state.app.activeFrameworkBlock,
    activeFrameworkBattleCard: state.app.activeFrameworkBattleCard,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setFrameworkBattleCardName,
      removeFrameworkBattleCard,
      setFrameworkElements,
      setFrameworkBattleCard,
      setActiveFrameworkBattleCard,
      setAlert,
      setAlertDialog,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(BattleCards);
