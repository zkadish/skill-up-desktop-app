import * as actionTypes from '../actions/actionTypes';

const initialState = {
  callEvent: null,
  activeWinCallEvent: false
};

export default function winCallEvent(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_ACTIVE_WIN_CALL_EVENT:
      return {
        ...state,
        activeWinCallEvent: action.activeWinCallEvent
      };
    case actionTypes.SET_WIN_CALL_EVENT:
      return {
        ...state,
        callEvent: action.callEvent
      };
    case actionTypes.UPDATE_WIN_ELEMENT: {
      const callEvent = { ...state.callEvent };
      const { frameworkTemplate: { blocks } } = callEvent;

      const {
        element: { blockId, id, value }
      } = action;

      const block = blocks.find(b => b.id === blockId);

      const element = block.elements.find(e => e.id === id);
      element.value = value;

      return {
        ...state,
        callEvent: { ...callEvent }
      };
    }
    case actionTypes.REMOVE_CALL_EVENT_WINDOW_ATTENDEE: {
      const callEvent = { ...state.callEvent };
      const {
        frameworkTemplate: { blocks }
      } = callEvent;

      const { element: { blockId, attendee } } = action;

      const block = blocks.find(b => b.id === blockId);

      const index = block.elements.findIndex(a => a.email === attendee.email);
      block.elements.splice(index, 1);

      return {
        ...state,
        callEvent: { ...callEvent }
      };
    }
    default:
      return state;
  }
}
