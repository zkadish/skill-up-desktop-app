import React, { useState } from 'react';
import { object } from 'prop-types';
import { Chat } from '@mui/icons-material';
import { withRouter, Link } from 'react-router-dom';
import {
  // TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  Button,
  Box,
} from '@mui/material';

import routes from '../../constants/routes';
import classes from '../Login/Login.styles';

const ForgotPassword = (props) => {
  const { history } = props;

  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const onEmailChange = (e) => {
    setEmail(e.target.value);
    setErrors({
      ...errors,
      email: '',
    });
  };

  const onClickHandler = () => {
    // TODO: add reset password endpoint
    history.push(routes.LOGIN);
  };

  const onCreateAccount = () => {
    window.electron.ipcRenderer.once('create-account', (arg) => {
      // TODO: open a modal explaining that a browser has been opened for you to create an account on the website
      console.log(arg);
    });
    window.electron.ipcRenderer.createAccount();
  };

  return (
    <Box sx={{ ...classes.container }} data-tid="container">
      <Box className="login">
        <Box className="appName">
          <Chat />
          <span>S</span>
          <span>alesCoach</span>
        </Box>
        <FormControl sx={{ ...classes.formControl }}>
          <InputLabel error={!!errors.email} htmlFor="email">
            Email
          </InputLabel>
          <OutlinedInput
            id="email"
            value={email}
            onChange={onEmailChange}
            error={!!errors.email}
            fullWidth
            label="Email"
            variant="outlined"
          />
          <FormHelperText sx={{ ...classes.helperText }} error={!!errors.email}>
            {errors.email}
          </FormHelperText>
        </FormControl>
        <Box className="loginOptions">
          <Link to={routes.LOGIN}>Need to login?</Link>
        </Box>
        <Button
          color="primary"
          sx={{ ...classes.loginBtn }}
          fullWidth
          variant="contained"
          onClick={onClickHandler}
        >
          Reset password
        </Button>
        <Box className="signUp">
          Don&#39;t have an account?&nbsp;&nbsp;&nbsp;
          <Button
            id="create-account"
            variant="outlined"
            onClick={onCreateAccount}
          >
            &nbsp;&nbsp;Create One!&nbsp;&nbsp;
          </Button>
        </Box>
        {/* <Box className="signUp">
          <Button variant="outlined" onClick={onClickHandler}>
            &nbsp;&nbsp;Back&nbsp;&nbsp;
          </Button>
        </Box> */}
      </Box>
    </Box>
  );
};

ForgotPassword.propTypes = {
  history: object.isRequired, // eslint-disable-line
};

export default withRouter(ForgotPassword);
