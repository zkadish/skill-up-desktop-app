import { isSameDate, getMeridianTime, getTodayOffSet } from '../../utils/time';
import getGoogleCalEvents from '../services/googleIntegration';
import mockGoogleCalEvents from '../../mockData/googleCalEvents.json';

/**
 *
 * @param {*} daysDates
 * @param {*} pastEvents
 * @returns
 */

const createCallEvents = (daysDates, pastEvents, googleEvents) => {
  return new Promise((resolve) => {
    const googleCalEvents = [...googleEvents];
    // TODO: add some mock notification data, or better yet when events are imported create notifications
    const callEvents = googleCalEvents.map((event) => {
      // TODO: check main attendee's email against import crmData and cues data base
      // add domain id to events
      // TODO: show notification for events with no attendees and gracefully throw error.
      const eventDomain =
        event?.attendees[0].email.split('@')[1].split('.')[0] || null;
      event.domain_id = eventDomain; // eslint-disable-line

      // add meeting times
      event.start.time = getMeridianTime(event.start.dateTime);
      event.end.time = getMeridianTime(event.end.dateTime);

      // convert date to date object
      event.start.dateTime = new Date(event.start.dateTime);
      event.end.dateTime = new Date(event.end.dateTime);

      event.frameworkTemplate = { // eslint-disable-line
        id: null,
        label: null,
        locked: false,
        blocks: null,
        elements: null,
      };

      return event;
    });
    // the following are in the Call Event Settings options
    // How many days of history, from today, should be shown?
    // How many days in the future, including today, should be shown?
    // TODO: take the pastEvents array and the callEvents array and combine
    // them, taking the events which have the same id and updating the
    // the pastEvent with potentially new data... then add events to the
    // day they are associated to.

    // Combine past and new calendar events
    const combinedEvents = callEvents.reduce((state, callEvent) => {
      const foundIndex = pastEvents.findIndex((pastEvent) => {
        return pastEvent.id === callEvent.id;
      });
      if (foundIndex > -1) {
        delete callEvent.frameworkTemplate;
        const event = { ...pastEvents[foundIndex], ...callEvent };
        pastEvents.splice(foundIndex, 1);
        return [...state, event];
      }
      return [...state, callEvent];
    }, []);

    //  add remaining past events into the combined event array
    const allEvents = [...pastEvents, ...combinedEvents];

    // add events to their respective day
    const daysEvents = daysDates.map((d) => {
      const day = { ...d };
      const [i] = Object.keys(day);
      day.events = allEvents.filter((e) =>
        isSameDate(e.start.dateTime, day[i])
      );
      return day;
    });

    return resolve(daysEvents);
  });
};

const asyncGetGoogleCalEvents = async (userSettings, today, endDate) => {
  try {
    // mocked google calendar integration
    // const data = await new Promise((resolve) => {
    //   return resolve(mockGoogleCalEvents);
    // });
    const calEvents = await getGoogleCalEvents(userSettings, today, endDate);

    const mockedGoogEvents = mockGoogleCalEvents.googleCalEvents.map((e) => {
      const event = { ...e };
      event.start = { ...event.start };
      event.end = { ...event.end };
      const start = getTodayOffSet(event.start.dateTime);
      const end = getTodayOffSet(event.end.dateTime);
      event.start.dateTime = start.date;
      event.end.dateTime = end.date;

      return event;
    });

    calEvents.data.googleCalEvents = [
      ...calEvents.data.googleCalEvents,
      ...mockedGoogEvents,
    ];

    return calEvents.data.googleCalEvents;
  } catch (err) {
    console.log(err);
    debugger;
    return err;
  }
};

// const getGoogleCalEvents = () => {
//   // TODO: action that fetches and set google calendar events
//   return (dispatch, store) => {
//     const state = store();
//     return asyncGetGoogleCalEvents(dispatch, state);
//   };
// };

export { createCallEvents, asyncGetGoogleCalEvents };
