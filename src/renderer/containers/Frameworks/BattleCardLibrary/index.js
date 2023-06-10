import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BattleCardLibrary from './BattleCardLibrary';

import {
  setLibraryBattleCard,
  addLibraryBattleCard,
  setActiveLibraryBattleCard,
  setLibraryBattleCards,
  removeLibraryBattleCard,
  removeBattleCard,
  setFilteredLibraryBattleCards,
  // setBattleCard,
  // setActiveBattleCard,
  // setActiveElement,
  setElements,
  // setElement,
  // removeElement,
  // removeBattleCard,
  setLibraryBattleCardName,
  // setElementName,
  // setElementType
} from '../../../actions/builder';
import { setAlert, setAlertDialog } from '../../../actions/notifications';

const mapStateToProps = (state) => {
  return {
    activeLibraryBattleCard: state.builder.activeLibraryBattleCard,
    activeTemplate: state.builder.activeTemplate,
    activeBlock: state.builder.activeBlock,
    // activeElement: state.builder.activeElement,
    activeBattleCard: state.builder.activeBattleCard,
    battleCards: state.builder.battleCards,
    filteredBattleCards: state.builder.filteredBattleCards,
    // elements: state.builder.elements,
    talkTracks: state.builder.talkTracks,
    // companyResearch: state.builder.companyResearch,
    // contactResearch: state.builder.contactResearch
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setLibraryBattleCard,
      setActiveLibraryBattleCard,
      setLibraryBattleCards,
      removeLibraryBattleCard,
      removeBattleCard,
      setFilteredLibraryBattleCards,
      addLibraryBattleCard,
      // setBattleCard,
      // setActiveBattleCard,
      // setActiveElement,
      setElements,
      // setElement,
      // removeElement,
      // removeBattleCard,
      setLibraryBattleCardName,
      // setElementName,
      // setElementType,
      setAlert,
      setAlertDialog,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(BattleCardLibrary);
