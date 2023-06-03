import React, { useEffect, useRef, useState } from 'react';
import { object, func } from 'prop-types';
import { Box } from '@mui/material';
import CallEventAccordion from './CallEventAccordion';

import classes from './CallEventWindow.styles';

function CallEventWindow(props) {
  const { setWinCallEvent } = props;

  // TODO: Add Hacker web font for mono spaced numbers
  const sec = useRef(0); // 59
  const min = useRef(30); // 59
  const hour = useRef(0); // 24
  const [seconds, setSeconds] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [hours, setHours] = useState('00');

  const countDown = () => {
    const counter = setInterval(() => {
      sec.current -= 1;

      if (sec.current === 0 && min.current === 0 && hour.current === 0) {
        clearInterval(counter);
      }

      if (sec.current < 0) {
        sec.current = 59; // reset seconds to init val 59
        min.current -= 1; // increment minutes
      }

      if (min.current < 0) {
        min.current = 59;
        hour.current -= 1; // increment hours
      }

      if (hour.current < 0) {
        hour.current = 0;
      }

      const s = sec.current < 10 ? `0${sec.current}` : `${sec.current}`;
      const m = min.current < 10 ? `0${min.current}` : `${min.current}`;
      const h = hour.current < 10 ? `0${hour.current}` : `${hour.current}`;

      setSeconds(s);
      setMinutes(m);
      setHours(h);
    }, 1000);
  };

  useEffect(() => {
    const intervalId = countDown();

    // window.electron.ipcRenderer.initCallEventWin();
    window.electron.ipcRenderer.sendMessage('init-call-event-win');
    window.electron.ipcRenderer.once('init-call-event-win', (callEvent) => {
      // console.log('init-call-event-win', callEvent);
      setWinCallEvent(callEvent);
    });

    return () => clearInterval(intervalId);
  }, [setWinCallEvent]);

  return (
    <>
      <Box sx={{ ...classes.titleBar }}>Sales Coach</Box>
      <Box sx={{ ...classes.duration }}>{`${hours}:${minutes}:${seconds}`}</Box>
      <Box sx={{ ...classes.callEventTemplate }}>
        <CallEventAccordion />
      </Box>
    </>
  );
}

CallEventWindow.propTypes = {
  callEvent: object, // eslint-disable-line
  setWinCallEvent: func.isRequired,
};

export default CallEventWindow;
