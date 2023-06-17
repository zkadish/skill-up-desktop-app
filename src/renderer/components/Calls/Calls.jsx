import React, { useRef, useEffect } from 'react';
import { object, array, func } from 'prop-types';
import { Box } from '@mui/material';
import DayDivider from '../DayDivider';
import CallEvent from '../CallEvent';
import CallDetails from '../CallDetails';

import classes from './Calls.styles';

function Calls(props) {
  const { daysEvents, setActiveCall, activeCall } = props;
  const eventIndex = useRef(-1);

  useEffect(() => {
    eventIndex.current = -1;
    // when there is no state...
    // set the first call in the array to be active
    // TODO: set first call of the current day to be active on login
    if (daysEvents && daysEvents[0]?.events[0] && !activeCall) {
      setActiveCall(daysEvents[0].events[0]);
    }
  }, [activeCall, setActiveCall, daysEvents]);

  return (
    <Box sx={{ ...classes.callsContainer }}>
      <Box sx={{ ...classes.callEvents }}>
        {daysEvents?.map((day, index) => {
          // let date = null;
          // switch (index) {
          //   case 0:
          //     date = 'yesterday';
          //     break;
          //   case 1:
          //     date = 'today';
          //     break;
          //   default:
          //     date = 'tomorrow';
          // }

          return (
            <div key={day[index]}>
              <DayDivider day={day[index]} bgColor="lightgrey" />
              {day.events.map((event) => {
                eventIndex.current += 1;

                return (
                  <CallEvent
                    index={eventIndex.current}
                    event={event}
                    key={event.id}
                  />
                );
              })}
            </div>
          );
        })}
      </Box>
      <CallDetails />
    </Box>
  );
}

Calls.propTypes = {
  activeCall: object, // eslint-disable-line
  daysEvents: array, // eslint-disable-line
  setActiveCall: func.isRequired,
};

Calls.defaultProps = {
  daysEvents: [],
};

export default Calls;
