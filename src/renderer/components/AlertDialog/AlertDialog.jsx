import React from 'react';
import { func, object } from 'prop-types';
import makeStyles from '@mui/styles/makeStyles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const dialogStyles = makeStyles({
  root: {
    '& .MuiDialog-paperWidthSm': {
      maxWidth: '400px',
    },
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AlertDialogSlide = (props) => {
  const {
    alertDialog: { open, title, message, type, action },
    handleClose,
  } = props;

  const dialogClasses = dialogStyles();

  return (
    <Dialog
      open={open}
      className={dialogClasses.root}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          CANCEL
        </Button>
        <Button onClick={action} color="primary">
          {type}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AlertDialogSlide.propTypes = {
  alertDialog: object, // eslint-disable-line
  handleClose: func.isRequired,
};

export default AlertDialogSlide;
