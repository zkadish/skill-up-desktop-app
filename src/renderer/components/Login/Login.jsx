import React, { useState } from 'react';
import { object, func } from 'prop-types';
import { Link } from 'react-router-dom';
import { Chat } from '@mui/icons-material';
import {
  Button,
  FormControl,
  OutlinedInput,
  InputLabel,
  FormHelperText,
  Box,
} from '@mui/material';
// import Switch from '../Switch';
import PasswordAdornment from './PasswordAdornment';
import routes from '../../constants/routes';
import { signIn } from '../../api/services/authn';
import { getUserAccount } from '../../api/services/userAccounts';
import { emailRegex } from '../../constants/regex';

import classes from './Login.styles';

function Login(props) {
  const {
    setAuthenticatedUser,
    setAccessToken,
    setUserAccount,
    setDaysEventHistory,
    setDaysEventFuture,
    history,
  } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(false);
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

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
    setErrors({
      ...errors,
      password: '',
    });
  };

  const loginErrorHandler = (status, data) => {
    let message = data?.error || data;
    switch (true) {
      case data?.errors?.msg === 'Invalid value':
        message = 'Enter a valid email.';
        break;
      case message.includes('email'):
        setErrors({ ...errors, email: message });
        break;
      case message.includes('password'):
        setErrors({ ...errors, password: message });
        break;
      default:
        console.log('Error: ', status, data);
      // TODO: add an error message
      // TODO: add a generic system could not log you in...
      // credentials were not found...
    }
  };

  const loginResponse = (status, data) => {
    if (status !== 200) loginErrorHandler(status, data);
    if (status === 200) {
      setAuthenticatedUser(data.user);
      setAccessToken(data.accessToken);
      history.push(routes.APP);
      getUserAccount(data.user)
        .then((res) => {
          const { userAccount } = res.data;
          setUserAccount(userAccount);
          setDaysEventHistory(userAccount.callEventHistory);
          setDaysEventFuture(
            userAccount.callEventFuture,
            userAccount.callEventHistory
          );
          return res;
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const onLoginHandler = () => {
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
      setErrors({ ...errors, email: 'Enter your email...' });
      return;
    }
    if (!emailRegex.test(email)) {
      setErrors({ ...errors, email: 'Enter a valid email...' });
      return;
    }
    if (password === '') {
      setErrors({ ...errors, password: 'Enter your password...' });
      return;
    }

    // signIn({ email, password }, loginResponse);
    signIn({ email, password })
      .then((response) => {
        const { status, data } = response;
        return loginResponse(status, data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onCreateAccount = () => {
    window.electron.ipcRenderer.once('create-account', (arg) => {
      // TODO: open a modal explaining that a browser has been opened for you to create an account on the website
      console.log(arg);
    });
    window.electron.ipcRenderer.sendMessage('create-account');
  };

  const onShowPassword = (bool) => {
    setPasswordVisibility(bool);
  };

  return (
    <Box sx={{ ...classes.container }} data-tid="container">
      <Box className="login">
        <Box className="appName">
          <Chat />
          SalesCoach
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
        <FormControl sx={{ ...classes.formControl }}>
          <InputLabel error={!!errors.password} htmlFor="password">
            Password
          </InputLabel>
          <OutlinedInput
            id="password"
            type={passwordVisibility ? 'text' : 'password'}
            value={password}
            onChange={onPasswordChange}
            error={!!errors.password}
            endAdornment={<PasswordAdornment onVisibility={onShowPassword} />}
            fullWidth
            label="Password"
            variant="outlined"
          />
          <FormHelperText
            sx={{ ...classes.helperText }}
            error={!!errors.password}
          >
            {errors.password}
          </FormHelperText>
        </FormControl>
        <Box className="loginOptions">
          {/* Keep user logged in longer, save device as mac address assciated to the user in Auth service */}
          {/* <Box className="rememberMe">
            <Switch className={switchClasses.root} />
            <Box>&nbsp;&nbsp;Remember me.</Box>
          </Box> */}
          <Link to={routes.PASSWORD_RESET}>Forgot password?</Link>
        </Box>
        <Button
          color="primary"
          sx={{ ...classes.loginBtn }}
          fullWidth
          variant="contained"
          onClick={onLoginHandler}
        >
          Log in
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
      </Box>
    </Box>
  );
}

Login.propTypes = {
  history: object.isRequired, // eslint-disable-line
  setAccessToken: func.isRequired,
  setAuthenticatedUser: func.isRequired,
  setDaysEventHistory: func.isRequired,
  setDaysEventFuture: func.isRequired,
  setUserAccount: func.isRequired,
};

export default Login;
