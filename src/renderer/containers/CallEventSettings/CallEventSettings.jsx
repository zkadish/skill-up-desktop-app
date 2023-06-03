import React, { useState, useEffect } from 'react';
import { func, array } from 'prop-types';

import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';

import classes from './CallEventSettings.styles';

const CallEventSettings = (props) => {
  const {
    daysEventHistory,
    daysEventFuture,
    setDaysEventHistory,
    setDaysEventFuture,
  } = props;

  const [history, setHistory] = useState(5);
  const [future, setFuture] = useState(5);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setHistory(daysEventHistory.length);
  }, [daysEventHistory]);

  useEffect(() => {
    setFuture(daysEventFuture.length);
  }, [daysEventFuture]);

  const onChangeCallEventHistory = (e) => {
    setHistory(delete errors.callEventHistory);
    let { value } = e.target;
    if (value === '') {
      setHistory('');
      return;
    }

    const regex = /^[0-9]+$/;
    const valid = regex.test(value);
    if (!valid) {
      setErrors({
        callEventHistory:
          'Call event history must a number between 0 and 100(days).',
      });
      setHistory(value);
      return;
    }

    value = Number(value.replace(/^0+/, ''));
    if (value > 100) {
      value = 100;
      setErrors({
        callEventHistory:
          'Call event history must a number between 0 and 100(days).',
      });
    }

    setDaysEventHistory(value);
  };

  const onChangeCallEventFuture = (e) => {
    setFuture(delete errors.callEventFuture);
    let { value } = e.target;
    if (value === '') {
      setFuture('');
      return;
    }

    const regex = /^[0-9]+$/;
    const valid = regex.test(value);
    if (!valid) {
      setErrors({
        callEventFuture:
          'Call event future must a number between 0 and 100(days).',
      });
      setFuture(value);
      return;
    }

    value = Number(value.replace(/^0+/, ''));
    if (value > 100) {
      value = 100;
      setErrors({
        callEventFuture:
          'Call event future must a number between 1 and 100(days).',
      });
    }

    setDaysEventFuture(value, daysEventHistory.length);
  };

  return (
    <Box style={{ padding: '16px 0 0 16px' }}>
      <Paper sx={{ ...classes.root }}>
        <Box>Call Events</Box>
        <Box>
          <TextField
            sx={{ ...classes.textField }}
            id="callEventHistory"
            label="Call Event History"
            value={history}
            onChange={onChangeCallEventHistory}
            error={errors.callEventHistory}
            helperText={
              errors.callEventHistory
                ? errors.callEventHistory
                : 'How many days of history, from today, should be shown?'
            }
            variant="outlined"
          />
          <TextField
            sx={{ ...classes.textField }}
            id="callEventFuture"
            label="Call Event Future"
            value={future}
            onChange={onChangeCallEventFuture}
            error={null}
            helperText="How many days in the future, including today, should be shown?"
            variant="outlined"
          />
        </Box>
      </Paper>
    </Box>
  );
};

CallEventSettings.propTypes = {
  daysEventHistory: array.isRequired, // eslint-disable-line
  daysEventFuture: array.isRequired, // eslint-disable-line
  setDaysEventHistory: func.isRequired,
  setDaysEventFuture: func.isRequired,
};

export default CallEventSettings;
