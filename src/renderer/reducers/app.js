import * as actionTypes from '../actions/actionTypes';
import { domainHistory } from '../mockData/domainHistory';

const modalChildren = document.createElement('div');
modalChildren.innerHTML = 'modal';

const initialState = {
  pastEvents: null,
  daysEvents: [],
  googleCalEvents: null,
  activeCall: null,
  domainHistory,
  mainNavTabIndex: 0, // TODO: is this being used?
  activeCallTemplate: '',
  activeFrameworkBlock: null,
  activeFrameworkElement: null,
  activeFrameworkBattleCard: null,
  activeFrameworkBattleCardTalkTrack: null,
  callEventModal: {
    open: false,
    onClose: () => {},
    template: null,
  },
  callEventInitState: null,
};

// const findActiveCall = (daysEvents, activeCall) => {
//   let event;
//   for (let i = 0; i < daysEvents.length; i += 1) {
//     event = daysEvents[i].events.find((e) => e.id === activeCall.id);
//     if (event) break;
//   }
//   return event;
// };

export default function app(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_PAST_EVENTS: {
      return {
        ...state,
        pastEvents: action.events,
      };
    }
    case actionTypes.SET_DAYS_EVENTS: {
      return {
        ...state,
        daysEvents: action.daysEvents,
      };
    }
    case actionTypes.SET_GOOGLE_CAL_EVENTS: {
      return {
        ...state,
        googleCalEvents: action.events,
      };
    }
    case actionTypes.SET_ACTIVE_CALL:
      return {
        ...state,
        activeCall: action.activeCall,
      };
    case actionTypes.SET_CALL_EVENT_MODAL: {
      return {
        ...state,
        callEventModal: { ...state.callEventModal, ...action.callEventModal },
      };
    }
    case actionTypes.CANCEL_CALL_EVENT_MODAL: {
      const { daysEvents, activeCall, callEventInitState } = state;

      let event;
      for (let i = 0; i < daysEvents.length; i += 1) {
        event = daysEvents[i].events.find((e) => e.id === activeCall.id);
        if (event) break;
      }

      event.frameworkTemplate = callEventInitState;
      activeCall.frameworkTemplate = callEventInitState;

      return {
        ...state,
        daysEvents: [...daysEvents],
        activeCall: { ...activeCall },
      };
    }
    case actionTypes.SET_CALL_EVENT_INIT_STATE: {
      return {
        ...state,
        callEventInitState: action.callEventInitState,
      };
    }
    case actionTypes.SET_FRAMEWORK_TEMPLATE: {
      const { daysEvents, activeCall } = state;
      for (let i = 0; i < daysEvents.length; i += 1) {
        const index = daysEvents[i].events.findIndex(
          (e) => e.id === action.framework.id
        );
        if (index >= 0) daysEvents[i].events.splice(index, 1, action.framework);
      }

      return {
        ...state,
        daysEvents: [...daysEvents],
        activeCall: { ...action.framework },
      };
    }
    // FRAMEWORK BLOCKS
    case actionTypes.SET_FRAMEWORK_BLOCK: {
      const { callEventModal } = state;
      callEventModal.template.blocks.unshift(action.block);

      return {
        ...state,
        callEventModal: { ...callEventModal },
      };
    }
    case actionTypes.SET_FRAMEWORK_BLOCKS: {
      const { callEventModal } = state;

      callEventModal.template.blocks = [...action.blocks];

      return {
        ...state,
        callEventModal: { ...callEventModal },
      };
    }
    case actionTypes.SET_ACTIVE_FRAMEWORK_BLOCK: {
      return {
        ...state,
        activeFrameworkBlock: action.block,
      };
    }
    case actionTypes.REMOVE_FRAMEWORK_BLOCK: {
      const { callEventModal } = state;

      const index = callEventModal.template.blocks?.findIndex(
        (b) => b.id === action.block.id
      );

      callEventModal.template.blocks.splice(index, 1);

      if (state.activeFrameworkBlock?.id === action.block.id) {
        return {
          ...state,
          callEventModal: { ...callEventModal },
          activeFrameworkBlock: null,
          activeFrameworkElement: null,
        };
      }

      return {
        ...state,
        callEventModal: { ...callEventModal },
      };
    }
    case actionTypes.SET_FRAMEWORK_BLOCK_NAME: {
      const { callEventModal } = state;

      const block = callEventModal.template.blocks.find(
        (b) => b.id === action.block.id
      );
      block.label = action.block.label;

      return {
        ...state,
        callEventModal,
      };
    }
    case actionTypes.SET_FRAMEWORK_BLOCK_TYPE: {
      const { callEventModal, activeFrameworkBlock } = state;

      const block = callEventModal.template.blocks.find(
        (b) => b.id === activeFrameworkBlock.id
      );

      block.type = action.block.type;

      return {
        ...state,
        callEventModal: { ...callEventModal },
      };
    }
    // FRAMEWORK ELEMENTS
    case actionTypes.SET_FRAMEWORK_ELEMENT: {
      const { callEventModal, activeFrameworkBlock } = state;

      const activeBlock = callEventModal.template.blocks.find(
        (b) => b.id === activeFrameworkBlock.id
      );
      activeBlock.elements = [action.element, ...activeBlock.elements];

      return {
        ...state,
        callEventModal: { ...callEventModal },
      };
    }
    case actionTypes.SET_FRAMEWORK_ELEMENTS: {
      const { callEventModal, activeFrameworkBlock } = state;
      const activeBlock = callEventModal.template.blocks.find(
        (b) => b.id === activeFrameworkBlock.id
      );
      activeBlock.elements = [...action.elements];

      return {
        ...state,
        callEventModal: { ...callEventModal },
      };
    }
    case actionTypes.SET_ACTIVE_FRAMEWORK_ELEMENT: {
      const { callEventModal, activeFrameworkBlock } = state;
      const activeBlock = callEventModal.template.blocks.find(
        (b) => b.id === activeFrameworkBlock.id
      );
      activeBlock.elements = activeBlock.elements.map((e) => {
        const ele = { ...e };
        if (e.id === action.element.id) {
          ele.active = true;
          return ele;
        }
        ele.active = false;
        return ele;
      });

      return {
        ...state,
        callEventModal,
        activeFrameworkElement: action.element,
      };
    }
    case actionTypes.SET_FRAMEWORK_ELEMENT_NAME: {
      const { callEventModal, activeFrameworkBlock } = state;

      const activeBlock = callEventModal.template.blocks.find(
        (b) => b.id === activeFrameworkBlock.id
      );
      const activeElement = activeBlock.elements.find(
        (e) => e.id === action.element.id
      );

      activeElement.label = action.element.label;
      if (activeElement.type === 'talk-tracks') {
        activeElement.value = action.element.label;
      }

      return {
        ...state,
        callEventModal: { ...callEventModal },
      };
    }
    case actionTypes.REMOVE_FRAMEWORK_ELEMENT: {
      const { callEventModal, activeFrameworkBlock } = state;
      const activeBlock = callEventModal.template.blocks.find(
        (b) => b.id === activeFrameworkBlock.id
      );

      const activeBlockElements = activeBlock.elements.filter(
        (e) => e.id !== action.element.id
      );
      activeBlock.elements = activeBlockElements;

      if (state.activeFrameworkElement?.id === action.element.id) {
        return {
          ...state,
          callEventModal: { ...callEventModal },
          activeFrameworkElement: null,
        };
      }

      return {
        ...state,
        callEventModal: { ...callEventModal },
      };
    }
    case actionTypes.SET_FRAMEWORK_ELEMENT_TYPE: {
      const { callEventModal, activeFrameworkBlock, activeFrameworkElement } =
        state;
      const activeBlock = callEventModal.template.blocks.find(
        (b) => b.id === activeFrameworkBlock.id
      );
      const activeElement = activeBlock.elements.find(
        (e) => e.id === activeFrameworkElement.id
      );

      activeElement.type = action.element.type;
      if (action.element.type === 'talk track') {
        activeElement.value = action.element.label;
      }

      return {
        ...state,
        callEventModal: { ...callEventModal },
        activeFrameworkElement: activeElement,
      };
    }
    // FRAMEWORK BATTLE CARDS
    case actionTypes.SET_FRAMEWORK_BATTLE_CARD: {
      const { callEventModal, activeFrameworkBlock, activeFrameworkElement } =
        state;
      const activeBlock = callEventModal.template.blocks.find(
        (b) => b.id === activeFrameworkBlock.id
      );
      activeBlock.elements = [action.battleCard, ...activeBlock.elements];

      return {
        ...state,
        callEventModal: { ...callEventModal },
      };
    }
    case actionTypes.SET_FRAMEWORK_BATTLE_CARD_NAME: {
      const {
        callEventModal,
        activeFrameworkBlock,
        activeFrameworkBattleCard,
      } = state;
      const activeBlock = callEventModal.template.blocks.find(
        (b) => b.id === activeFrameworkBlock.id
      );
      const activeBattleCard = activeBlock.elements.find(
        (e) => e.id === action.battleCard.id
      );

      activeBattleCard.label = action.battleCard.label;

      return {
        ...state,
        callEventModal: { ...callEventModal },
      };
    }
    case actionTypes.SET_ACTIVE_FRAMEWORK_BATTLE_CARD: {
      const { callEventModal, activeFrameworkBlock } = state;
      const activeBlock = callEventModal.template.blocks.find(
        (b) => b.id === activeFrameworkBlock.id
      );

      activeBlock.elements = activeBlock.elements.map((e) => {
        const ele = { ...e };
        if (ele.id === action.battleCard.id) {
          ele.active = true;
          return ele;
        }
        ele.active = false;
        return ele;
      });

      return {
        ...state,
        callEventModal: { ...callEventModal },
        activeFrameworkBattleCard: action.battleCard,
      };
    }
    case actionTypes.REMOVE_FRAMEWORK_BATTLE_CARD: {
      const {
        callEventModal,
        activeFrameworkBlock,
        activeFrameworkBattleCard,
      } = state;
      const activeBlock = callEventModal.template.blocks.find(
        (b) => b.id === activeFrameworkBlock.id
      );
      activeBlock.elements = activeBlock.elements.filter(
        (e) => e.id !== action.battleCard.id
      );

      if (state.activeFrameworkBattleCard?.id === action.battleCard.id) {
        return {
          ...state,
          callEventModal: { ...callEventModal },
          activeFrameworkBattleCard: null,
        };
      }

      return {
        ...state,
        callEventModal: { ...callEventModal },
      };
    }
    // FRAMEWORK BATTLE CARD TALK TRACKS
    case actionTypes.SET_FRAMEWORK_BATTLE_CARD_TALK_TRACKS: {
      const {
        callEventModal,
        activeFrameworkBlock,
        activeFrameworkBattleCard,
      } = state;
      const activeBlock = callEventModal.template.blocks.find(
        (b) => b.id === activeFrameworkBlock.id
      );
      const activeBattleCard = activeBlock.elements.find(
        (e) => e.id === activeFrameworkBattleCard.id
      );

      activeBattleCard['talk-tracks'] = [...action.talkTracks];

      return {
        ...state,
        callEventModal: { ...callEventModal },
        activeFrameworkBattleCard: activeBattleCard,
      };
    }
    case actionTypes.SET_FRAMEWORK_BATTLE_CARD_TALK_TRACK: {
      const {
        callEventModal,
        activeFrameworkBlock,
        activeFrameworkBattleCard,
      } = state;
      const activeBlock = callEventModal.template.blocks.find(
        (b) => b.id === activeFrameworkBlock.id
      );
      const activeBattleCard = activeBlock.elements.find(
        (e) => e.id === activeFrameworkBattleCard.id
      );

      activeBattleCard['talk-tracks'] = [
        action.talkTrack,
        ...activeBattleCard['talk-tracks'],
      ];

      return {
        ...state,
        callEventModal: { ...callEventModal },
        activeFrameworkBattleCard: activeBattleCard,
      };
    }
    case actionTypes.SET_ACTIVE_FRAMEWORK_BATTLE_CARD_TALK_TRACK: {
      const {
        callEventModal,
        activeFrameworkBlock,
        activeFrameworkBattleCard,
      } = state;
      const activeBlock = callEventModal.template.blocks.find(
        (b) => b.id === activeFrameworkBlock.id
      );
      const activeBattleCard = activeBlock.elements.find(
        (e) => e.id === activeFrameworkBattleCard.id
      );

      activeBattleCard['talk-tracks'] = activeBattleCard['talk-tracks'].map(
        (t) => {
          const talkTrack = { ...t };
          if (talkTrack.id === action.talkTrack.id) {
            talkTrack.active = true;
            return talkTrack;
          }
          talkTrack.active = false;
          return talkTrack;
        }
      );

      return {
        ...state,
        callEventModal: { ...callEventModal },
        activeFrameworkBattleCardTalkTrack: action.talkTrack,
      };
    }
    case actionTypes.SET_FRAMEWORK_BATTLE_CARD_TALK_TRACK_NAME: {
      const {
        callEventModal,
        activeFrameworkBlock,
        activeFrameworkBattleCard,
      } = state;
      const activeBlock = callEventModal.template.blocks.find(
        (b) => b.id === activeFrameworkBlock.id
      );
      const activeBattleCard = activeBlock.elements.find(
        (e) => e.id === activeFrameworkBattleCard.id
      );

      const activeTalkTrack = activeBattleCard['talk-tracks'].find(
        (t) => t.id === action.talkTrack.id
      );
      activeTalkTrack.label = action.talkTrack.label;
      activeTalkTrack.value = action.talkTrack.value;

      return {
        ...state,
        callEventModal: { ...callEventModal },
        activeFrameworkBattleCardTalkTrack: action.talkTrack,
      };
    }
    case actionTypes.REMOVE_FRAMEWORK_BATTLE_CARD_TALK_TRACK: {
      const {
        callEventModal,
        activeFrameworkBlock,
        activeFrameworkBattleCard,
      } = state;
      const activeBlock = callEventModal.template.blocks.find(
        (b) => b.id === activeFrameworkBlock.id
      );
      const activeBattleCard = activeBlock.elements.find(
        (e) => e.id === activeFrameworkBattleCard.id
      );

      activeBattleCard['talk-tracks'] = activeBattleCard['talk-tracks'].filter(
        (t) => t.id !== action.talkTrack.id
      );

      return {
        ...state,
        callEventModal: { ...callEventModal },
        activeFrameworkBattleCard: { ...activeBattleCard },
      };
    }
    // ACTIVE EVENT
    case actionTypes.UPDATE_CALL_EVENT_ELEMENT: {
      return {
        ...state,
        daysEvents: action.daysEvents,
        activeCall: action.activeCall,
      };
    }
    case actionTypes.UPDATE_CALL_EVENT_ACTION: {
      return {
        ...state,
        daysEvents: action.daysEvents,
        activeCall: action.activeCall,
      };
    }
    case actionTypes.SET_CALL_EVENT_NOTE: {
      return {
        ...state,
        daysEvents: action.daysEvents,
        activeCall: action.activeCall,
      };
    }
    case actionTypes.UPDATE_CALL_EVENT_NOTE: {
      return {
        ...state,
        daysEvents: action.daysEvents,
        activeCall: action.activeCall,
      };
    }
    case actionTypes.REMOVE_CALL_EVENT_ATTENDEE: {
      return {
        ...state,
        daysEvents: action.daysEvents,
        activeCall: action.activeCall,
      };
    }
    default:
      return state;
  }
}
