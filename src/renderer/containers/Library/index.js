import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import { setBuilderTabIndex } from '../../actions/nav';
import {
  setLibraryTalkTracks,
  // setLibraryActiveTalkTrack,
  setTemplates,
  setActiveTemplate,
  setBlocks,
  setElements,
} from '../../actions/builder';
// import getFrameworks from './actionCreators/frameWorks';

import Library from './Library';

const mapStateToProps = (state) => {
  return {
    activeTemplate: state.builder.activeTemplate,
    templates: state.builder.templates,
    activeBlock: state.builder.activeBlock,
    builderTabIndex: state.nav.builderTabIndex,
    filteredTalkTracks: state.builder.filteredTalkTracks,
    activeLibraryTalkTrack: state.builder.activeLibraryTalkTrack,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      setLibraryTalkTracks,
      // setLibraryActiveTalkTrack,
      // setBuilderTabIndex,
      // getFrameworks,
      setTemplates,
      setActiveTemplate,
      setBlocks,
      setElements,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Library);
