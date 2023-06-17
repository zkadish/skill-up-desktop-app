import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TalkTracks from './TalkTracks';

import {
  setActiveLibraryBattleCard,
  setActiveLibraryBattleCardTackTrack,
  setBattleCardTalkTracks,
  setLibraryTalkTrack,
  addLibraryTalkTrack,
  removeBattleCardTalkTrack,
  setLibraryTalkTrackName,
} from '../../../actions/builder';
import { setAlert, setAlertDialog } from '../../../actions/notifications';

const mapStateToProps = (state) => {
  return {
    activeLibraryBattleCard: state.builder.activeLibraryBattleCard,
    activeBattleCardTalkTrack: state.builder.activeBattleCardTalkTrack,
    activeTemplate: state.builder.activeTemplate,
    activeBlock: state.builder.activeBlock,
    activeElement: state.builder.activeElement,
    talkTracks: state.builder.talkTracks,
    companyResearch: state.builder.companyResearch,
    contactResearch: state.builder.contactResearch,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setActiveLibraryBattleCard,
      setActiveLibraryBattleCardTackTrack,
      setBattleCardTalkTracks,
      setLibraryTalkTrack,
      addLibraryTalkTrack,
      removeBattleCardTalkTrack,
      setLibraryTalkTrackName,
      setAlert,
      setAlertDialog,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(TalkTracks);
