import React from 'react';
import { number, string, func, object } from 'prop-types';
import clsx from 'clsx';
import makeStyles from '@mui/styles/makeStyles';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

const badgeUseStyles = makeStyles({
  root: {
    // color: 'white',
    '& .MuiBadge-anchorOriginTopRightRectangular': {
      top: '2px',
      right: '4px',
      color: 'white',
    },
  },
  mainMenu: {
    color: 'white',
    '& .MuiBadge-anchorOriginTopRightRectangular': {
      backgroundColor: 'red',
    },
  },
  secondary: {
    '& .MuiBadge-anchorOriginTopRightRectangular': {
      backgroundColor: 'orange',
    },
  },
});

// {
//   '&.MuiButtonBase-root': {
//     padding: '12px',
//   },
// }

const NotificationBtn = (props) => {
  const { number: num, color, onClick, sx } = props;
  const badgeClasses = badgeUseStyles();

  return (
    <IconButton
      aria-label="show new notifications"
      color="inherit"
      disabled={!num}
      onClick={onClick}
      size="large"
      sx={sx}
    >
      <Badge
        className={clsx(badgeClasses.root, {
          [badgeClasses[color]]: color,
        })}
        badgeContent={num}
      >
        {num > 0 && <NotificationsIcon />}
        {num === 0 && <NotificationsNoneIcon />}
      </Badge>
    </IconButton>
  );
};

NotificationBtn.propTypes = {
  number,
  color: string,
  onClick: func,
  sx: object, // eslint-disable-line
};

NotificationBtn.defaultProps = {
  number: 3,
  color: 'default',
  onClick: () => {},
};

export default NotificationBtn;
