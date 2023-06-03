import { getPastEvents } from '../api/services/events';
import { setPastEvents, setGoogleCalEvents, setDaysEvents } from './app';
import {
  asyncGetGoogleCalEvents,
  createCallEvents,
} from '../api/integration/googleCalendar';
import { setEventNotification } from './notifications';
import { uuid } from '../utils/data';

import { callEventHistory } from '../mockData/callEventHistory';

const asyncGetEvents = async (
  dispatch,
  state,
  daysEventFuture,
  daysEventHistory
) => {
  try {
    const {
      auth,
      userAccount: {
        daysEventFuture: eventFuture,
        daysEventHistory: eventHistory,
        daysToday,
        settings: userSettings,
      },
      notifications: { eventNotifications },
    } = state;

    const daysFuture = daysEventFuture || eventFuture;
    const daysHistory = daysEventHistory || eventHistory;

    let startDate = null;
    if (daysHistory.length > 0) {
      [startDate] = daysHistory;
    }
    if (daysHistory.length === 0) {
      [startDate] = daysToday;
    }

    let endDate = null;
    if (daysFuture.length > 0) {
      const futureDate = new Date(
        daysFuture[daysFuture.length - 1][
          daysHistory.length + daysFuture.length
        ]
      );
      endDate = futureDate.setDate(futureDate.getDate());
    }
    if (daysFuture === 0) {
      [endDate] = daysToday;
    }

    endDate = typeof endDate === 'number' ? new Date(endDate) : endDate[0];
    endDate.setHours(23);
    endDate.setSeconds(59);
    endDate.setMinutes(59.999);

    const pastCallEvents = await getPastEvents(auth.user?.account_id, {
      startDate: startDate[0],
      endDate,
    });

    /**
     * Mocked past call events
     */
    pastCallEvents.data.events = [
      ...pastCallEvents.data.events,
      ...callEventHistory,
    ];
    /* Mocked past call event */

    dispatch(setPastEvents(pastCallEvents));

    const today = daysToday[0][daysHistory.length];
    const googleEvents = await asyncGetGoogleCalEvents(
      userSettings,
      today,
      endDate
    );
    dispatch(setGoogleCalEvents(googleEvents));

    // Combine event days adding today
    const daysEvents = await createCallEvents(
      [...daysHistory, ...daysToday, ...daysFuture],
      pastCallEvents.data.events,
      googleEvents
    );

    // set and add notification to events
    // This copy is currently not being used and can be safely removed.
    daysEvents.forEach((day, i) => {
      if (i === 0) return;
      day.events.forEach((event) => {
        const notificationId = uuid();
        // const beforeToday = event.dateObj < getTodayOffSet(-1);
        if (eventNotifications.length === 0) {
          setEventNotification({
            id: notificationId,
            type: 'event',
            eventId: event.id,
            name: event.summary,
            message: 'Add a sales coach template.',
            link: '/app/calls',
          });
        }
      });
    });

    dispatch(setDaysEvents(daysEvents));
  } catch (err) {
    console.log(err);
    debugger;
  }
};

const getEvents = (daysEventsFuture, daysEventHistory) => {
  return (dispatch, store) => {
    const state = store();
    return asyncGetEvents(dispatch, state, daysEventsFuture, daysEventHistory);
  };
};

export default getEvents;
