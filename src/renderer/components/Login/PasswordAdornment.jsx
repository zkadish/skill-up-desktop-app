import React, { useState } from 'react';
import { func } from 'prop-types';
import makeStyles from '@mui/styles/makeStyles';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { InputAdornment, IconButton } from '@mui/material';

const adornmentStyles = makeStyles(() => ({
  passwordIcon: {
    marginRight: '-14px',
    padding: '6px 12px',
    borderRadius: '0 4px 4px 0',
  },
}));

const PasswordAdornment = (props) => {
  const { onVisibility } = props;
  const adornmentClasses = adornmentStyles();

  const [visibility, setVisibility] = useState(false);

  const onClickShowPassword = () => {
    setVisibility(!visibility);
    onVisibility(!visibility);
  };

  const onMouseDownPassword = (e) => {
    e.preventDefault();
  };

  return (
    <InputAdornment position="end">
      <IconButton
        className={adornmentClasses.passwordIcon}
        aria-label="toggle password visibility"
        onClick={onClickShowPassword}
        onMouseDown={onMouseDownPassword}
        edge="end"
        size="large"
      >
        {visibility ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </InputAdornment>
  );
};

PasswordAdornment.propTypes = {
  onVisibility: func.isRequired,
};

export default PasswordAdornment;
