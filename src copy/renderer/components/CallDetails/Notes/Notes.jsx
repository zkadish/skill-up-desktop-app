import React, { useRef } from 'react';
import { object } from 'prop-types';

import { fade, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { CircleProgress } from 'react-gradient-progress';
import IconButton from '@material-ui/core/IconButton';
// import Paper from '@material-ui/core/Paper';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import scss from '../../../styles/_variables.module.scss';
import styles from '../CallDetails.module.scss';

import DayDivider from '../../DayDivider';

// TODO: make sure your using UTC time
import { getDateToday } from '../../../utils/time';

const useStyles = makeStyles((theme) => ({
  meetingTitle: {
    margin: `0 0 ${scss.XS}`,
    fontSize: 18,
    fontWeight: 'bold',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  rotate: {
    '& svg': {
      transform: `rotate(-90deg)`,
      height: '1.5em',
      width: '1.5em',
    },
  },
}));

const Notes = (props) => {
  const { activeCall } = props;

  const classes = useStyles();

  const today = useRef(getDateToday());

  return (
    <>
      <Typography variant="h6">CALL NOTES</Typography>
      <div className={styles.callScrollArea}>
        <div className={styles.callContainer}>
          <DayDivider day={today.current} backgroundColor="white" />
          <div className={styles.historyHeader}>
            <Typography className={classes.meetingTitle}>
              {activeCall.summary}
            </Typography>
            <div className={styles.actions}>
              <IconButton className={classes.rotate} aria-label="delete">
                <ExitToAppIcon />
              </IconButton>
              <CircleProgress
                percentage={75}
                width={70}
                strokeWidth={8}
                fontSize={12}
                primaryColor={['lightgreen', '#fff']}
                secondaryColor="#ccc"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Notes.propTypes = {
  activeCall: object, // eslint-disable-line
};

Notes.defaultProps = {
  activeCall: {},
};

export default Notes;
