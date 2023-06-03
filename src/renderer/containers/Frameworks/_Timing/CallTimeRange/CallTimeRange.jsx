import React, { useState, useEffect } from 'react';
import { array } from 'prop-types';
import { Range } from 'react-range';

import makeStyles from '@mui/styles/makeStyles';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AlarmIcon from '@mui/icons-material/Alarm';

import timingStyles from '../Timing.scss';

const CallTimeRange = props => {
  const { timeRangeValues } = props;
  const [range, setRange] = useState({ values: timeRangeValues });

  useEffect(() => {
    setRange({ values: timeRangeValues });
  }, [timeRangeValues]);

  const onAddTimeRangeClick = () => {
    // TODO: use length to determine range setting
    const rangeValues = [];
    const timeDividers = timeRangeValues.length + 1;
    const rangePos = 100 / (timeDividers + 1);
    for (let i = 0; i < timeDividers; i += 1) {
      // console.log(rangeValues[i - 1]);
      if (!rangeValues[i - 1]) {
        rangeValues.push(rangePos);
      } else {
        rangeValues.push(
          (Number(rangeValues[i - 1]) + Number(rangePos)).toString()
        );
      }
    }
    setRange(rangeValues);
  };

  const onRemoveTimeRangeClick = () => {
    // debugger;
  };

  const onRangeChange = values => {
    console.log(values);
    setRange({ values });
  };

  return (
    <div className={timingStyles.timeRange}>
      <IconButton onClick={onAddTimeRangeClick} size="large">
        <AlarmIcon />
      </IconButton>
      <Range
        step={0.1}
        min={0}
        max={100}
        values={range.values}
        onChange={onRangeChange}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '6px',
              width: '100%',
              backgroundColor: '#ccc'
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '20px',
              width: '20px',
              backgroundColor: '#999'
            }}
          />
        )}
      />
      <IconButton onClick={onRemoveTimeRangeClick} size="large">
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

CallTimeRange.propTypes = {
  timeRangeValues: array.isRequired // eslint-disable-line
};

export default CallTimeRange;
