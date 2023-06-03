import React from 'react';
import { array } from 'prop-types';

import Typography from '@mui/material/Typography';

// import timingStyles from './Timing.scss';

const Timing = props => {
  return (
    <div>
      <Typography variant="h6">CALL TIMING</Typography>
    </div>
  );
};

Timing.propTypes = {
  timeRangeValues: array.isRequired, // eslint-disable-line
  // setTimeRangeValues: func.isRequired
};

export default Timing;
