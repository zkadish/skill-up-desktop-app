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
  createTemplate: {
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
  },
  iconButton: {
    '&.MuiButtonBase-root': {
      margin: '0 -12px 0 0',
      height: '48px',
    },
  },
  list: {
    padding: '16px 0 0',
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
  customInput: {
    width: 'calc(100% - 108px)',
    fieldset: {
      borderColor: 'transparent',
    },
    '&.Mui-error': {
      color: '#f44336',
    },
  },
};

export default classes;
