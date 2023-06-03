import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import TalkTrackLibrary from './TalkTrackLibrary';

import {
  setLibraryTalkTrack,
  addLibraryTalkTrack,
  setActiveLibraryTalkTrack,
  setLibraryTalkTracks,
  // alphabetizeLibraryTalkTracks,
  removeLibraryTalkTrack,
  removeBattleCardTalkTrack,
  setFilteredLibraryTalkTracks,
  setElements,
  setLibraryTalkTrackName,
} from '../../../actions/builder';
import { setAlert, setAlertDialog } from '../../../actions/notifications';

const mapStateToProps = state => {
  return {
    activeLibraryTalkTrack: state.builder.activeLibraryTalkTrack,
    activeTemplate: state.builder.activeTemplate,
    activeBlock: state.builder.activeBlock,
    activeBattleCard: state.builder.activeBattleCard,
    battleCards: state.builder.battleCards,
    filteredTalkTracks: state.builder.filteredTalkTracks,
    talkTracks: state.builder.talkTracks,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setLibraryTalkTrack,
      addLibraryTalkTrack,
      setActiveLibraryTalkTrack,
      setLibraryTalkTracks,
      // alphabetizeLibraryTalkTracks,
      removeLibraryTalkTrack,
      removeBattleCardTalkTrack,
      setFilteredLibraryTalkTracks,
      setElements,
      setLibraryTalkTrackName,
      setAlert,
      setAlertDialog,
    },
    dispatch,
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(TalkTrackLibrary));
