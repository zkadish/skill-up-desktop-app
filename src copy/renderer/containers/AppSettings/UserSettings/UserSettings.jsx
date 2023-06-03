import React, { useState, useEffect } from 'react';
import timeZones from 'timezones.json';
import {
  FormControl,
  OutlinedInput,
  InputLabel,
  FormHelperText,
  TextField,
  Autocomplete,
} from '@mui/material';
import SaveCancel from '../SaveCancel';
import { alphabetizeLabel } from '../../../utils/data';
import { emailRegex, nameRegex } from '../../../constants/regex';

import classes from './UserSettings.styles';

const UserSettings = () => {
  const [filteredTimeZones, setFilteredTimeZones] = useState([]);
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    timeZone: '',
  });
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    timeZone: '',
  });

  useEffect(() => {
    const timeZoneLabels = timeZones.map((tz) => {
      const timeZone = { ...tz };
      const index = timeZone.text.indexOf(')');
      const label = timeZone.text.slice(index + 2);

      timeZone.label = label;
      return timeZone;
    });
    const timeZonesAlpha = timeZoneLabels.sort(alphabetizeLabel);
    setFilteredTimeZones(timeZonesAlpha);
  }, []);

  const onFirstNameChange = (e) => {
    const { value } = e.target;
    let error = !nameRegex.test(value);
    if (!value) error = false;

    setValues({ ...values, firstName: value });
    setErrors({
      ...errors,
      firstName: error
        ? 'The first name field can only contain letters or a hyphen.'
        : '',
    });
  };

  const onLastNameChange = (e) => {
    const { value } = e.target;
    let error = !nameRegex.test(value);
    if (!value) error = false;

    setValues({ ...values, lastName: value });
    setErrors({
      ...errors,
      lastName: error
        ? 'The last name field can only contain letters or a hyphen.'
        : '',
    });
  };

  const onEmailChange = (e) => {
    const { value } = e.target;
    let error = !emailRegex.test(value);
    if (!value) error = false;

    setValues({ ...values, email: value });
    setErrors({
      ...errors,
      email: error ? 'The email field must be a valid email.' : '',
    });
  };

  const onPhoneNumberChange = (e) => {
    let { value } = e.target;
    const x = value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    value = !x[2] ? x[1] : `(${x[1]}) ${x[2]}${x[3] ? `-${x[3]}` : ''}`;

    setValues({ ...values, phoneNumber: value });
  };

  const onCancel = () => {
    debugger
  };

  const onSave = () => {
    debugger
  };

  return (
    <>
      <FormControl sx={{ ...classes.formControl }} variant="outlined">
        <InputLabel error={!!errors.firstName} htmlFor="firstName">
          First Name
        </InputLabel>
        <OutlinedInput
          id="firstName"
          value={values.firstName}
          onChange={onFirstNameChange}
          error={!!errors.firstName}
          label="First Name"
          fullWidth
        />
        <FormHelperText
          sx={{ ...classes.helperText }}
          error={!!errors.firstName}
        >
          {errors.firstName}
        </FormHelperText>
      </FormControl>
      <FormControl sx={{ ...classes.formControl }} variant="outlined">
        <InputLabel error={!!errors.lastName} htmlFor="lastName">
          Last Name
        </InputLabel>
        <OutlinedInput
          id="lastName"
          value={values.lastName}
          onChange={onLastNameChange}
          error={!!errors.lastName}
          label="Last Name"
          fullWidth
        />
        <FormHelperText
          sx={{ ...classes.helperText }}
          error={!!errors.lastName}
        >
          {errors.lastName}
        </FormHelperText>
      </FormControl>
      <FormControl sx={{ ...classes.formControl }} variant="outlined">
        <InputLabel error={!!errors.email} htmlFor="email">
          Email
        </InputLabel>
        <OutlinedInput
          id="email"
          value={values.email}
          onChange={onEmailChange}
          error={!!errors.email}
          label="Email"
          fullWidth
        />
        <FormHelperText sx={{ ...classes.helperText }} error={!!errors.email}>
          {errors.email}
        </FormHelperText>
      </FormControl>
      <FormControl sx={{ ...classes.formControl }} variant="outlined">
        <InputLabel error={!!errors.phoneNumber} htmlFor="email">
          Phone Number
        </InputLabel>
        <OutlinedInput
          id="phoneNumber"
          value={values.phoneNumber}
          onChange={onPhoneNumberChange}
          error={!!errors.phoneNumber}
          label="Phone Number"
          fullWidth
        />
        <FormHelperText
          sx={{ ...classes.helperText }}
          error={!!errors.phoneNumber}
        >
          {errors.phoneNumber}
        </FormHelperText>
      </FormControl>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={filteredTimeZones}
        sx={{ ...classes.timeZone }}
        renderInput={(params) => <TextField {...params} label="Time Zones" />}
      />
      <SaveCancel onCancel={onCancel} isDirty={false} onSave={onSave} />
    </>
  );
};

export default UserSettings;
