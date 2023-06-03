import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import BattleCards from './BattleCards';

import {
  setLibraryBattleCard,
  addLibraryBattleCard,
  // setBattleCard,
  // setBattleCardName,
  setActiveBattleCard,
  setLibraryBattleCards,
  // setActiveElement,
  // setLibraryActiveBattleCard,
  setElements,
  // setElement,
  // removeElement,
  removeBattleCard,
  setLibraryBattleCardName,
  // setElementName,
  // setElementType
  setActiveBlock,
} from '../../../actions/builder';
import { setAlert, setAlertDialog } from '../../../actions/notifications';

const mapStateToProps = state => {
  return {
    activeTemplate: state.builder.activeTemplate,
    activeBlock: state.builder.activeBlock,
    // activeElement: state.builder.activeElement,
    activeBattleCard: state.builder.activeBattleCard,
    // activeLibraryBattleCard: state.builder.activeLibraryBattleCard,
    battleCards: state.builder.battleCards,
    // elements: state.builder.elements,
    talkTracks: state.builder.talkTracks,
    // companyResearch: state.builder.companyResearch,
    // contactResearch: state.builder.contactResearch
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      // setBattleCard,
      setLibraryBattleCard,
      addLibraryBattleCard,
      // setBattleCardName,
      setActiveBattleCard,
      setLibraryBattleCards,
      // setActiveElement,
      // setLibraryActiveBattleCard,
      setElements,
      // setElement,
      // removeElement,
      removeBattleCard,
      setLibraryBattleCardName,
      // setElementName,
      // setElementType,
      setAlert,
      setAlertDialog,
      setActiveBlock,
    },
    dispatch,
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(BattleCards));
