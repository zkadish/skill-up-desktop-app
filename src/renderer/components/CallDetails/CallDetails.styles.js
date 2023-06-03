const classes = {
  root: {
    width: '75vw',
  },
  tab: {
    '&.MuiButtonBase-root': {
      padding: '0 16px',
    },
  },
  appBar: {
    '&.MuiPaper-root': {
      position: 'relative',
      zIndex: '50',
      display: 'flex',
      height: '48px',
      flexDirection: 'row',
      alignItems: 'flex-end',
      backgroundColor: 'white',
    },
  },
  paper: {
    flexGrow: 1,
    height: 'calc(100vh - 112px)',
    borderRadius: 0,
  },
};

export default classes;
