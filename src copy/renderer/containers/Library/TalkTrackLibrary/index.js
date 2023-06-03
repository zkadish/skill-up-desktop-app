import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import TalkTrackLibrary from './TalkTrackLibrary';

import {
  setLibraryTalkTrack,
  addLibraryTalkTrack,
  setActiveLibraryTalkTrack,
  setLibraryTalkTracks,
  removeLibraryTalkTrack,
  setFilteredLibraryTalkTracks,
  setLibraryTalkTrackName,
} from '../../../actions/builder';
import { setAlert, setAlertDialog } from '../../../actions/notifications';

const mapStateToProps = state => {
  return {
    activeLibraryBattleCard: state.builder.activeLibraryBattleCard,
    activeLibraryTalkTrack: state.builder.activeLibraryTalkTrack,
    talkTracks: state.builder.talkTracks,
    filteredTalkTracks: state.builder.filteredTalkTracks,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setLibraryTalkTrack,
      addLibraryTalkTrack,
      setActiveLibraryTalkTrack,
      setLibraryTalkTracks,
      removeLibraryTalkTrack,
      setFilteredLibraryTalkTracks,
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
