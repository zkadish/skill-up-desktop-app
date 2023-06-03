const classes = {
  formControl: {
    width: '100%',
    margin: '0',
  },
  helperText: {
    display: 'inline-block',
    height: '19px',
    width: '100%',
    padding: '0 0 0 14px',
    margin: '0 0 4px',
  },
  timeZone: {
    '& .MuiOutlinedInput-root': {
      paddingTop: '0',
      paddingBottom: '0',
      '& .MuiOutlinedInput-input': {
        padding: '6.5px 4px 6.5px 6px',
      },
    },
    '& .MuiAutocomplete-endAdornment': {
      top: 'calc(50% - 12px)',
    },
  },
};

export default classes;
