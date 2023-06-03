import React from 'react';
import { object, func } from 'prop-types';
import Fade from '@mui/material/Fade';
import { Box, Snackbar } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import { severity as type } from '../../constants/notifications';

import classes from './Alert.styles';

/**
 * The Alert shown by dispatching the SET_ALERT action
 * The Action creator setAlert is in actions/notifications
 * setAlert({ alert }) takes an object:
 * { open: false, duration: null, severity: severity.SUCCESS, message: SKILL_UP_NO_TEMPLATE }
 * There are constants which define the type and message
 */

// TODO: replace button tag with IconButton component
// TODO: add useMemo to this component and see if renders less when app loads

const Alert = (props) => {
  const {
    alert: { open, message, duration, severity },
    handleClose,
  } = props;

  const Error = () => {
    return (
      <Box
        sx={{
          ...classes.snackBar,
          ...classes.error,
        }}
      >
        <Box className="snackBarIcon">
          <ErrorOutlineIcon />
        </Box>
        <Box>{message}</Box>
        <button className="closeIcon" onClick={handleClose} type="button">
          <CloseOutlinedIcon />
        </button>
      </Box>
    );
  };

  const Warning = () => {
    return (
      <Box
        sx={{
          ...classes.snackBar,
          ...classes.warning,
        }}
      >
        <Box className="snackBarIcon">
          <ReportProblemOutlinedIcon />
        </Box>
        <Box>{message}</Box>
        <button className="closeIcon" onClick={handleClose} type="button">
          <CloseOutlinedIcon />
        </button>
      </Box>
    );
  };

  const Info = () => {
    return (
      <Box
        sx={{
          ...classes.snackBar,
          ...classes.info,
        }}
      >
        <Box className="snackBarIcon">
          <InfoOutlinedIcon />
        </Box>
        <Box>{message}</Box>
        <button className="closeIcon" onClick={handleClose} type="button">
          <CloseOutlinedIcon />
        </button>
      </Box>
    );
  };

  const Success = () => {
    return (
      <Box
        sx={{
          ...classes.snackBar,
          ...classes.success,
        }}
      >
        <Box className="snackBarIcon">
          <CheckCircleOutlinedIcon />
        </Box>
        <Box>{message}</Box>
        <button className="closeIcon" onClick={handleClose} type="button">
          <CloseOutlinedIcon />
        </button>
      </Box>
    );
  };

  return (
    <Fade in={open} timeout={250}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={duration}
        onClose={handleClose}
      >
        <Box>
          {severity === type.ERROR && <Error />}
          {severity === type.WARNING && <Warning />}
          {severity === type.INFO && <Info />}
          {severity === type.SUCCESS && <Success />}
        </Box>
      </Snackbar>
    </Fade>
  );
};

Alert.propTypes = {
  handleClose: func.isRequired,
  alert: object // eslint-disable-line
};

export default Alert;
