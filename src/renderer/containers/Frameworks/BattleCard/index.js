import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import BattleCard from './BattleCard';

import {
  setBattleCardTalkTracks,
  setBattleCardTalkTrack,
  removeBattleCardTalkTrack,
  setActiveBattleCardTalkTrack,
  setBattleCardTalkTrackName,
  // alphabetizeLibraryTalkTracks,
  setLibraryTalkTrackName,
  setLibraryTalkTrack,
  addLibraryTalkTrack,
} from '../../../actions/builder';
import { setAlert, setAlertDialog } from '../../../actions/notifications';

const mapStateToProps = state => {
  return {
    activeTemplate: state.builder.activeTemplate,
    activeElement: state.builder.activeElement,
    activeLibraryTalkTrack: state.builder.activeLibraryTalkTrack,
    activeBattleCard: state.builder.activeBattleCard,
    activeBattleCardTalkTrack: state.builder.activeBattleCardTalkTrack,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setBattleCardTalkTracks,
      setBattleCardTalkTrack,
      removeBattleCardTalkTrack,
      setActiveBattleCardTalkTrack,
      setBattleCardTalkTrackName,
      // alphabetizeLibraryTalkTracks,
      setLibraryTalkTrackName,
      setLibraryTalkTrack,
      addLibraryTalkTrack,
      setAlert,
      setAlertDialog,
    },
    dispatch,
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(BattleCard));
