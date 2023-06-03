import React from 'react';
import { bool, func } from 'prop-types';
import { alpha } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';

import classes from './SaveCancel.styles';

// const useAppBarStyles = makeStyles((theme) => ({
//   root: {
//     position: 'absolute',
//     top: 'auto',
//     bottom: '0px',
//     zIndex: '50',
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//     height: '56px',
//     backgroundColor: 'white',
//     borderRadius: '0 0 4px 4px',
//     fontSize: '12px',
//     lineHeight: '0',
//   },
//   button: {
//     height: '36px',
//     margin: '0 16px 0 0',
//   },
// }));

const SaveCancel = (props) => {
  const { onCancel, isDirty, onSave } = props;

  // const appBarClasses = useAppBarStyles();

  return (
    <AppBar sx={{ ...classes.root }} position="absolute">
      <Button
        sx={{ ...classes.button }}
        variant="contained"
        onClick={onCancel}
      >
        Cancel
      </Button>
      <Button
        sx={{ ...classes.button }}
        variant="contained"
        color="primary"
        onClick={onSave}
        disabled={!isDirty}
      >
        Save
      </Button>
    </AppBar>
  );
};

SaveCancel.propTypes = {
  onCancel: func.isRequired,
  onSave: func.isRequired,
  isDirty: bool.isRequired,
};

export default SaveCancel;
