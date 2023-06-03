import React from 'react';
import { func, object } from 'prop-types';
import { Box, IconButton } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import AccountCircle from '@mui/icons-material/AccountCircle';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import {
  severity,
  EMAIL_COPIED_TO_CLIPBOARD,
} from '../../constants/notifications';

import classes from './Attending.styles';

const Attending = (props) => {
  const { event, removeCallEventAttendee, setAlert } = props;

  const onRemoveAttendee = (email) => () => {
    removeCallEventAttendee({
      eventId: event.id,
      email,
    });
  };

  const onClickCopyEmail = (email) => () => {
    navigator.clipboard
      .writeText(email)
      .then(() => {
        setAlert({
          open: true,
          duration: 5000,
          severity: severity.INFO,
          message: `${email} ${EMAIL_COPIED_TO_CLIPBOARD}`,
        });
        return true;
      })
      .catch(() => {});
  };

  const onClickOpenEmail = (email) => () => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <>
      {event.attendees
        .filter((a) => !a.organizer)
        .map((attendee) => {
          return (
            <Box sx={{ ...classes.root }} key={attendee.email}>
              {(attendee.responseStatus === 'yes' ||
                attendee.responseStatus === 'accepted') && (
                <AccountCircle sx={{ ...classes.green }} />
              )}
              {(attendee.responseStatus === 'maybe' ||
                attendee.responseStatus === 'needsAction') && (
                <AccountCircle sx={{ ...classes.orange }} />
              )}
              {attendee.responseStatus === 'no' && (
                <AccountCircle sx={{ ...classes.red }} />
              )}
              <Box sx={{ ...classes.attendeeDisplayName }}>
                {attendee.displayName || attendee.email}
              </Box>
              <Box style={{ flexGrow: 1 }} />
              <IconButton
                sx={{
                  ...classes.iconButton,
                  ...classes.display,
                }}
                onClick={onClickCopyEmail(attendee.email)}
                size="large"
              >
                <FileCopyOutlinedIcon />
              </IconButton>
              <IconButton
                sx={{
                  ...classes.iconButton,
                  ...classes.display,
                }}
                onClick={onClickOpenEmail(attendee.email)}
                size="large"
              >
                <MailOutlineIcon />
              </IconButton>
              <IconButton
                onClick={onRemoveAttendee(attendee.email)}
                sx={{
                  ...classes.iconButton,
                  ...classes.display,
                }}
                size="large"
              >
                <DeleteOutlinedIcon />
              </IconButton>
            </Box>
          );
        })}
    </>
  );
};

Attending.propTypes = {
  event: object, // eslint-disable-line
  removeCallEventAttendee: func.isRequired,
  setAlert: func.isRequired,
};

export default Attending;
