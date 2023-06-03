import * as actionTypes from './actionTypes';
import { updateTemplateOrder } from '../api/services/templateOrder';
import { setCallEventTemplate } from '../api/services/events';
import { uuid } from '../utils/data';
import { serialize } from '../utils/template';

import {
  createTemplate,
  updateTemplate,
  deleteTemplate,
} from '../api/services/templates';
import {
  createBlock,
  updateBlock,
  updateBlockOrder,
  deleteBlock,
} from '../api/services/blocks';
import {
  createElement,
  updateElement,
  updateElementOrder,
  deleteElement,
} from '../api/services/elements';
import {
  createBattleCard,
  updateBattleCard,
  updateBattleCardTalkTrackOrder,
  addBattleCard,
  deleteBattleCard,
  deleteLibraryBattleCard,
} from '../api/services/battleCards';

import {
  addTalkTrack,
  updateTalkTrack,
  createTalkTrack,
  deleteTalkTrack,
  deleteLibraryTalkTrack,
} from '../api/services/talkTracks';

const newTemplateBlocks = [
  {
    id: '',
    container_id: '',
    corporate_id: '',
    account_id: '',
    elements: [],
    label: 'PRE CALL ACTIONS',
    type: 'pre-call',
    system: false,
    active: false,
  },
  {
    id: '',
    container_id: '',
    corporate_id: '',
    account_id: '',
    elements: [],
    label: 'ATTENDEES',
    type: 'attendees',
    system: false,
    active: false,
  },
  {
    id: '',
    container_id: '',
    corporate_id: '',
    account_id: '',
    elements: [],
    label: 'ACTIONS',
    type: 'actions',
    system: false,
    active: false,
  },
  {
    id: '',
    container_id: '',
    corporate_id: '',
    account_id: '',
    elements: [],
    label: 'NOTES',
    type: 'notes',
    system: false,
    active: false,
  },
  {
    id: '',
    container_id: '',
    corporate_id: '',
    account_id: '',
    elements: [],
    label: 'POST CALL ACTIONS',
    type: 'post-call',
    system: false,
    active: false,
  },
];

// Templates
export const setTemplates = (templates) => {
  return (dispatch, getState) => {
    const { auth } = getState();

    dispatch({
      type: actionTypes.SET_TEMPLATES,
      templates,
    });

    const templateIds = templates.map((t) => t.id);

    return updateTemplateOrder({ templateIds }, auth);
  };
};

export const setTemplate = (t) => {
  const template = { ...t };

  return (dispatch, getState) => {
    const { auth } = getState();

    // set default blocks
    const blocks = newTemplateBlocks.map((b) => {
      const block = { ...b };
      block.id = uuid();
      block.container_id = template.id;
      return block;
    });
    template.blocks = blocks;

    dispatch({
      type: actionTypes.SET_TEMPLATE,
      template,
    });

    return createTemplate(template, auth);
  };
};

export const removeTemplate = (t) => {
  const template = { ...t };
  return (dispatch, getState) => {
    const { auth } = getState();

    dispatch({
      type: actionTypes.REMOVE_TEMPLATE,
      template,
    });

    return deleteTemplate(template, auth);
  };
};

export const setActiveTemplate = (template) => {
  return {
    type: actionTypes.SET_ACTIVE_TEMPLATE,
    template,
  };
};

export const setTemplateName = (t) => {
  const template = { ...t };
  return (dispatch, getState) => {
    const { auth } = getState();

    dispatch({
      type: actionTypes.SET_TEMPLATE_NAME,
      template,
    });

    return updateTemplate(template, auth);
  };
};

export const addTemplateFrameworkLibrary = (frameworkTemplate) => {
  return (dispatch, getState) => {
    const state = getState();
    const { blocks, label } = frameworkTemplate;
    const { templates } = state.builder;

    const serialized = serialize(label, templates);

    // deep copy of blocks and swap out ids
    const blocksCopy = blocks?.map((b) => {
      const block = { ...b };
      block.id = uuid();
      block.elements = b.elements.map((e) => {
        const element = { ...e };
        element.id = uuid();
        if (element.type === 'battle-card') {
          element['talk-tracks'] = e['talk-tracks'].map((t) => {
            const talkTrack = { ...t };
            talkTrack.id = uuid();
            return talkTrack;
          });
          return element;
        }
        return element;
      });

      return block;
    });

    // create the template
    const newTemplate = {
      id: uuid(),
      label: serialized,
      active: false,
      blocks: blocksCopy,
    };

    dispatch({
      type: actionTypes.ADD_FRAMEWORK_TEMPLATE,
      newTemplate,
    });

    setCallEventTemplate(newTemplate, state.auth);
  };
};

// BLOCKS
export const setBlocks = (blocks) => {
  return (dispatch, getState) => {
    const { auth } = getState();

    dispatch({
      type: actionTypes.SET_BLOCKS,
      blocks,
    });

    const blockOrder = {};
    blockOrder.blockIds = blocks.map((b) => b.id);
    // every blocks container id should be the same
    blockOrder.containerId = blocks[0].container_id;

    return updateBlockOrder(blockOrder, auth);
  };
};

export const setBlock = (b) => {
  const block = { ...b };
  return (dispatch, getState) => {
    const { auth } = getState();

    dispatch({
      type: actionTypes.SET_BLOCK,
      block,
    });

    return createBlock(block, auth);
  };
};

export const removeBlock = (b) => {
  const block = { ...b };
  return (dispatch, getState) => {
    const { auth } = getState();

    dispatch({
      type: actionTypes.REMOVE_BLOCK,
      block,
    });

    return deleteBlock(block, auth);
  };
};

export const setActiveBlock = (block) => {
  return {
    type: actionTypes.SET_ACTIVE_BLOCK,
    block,
  };
};

export const setBlockName = (b) => {
  const block = { ...b };
  return (dispatch, getState) => {
    const { auth } = getState();

    dispatch({
      type: actionTypes.SET_BLOCK_NAME,
      block,
    });

    return updateBlock(block, auth);
  };
};

export const setBlockType = (b) => {
  const block = { ...b };

  return (dispatch, getState) => {
    const { auth } = getState();

    dispatch({
      type: actionTypes.SET_BLOCK_TYPE,
      block,
    });

    return updateBlock(block, auth);
  };
};

// ELEMENTS
export const setElements = (elements) => {
  return (dispatch, getState) => {
    const { auth } = getState();

    dispatch({
      type: actionTypes.SET_ELEMENTS,
      elements,
    });

    const elementOrder = {};
    elementOrder.elementIds = elements.map((b) => b.id);
    elementOrder.containerId = elements[0].container_id;

    return updateElementOrder(elementOrder, auth);
  };
};

export const setElement = (e) => {
  const element = { ...e };
  return (dispatch, getState) => {
    const { auth } = getState();

    dispatch({
      type: actionTypes.SET_ELEMENT,
      element,
    });

    return createElement(element, auth);
  };
};

export const removeElement = (e) => {
  const element = { ...e };
  return (dispatch, getState) => {
    const { auth } = getState();

    dispatch({
      type: actionTypes.REMOVE_ELEMENT,
      element,
    });

    return deleteElement(element, auth);
  };
};

export const setActiveElement = (element) => {
  return {
    type: actionTypes.SET_ACTIVE_ELEMENT,
    element,
  };
};

export const setElementName = (e) => {
  const element = { ...e };
  return (dispatch, getState) => {
    const { auth } = getState();

    dispatch({
      type: actionTypes.SET_ELEMENT_NAME,
      element,
    });

    return updateElement(element, auth);
  };
};

export const setElementType = (e) => {
  const element = { ...e };
  return (dispatch, getState) => {
    const { auth } = getState();

    dispatch({
      type: actionTypes.SET_ELEMENT_TYPE,
      element,
    });

    return updateElement(element, auth);
  };
};

// BATTLE CARDS
export const setActiveBattleCard = (battleCard) => {
  return {
    type: actionTypes.SET_ACTIVE_BATTLE_CARD,
    battleCard,
  };
};

export const removeBattleCard = (battleCard, activeBlock) => {
  return (dispatch, getState) => {
    const { auth } = getState();

    dispatch({
      type: actionTypes.REMOVE_BATTLE_CARD,
      battleCard,
    });

    return deleteBattleCard({ battleCard, activeBlock }, auth);
  };
};

// BATTLE CARD TALK TRACKS
export const setBattleCardTalkTracks = (talkTracks, activeBattleCard) => {
  return (dispatch, getState) => {
    const { auth } = getState();

    dispatch({
      type: actionTypes.SET_BATTLE_CARD_TALK_TRACKS,
      talkTracks,
    });

    updateBattleCardTalkTrackOrder({ talkTracks, activeBattleCard }, auth);
  };
};

export const setBattleCardTalkTrack = (talkTrack) => {
  return {
    type: actionTypes.SET_BATTLE_CARD_TALK_TRACK,
    talkTrack,
  };
};

export const setActiveBattleCardTalkTrack = (talkTrack) => {
  return {
    type: actionTypes.SET_ACTIVE_BATTLE_CARD_TALK_TRACK,
    talkTrack,
  };
};

export const setBattleCardTalkTrackName = (talkTrack) => {
  // ???
  return {
    type: actionTypes.SET_BATTLE_CARD_TALK_TRACK_NAME,
    talkTrack,
  };
};

export const removeBattleCardTalkTrack = (
  talkTrack = {},
  activeContainer = {}
) => {
  return (dispatch, getState) => {
    const { auth } = getState();

    dispatch({
      type: actionTypes.REMOVE_BATTLE_CARD_TALK_TRACK,
      talkTrack,
    });

    deleteTalkTrack({ talkTrack, activeContainer }, auth);
  };
};

// TALK TRACKS
export const setTalkTrack = (talkTrack) => {
  return {
    type: actionTypes.SET_TALK_TRACK,
    talkTrack,
  };
};

export const removeTalkTrack = (talkTrack) => {
  return {
    type: actionTypes.REMOVE_TALK_TRACK,
    talkTrack,
  };
};

// BATTLE CARD LIBRARY
export const setLibraryBattleCards = (battleCards) => {
  return {
    type: actionTypes.SET_LIBRARY_BATTLE_CARDS,
    battleCards,
  };
};

export const setLibraryBattleCard = (battleCard) => {
  return (dispatch, getState) => {
    const { auth } = getState();

    dispatch({
      type: actionTypes.SET_LIBRARY_BATTLE_CARD,
      battleCard,
    });

    return createBattleCard(battleCard, auth);
  };
};

export const setActiveLibraryBattleCard = (battleCard) => {
  return {
    type: actionTypes.SET_ACTIVE_LIBRARY_BATTLE_CARD,
    battleCard,
  };
};

export const setActiveLibraryBattleCardTackTrack = (talkTrack) => {
  debugger
  return {
    type: actionTypes.SET_ACTIVE_LIBRARY_BATTLE_CARD_TALK_TRACK,
    talkTrack,
  };
};

export const addLibraryBattleCard = (battleCard, activeBlock) => {
  return (dispatch, getState) => {
    const { auth } = getState();

    dispatch({
      type: actionTypes.ADD_LIBRARY_BATTLE_CARD,
      battleCard,
    });

    addBattleCard({ battleCard, activeBlock }, auth);
  };
};

export const setLibraryBattleCardName = (battleCard) => {
  return (dispatch, getState) => {
    const { auth } = getState();

    dispatch({
      type: actionTypes.SET_LIBRARY_BATTLE_CARD_NAME,
      battleCard,
    });

    updateBattleCard(battleCard, auth);
  };
};

export const removeLibraryBattleCard = (battleCard) => {
  return (dispatch, getState) => {
    const { auth } = getState();

    dispatch({
      type: actionTypes.REMOVE_LIBRARY_BATTLE_CARD,
      battleCard,
    });

    deleteLibraryBattleCard(battleCard, auth);
  };
};

export const setFilteredLibraryBattleCards = (battleCards) => {
  return {
    type: actionTypes.SET_FILTERED_LIBRARY_BATTLE_CARDS,
    battleCards,
  };
};

// TALK TRACKS LIBRARY
export const setLibraryTalkTracks = (talkTracks) => {
  return {
    type: actionTypes.SET_LIBRARY_TALK_TRACKS,
    talkTracks,
  };
};

// export const alphabetizeLibraryTalkTracks = talkTracks => {
//   return {
//     type: actionTypes.ALPHABETIZE_LIBRARY_TALK_TRACKS,
//     talkTracks,
//   };
// };

export const setFilteredLibraryTalkTracks = (talkTracks) => {
  return {
    type: actionTypes.SET_FILTERED_LIBRARY_TALK_TRACKS,
    talkTracks,
  };
};

export const setLibraryTalkTrack = (talkTrack) => {
  return (dispatch, getState) => {
    const { auth } = getState();

    dispatch({
      type: actionTypes.SET_LIBRARY_TALK_TRACK,
      talkTrack,
    });

    createTalkTrack(talkTrack, auth);
  };
};

export const addLibraryTalkTrack = (talkTrack, activeContainer) => {
  return (dispatch, getState) => {
    const { auth } = getState();

    dispatch({
      type: actionTypes.ADD_LIBRARY_TALK_TRACK,
      talkTrack,
    });

    addTalkTrack({ talkTrack, activeContainer }, auth);
  };
};

export const removeLibraryTalkTrack = (talkTrack) => {
  return (dispatch, getState) => {
    const { auth } = getState();

    dispatch({
      type: actionTypes.REMOVE_LIBRARY_TALK_TRACK,
      talkTrack,
    });

    deleteLibraryTalkTrack(talkTrack, auth);
  };
};

export const setLibraryTalkTrackName = (talkTrack) => {
  return (dispatch, getState) => {
    const { auth } = getState();

    dispatch({
      type: actionTypes.SET_LIBRARY_TALK_TRACK_NAME,
      talkTrack,
    });

    updateTalkTrack({ talkTrack }, auth);
  };
};

export const setActiveLibraryTalkTrack = (talkTrack) => {
  return {
    type: actionTypes.SET_ACTIVE_LIBRARY_TALK_TRACK,
    talkTrack,
  };
};
