const classes = {
  paper: {
    padding: '16px 0 0',
    margin: '8px 8px 16px',
    width: '50%',
    minWidth: '320px',
    border: '1px solid #ccc',
    boxShadow: 'none',
    overflow: 'auto',
  },
  createElements: {
    display: 'flex',
    alignItems: 'center',
    height: '36px',
    padding: '0 16px 0 0',
  },
  addInput: {
    margin: '0 0 0 16px',
    '&.Mui-error': {
      color: '#f44336',
    },
    '& .MuiOutlinedInput-input': {
      padding: '8.5px 14px',
    },
  },
  iconButton: {
    '&.MuiButtonBase-root': {
      margin: '0 -12px 0 0',
      height: '48px',
    },
  },
  list: {
    // padding: '16px 0 0',
    '&.MuiList-padding': {
      padding: '16px 0 0',
    },
    '.listItem': {
      justifyContent: 'flex-start',
      height: '64px',
      margin: '0 0 1px',
      padding: '8px 16px',
      '.display': {
        display: 'none',
      },
      '&:hover': {
        '.display': {
          display: 'block',
        },
      },
      '& .Mui-disabled': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: 'transparent',
        },
      },
    },
    '.active': {
      backgroundColor: 'rgba(0, 0, 0, 0.08)',
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.08)',
      },
    },
    '.dragging': {
      backgroundColor: 'rgba(63, 81, 181, .5)',
    },
  },
  textField: {
    width: 'calc(100% - 108px)',
    margin: '10px 0',
    fieldset: {
      borderColor: 'transparent',
    },
    '& .MuiFormLabel-root': {
      width: 'calc(100% - 28px)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    '& .MuiOutlinedInput-root': {
      padding: '0',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      'border-color': 'rgba(0, 0, 0, 0)',
    },
  },
};

export default classes;
