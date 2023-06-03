import React from 'react';
import { bool, func } from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';

import classes from './SaveCancel.styles';

const SaveCancel = (props) => {
  const { onCancel, isDirty, onSave } = props;

  return (
    <AppBar sx={{ ...classes.root }}>
      <Button sx={{ ...classes.button }} variant="contained" onClick={onCancel}>
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
