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
  search: {
    flexGrow: 1,
    position: 'relative',
    alignSelf: 'center',
    height: '36px',
    width: '100%',
    marginLeft: '16px',
    borderRadius: '4px',
    backgroundColor: 'rgba(0, 0, 0, .15)',
    '& .MuiInputBase-root': {
      width: '100%',
      color: 'inherit',
      '& .MuiInputBase-input': {
        padding: '9px 48px 8px 16px',
        // paddingTop: '9px',
        // paddingRight: `calc(1em + ${theme.spacing(4)})`,
        transition: 'width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        width: '100%',
        '&::placeholder': {
          color: 'black',
        },
      },
    },
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, .25)',
    },
    '.searchIcon': {
      position: 'absolute',
      top: '0px',
      right: '0px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 8px 0 0',
      height: '100%',
      color: 'black',
      pointerEvents: 'none',
    },
    '.cancelIcon': {
      position: 'absolute',
      top: '0px',
      right: '2px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0',
      height: '100%',
      color: 'black',
      '& .MuiButtonBase-root': {
        padding: '6px',
      },
    },
  },
  addInput: {
    margin: '0 0 0 16px',
    '&.Mui-error': {
      color: '#f44336',
    },
    '& .MuiOutlinedInput-input': {
      padding: '6.5px 14px',
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
    // '&.MuiList-padding': {
    //   padding: '16px 0 0',
    // },
    '.listItem': {
      justifyContent: 'flex-start',
      // height: '64px',
      margin: '0 0 1px',
      padding: '4px 16px',
      '.display': {
        display: 'none',
      },
      '&:hover': {
        '.display': {
          display: 'block',
        },
        '.selectedDisplay': {
          display: 'none',
        },
      },
      '& .Mui-disabled': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: 'transparent',
        },
      },
      '.addBtn': {
        marginLeft: '-12px',
        marginRight: '0px',
        height: '48px',
      },
    },
    '.selected': {
      backgroundColor: 'rgba(63,81,181, 0.08)', // 159,169,224
      '&:hover': {
        backgroundColor: 'rgba(63,81,181, 0.16)',
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
    width: 'calc(100% - 36px)',
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
