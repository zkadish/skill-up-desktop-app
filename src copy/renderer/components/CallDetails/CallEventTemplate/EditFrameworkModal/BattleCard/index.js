import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import BattleCard from './BattleCard';

import {
  setFrameworkBattleCardTalkTracks,
  setFrameworkBattleCardTalkTrack,
  setActiveFrameworkBattleCardTalkTrack,
  setFrameworkBattleCardTalkTrackName,
  removeFrameworkBattleCardTalkTrack,
} from '../../../../../actions/app';
import { setAlert, setAlertDialog } from '../../../../../actions/notifications';

const mapStateToProps = state => {
  return {
    activeFrameworkBattleCard: state.app.activeFrameworkBattleCard,
    activeFrameworkBattleCardTalkTrack:
      state.app.activeFrameworkBattleCardTalkTrack
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setFrameworkBattleCardTalkTracks,
      setFrameworkBattleCardTalkTrack,
      setActiveFrameworkBattleCardTalkTrack,
      setFrameworkBattleCardTalkTrackName,
      removeFrameworkBattleCardTalkTrack,
      setAlert,
      setAlertDialog
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(BattleCard));
