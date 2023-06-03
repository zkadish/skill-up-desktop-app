import * as actionTypes from './actionTypes';
import { createEvent, updateEvent } from '../api/services/events';
import { uuid } from '../utils/data';

// APP
export const setPastEvents = (events) => {
  return {
    type: actionTypes.SET_PAST_EVENTS,
    events,
  };
};

export const setDaysEvents = (daysEvents) => {
  return {
    type: actionTypes.SET_DAYS_EVENTS,
    daysEvents,
  };
};

export const setGoogleCalEvents = (events) => {
  return {
    type: actionTypes.SET_GOOGLE_CAL_EVENTS,
    events,
  };
};

export const setActiveCall = (activeCall) => {
  return {
    type: actionTypes.SET_ACTIVE_CALL,
    activeCall,
  };
};

export const setCallEventModal = (callEventModal) => {
  return {
    type: actionTypes.SET_CALL_EVENT_MODAL,
    callEventModal,
  };
};

export const cancelCallEventModal = () => {
  return {
    type: actionTypes.CANCEL_CALL_EVENT_MODAL,
  };
};

export const setCallEventInitState = (template) => {
  const callEventInitState = {};
  // deep copy of blocks
  const blocks = template.blocks?.map((b) => {
    const block = { ...b };
    block.elements = b.elements.map((e) => {
      const element = { ...e };
      if (element.type === 'battle-card') {
        element['talk-tracks'] = e['talk-tracks'].map((t) => {
          const talkTrack = { ...t };
          return talkTrack;
        });
        return element;
      }
      return element;
    });

    return block;
  });

  callEventInitState.id = template.id;
  callEventInitState.label = template.label;
  callEventInitState.locked = template.locked;
  callEventInitState.blocks = blocks;

  return {
    type: actionTypes.SET_CALL_EVENT_INIT_STATE,
    callEventInitState,
  };
};

/**
 *
 * @param {*} template
 * @param {*} event
 * @returns undefined
 */
export const addFrameworkTemplate = (template) => {
  // TODO: pass in event so it doesn't have to be found
  return (dispatch, store) => {
    const state = store();
    const {
      app: { daysEvents, activeCall },
    } = state;

    let event;
    for (let i = 0; i < daysEvents.length; i += 1) {
      event = daysEvents[i].events.find((e) => e.id === activeCall.id);
      if (event) break;
    }

    // break references so event.frameworkTemplate can be checked via activeCall
    event = { ...event };
    event.frameworkTemplate = { ...event.frameworkTemplate };

    // deep copy of blocks and swap out ids
    const blocks = template.blocks?.map((b) => {
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

    // populate attendees from the CallEvent to the framework
    const attendeesBlock = blocks?.find((b) => b.type === 'attendees');
    if (attendeesBlock) {
      attendeesBlock.elements = [...event.attendees];
    }

    // event.id = uuid(); // Event ids are matched with Google calendar event ids
    event.frameworkTemplate.id = uuid(); // this should be a new id...
    event.frameworkTemplate.label = template.label;
    event.frameworkTemplate.locked = template.locked;
    event.frameworkTemplate.blocks = blocks || null;

    dispatch({
      type: actionTypes.SET_FRAMEWORK_TEMPLATE,
      framework: event,
    });

    createEvent(state.auth.user, event);

    // updateEvent(state.auth.user, event);
  };
};

export const setFrameworkTemplate = (template) => {
  return (dispatch, store) => {
    const state = store();
    const {
      app: { daysEvents, activeCall },
    } = state;

    let event;
    for (let i = 0; i < daysEvents.length; i += 1) {
      event = daysEvents[i].events.find((e) => e.id === activeCall.id);
      if (event) break;
    }

    // break references so event.frameworkTemplate can be checked via activeCall
    event = { ...event };
    event.frameworkTemplate = { ...event.frameworkTemplate };

    // deep copy of blocks and swap out ids
    const blocks = template.blocks?.map((b) => {
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

    // populate attendees from the CallEvent to the framework
    const attendeesBlock = blocks?.find((b) => b.type === 'attendees');
    if (attendeesBlock) {
      attendeesBlock.elements = [...event.attendees];
    }

    event.frameworkTemplate.id = template.id; // Is a frameworkTemplate needed? Is the event template id enough?
    // event.frameworkTemplate.id = uuid(); // this should be a new id???
    event.frameworkTemplate.label = template.label;
    event.frameworkTemplate.locked = template.locked;
    event.frameworkTemplate.blocks = blocks || null;

    dispatch({
      type: actionTypes.SET_FRAMEWORK_TEMPLATE,
      framework: event,
    });

    updateEvent(state.auth.user, event);
  };
};

// framework template blocks
export const setFrameworkBlock = (block) => {
  return {
    type: actionTypes.SET_FRAMEWORK_BLOCK,
    block,
  };
};

// TODO: check if this is still getting used
export const setFrameworkBlocks = (blocks) => {
  return {
    type: actionTypes.SET_FRAMEWORK_BLOCKS,
    blocks,
  };
};

export const setActiveFrameworkBlock = (block) => {
  return {
    type: actionTypes.SET_ACTIVE_FRAMEWORK_BLOCK,
    block,
  };
};

export const removeFrameworkBlock = (block) => {
  return {
    type: actionTypes.REMOVE_FRAMEWORK_BLOCK,
    block,
  };
};

export const setFrameworkBlockName = (block) => {
  return {
    type: actionTypes.SET_FRAMEWORK_BLOCK_NAME,
    block,
  };
};

export const setFrameworkBlockType = (block) => {
  return {
    type: actionTypes.SET_FRAMEWORK_BLOCK_TYPE,
    block,
  };
};

// framework template elements
export const setFrameworkElement = (element) => {
  return {
    type: actionTypes.SET_FRAMEWORK_ELEMENT,
    element,
  };
};

export const setFrameworkElements = (elements) => {
  return {
    type: actionTypes.SET_FRAMEWORK_ELEMENTS,
    elements,
  };
};

export const setActiveFrameworkElement = (element) => {
  return {
    type: actionTypes.SET_ACTIVE_FRAMEWORK_ELEMENT,
    element,
  };
};

export const removeFrameworkElement = (element) => {
  return {
    type: actionTypes.REMOVE_FRAMEWORK_ELEMENT,
    element,
  };
};

export const setFrameworkElementName = (element) => {
  return {
    type: actionTypes.SET_FRAMEWORK_ELEMENT_NAME,
    element,
  };
};

export const setFrameworkElementType = (element) => {
  return {
    type: actionTypes.SET_FRAMEWORK_ELEMENT_TYPE,
    element,
  };
};

// framework template battle cards
export const setFrameworkBattleCard = (battleCard) => {
  return {
    type: actionTypes.SET_FRAMEWORK_BATTLE_CARD,
    battleCard,
  };
};

export const setFrameworkBattleCardName = (battleCard) => {
  return {
    type: actionTypes.SET_FRAMEWORK_BATTLE_CARD_NAME,
    battleCard,
  };
};

export const setActiveFrameworkBattleCard = (battleCard) => {
  return {
    type: actionTypes.SET_ACTIVE_FRAMEWORK_BATTLE_CARD,
    battleCard,
  };
};

export const removeFrameworkBattleCard = (battleCard) => {
  return {
    type: actionTypes.REMOVE_FRAMEWORK_BATTLE_CARD,
    battleCard,
  };
};

// framework template battle card talk tracks
export const setFrameworkBattleCardTalkTracks = (talkTracks) => {
  return {
    type: actionTypes.SET_FRAMEWORK_BATTLE_CARD_TALK_TRACKS,
    talkTracks,
  };
};

export const setFrameworkBattleCardTalkTrack = (talkTrack) => {
  return {
    type: actionTypes.SET_FRAMEWORK_BATTLE_CARD_TALK_TRACK,
    talkTrack,
  };
};

export const setActiveFrameworkBattleCardTalkTrack = (talkTrack) => {
  return {
    type: actionTypes.SET_ACTIVE_FRAMEWORK_BATTLE_CARD_TALK_TRACK,
    talkTrack,
  };
};

export const setFrameworkBattleCardTalkTrackName = (talkTrack) => {
  return {
    type: actionTypes.SET_FRAMEWORK_BATTLE_CARD_TALK_TRACK_NAME,
    talkTrack,
  };
};

export const removeFrameworkBattleCardTalkTrack = (talkTrack) => {
  return {
    type: actionTypes.REMOVE_FRAMEWORK_BATTLE_CARD_TALK_TRACK,
    talkTrack,
  };
};

// active event
export const removeCallEventAttendee = (action) => {
  return (dispatch, store) => {
    const state = store();

    const daysEvents = state.app.daysEvents.map((d) => {
      const day = { ...d };
      day.events = day.events.map((e) => {
        const event = { ...e };
        return event;
      });
      return day;
    });

    const { eventId, email } = action;

    let event;
    for (let i = 0; i < daysEvents.length; i += 1) {
      event = daysEvents[i].events.find((e) => e.id === eventId);
      if (event) break;
    }

    const block = event.frameworkTemplate.blocks.find(
      (b) => b.type === 'attendees'
    );
    // debugger
    const index = block.elements.findIndex((e) => e.email === email);

    event.attendees.splice(index, 1);
    block.elements.splice(index, 1);

    dispatch({
      type: actionTypes.REMOVE_CALL_EVENT_ATTENDEE,
      daysEvents: [...daysEvents],
      activeCall: { ...event },
    });

    updateEvent(state.auth.user, event);
  };
};

export const updateCallEventElement = (action) => {
  return (dispatch, store) => {
    const state = store();

    const daysEvents = [...state.app.daysEvents];
    const { eventId, blockId, elementId, value } = action;

    let event;
    for (let i = 0; i < daysEvents.length; i += 1) {
      event = daysEvents[i].events.find((e) => e.id === eventId);
      if (event) break;
    }

    const {
      frameworkTemplate: { blocks },
    } = event;

    const block = blocks.find((b) => b.id === blockId);

    const element = block.elements.find((ele) => ele.id === elementId);
    element.value = value;

    dispatch({
      type: actionTypes.UPDATE_CALL_EVENT_ELEMENT,
      daysEvents: [...daysEvents],
      activeCall: { ...event },
    });

    updateEvent(state.auth.user, event);
  };
};

export const updateCallEventAction = (action) => {
  return (dispatch, store) => {
    const state = store();

    const daysEvents = [...state.app.daysEvents];
    const { eventId, blockId, elementId, label, type } = action;

    let event;
    for (let i = 0; i < daysEvents.length; i += 1) {
      event = daysEvents[i].events.find((e) => e.id === eventId);
      if (event) break;
    }

    const block = event.frameworkTemplate.blocks.find((b) => b.id === blockId);

    block.elements.push({
      id: elementId,
      label,
      type,
      value: false,
      active: false,
    });

    dispatch({
      type: actionTypes.UPDATE_CALL_EVENT_ACTION,
      daysEvents: [...daysEvents],
      activeCall: { ...event },
    });

    updateEvent(state.auth.user, event);
  };
};

export const updateCallEventNote = (action) => {
  return (dispatch, store) => {
    const state = store();

    const daysEvents = [...state.app.daysEvents];
    const { eventId, blockId, elementId, label, value } = action;

    let event;
    for (let i = 0; i < daysEvents.length; i += 1) {
      event = daysEvents[i].events.find((e) => e.id === eventId);
      if (event) break;
    }

    const { blocks } = event.frameworkTemplate;
    const block = blocks.find((b) => b.id === blockId);

    const notesValue = block.elements[0].value;
    block.elements.push({
      id: elementId,
      label,
      type: 'note-entry',
      value,
    });

    if (!notesValue) {
      block.elements[0].value = `${value}`;
    } else {
      block.elements[0].value = `${notesValue}\n\n${value}`;
    }

    dispatch({
      type: actionTypes.UPDATE_CALL_EVENT_NOTE,
      daysEvents: [...daysEvents],
      activeCall: { ...event },
    });

    updateEvent(state.auth.user, event);
  };
};

export const setCallEventNote = (action) => {
  return (dispatch, store) => {
    const state = store();

    const daysEvents = [...state.app.daysEvents];
    const { eventId, blockId, value } = action;

    let event;
    for (let i = 0; i < daysEvents.length; i += 1) {
      event = daysEvents[i].events.find((e) => e.id === eventId);
      if (event) break;
    }

    const block = event.frameworkTemplate.blocks.find((b) => b.id === blockId);

    block.elements[0].value = value.trim();

    dispatch({
      type: actionTypes.SET_CALL_EVENT_NOTE,
      daysEvents: [...daysEvents],
      activeCall: { ...event },
    });

    updateEvent(state.auth.user, event);
  };
};
