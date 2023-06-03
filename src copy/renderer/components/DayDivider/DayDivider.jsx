import React from 'react';
import { string } from 'prop-types';
import clsx from 'clsx';
import { Box, Divider } from '@mui/material';

import classes from './DayDivider.styles';

const DayDivider = (props) => {
  const { day, bgColor } = props;

  return (
    <Box sx={{ ...classes.container }}>
      <Box className="divider">
        <Divider variant="middle" />
      </Box>
      <Box className="day">
        <Box
          component="span"
          className={clsx(
            { white: bgColor === 'white' },
            { lightgrey: bgColor === 'lightgrey' }
          )}
        >
          {day}
        </Box>
      </Box>
    </Box>
  );
};

DayDivider.propTypes = {
  bgColor: string,
  day: string,
};

DayDivider.defaultProps = {
  bgColor: 'white',
  day: '',
};

export default DayDivider;
