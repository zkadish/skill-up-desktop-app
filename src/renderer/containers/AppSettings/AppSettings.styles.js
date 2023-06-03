const classes = {
  root: {
    display: 'flex',
    '.settingsMenu': {
      padding: '0 0 16px',
      width: '25vw',
      minWidth: '320px',
      height: 'calc(100vh - 64px)',
      overflow: 'auto',
      '.title': {
        padding: '16px 0 8px 32px',
        fontSize: '24px',
      },
      '.subTitle': {
        padding: '0 0 0 40px',
        fontSize: '20px',
      },
      '.option': {
        padding: '0 0 0 56px',
        fontSize: '14px',
      },
    },
    '.settings': {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    },
  },
  calls: {
    '&.MuiPaper-root': {
      flexGrow: 1,
      padding: '16px',
      borderRadius: 0,
    },
  },
  header: {
    '&.MuiPaper-root': {
      display: 'flex',
      alignItems: 'center',
      padding: '0px 16px',
      height: '48px',
      borderRadius: 0,
      fontSize: '24px',
      zIndex: '10',
    },
  },
  paper: {
    '&.MuiPaper-root': {
      position: 'relative',
      padding: '16px',
      width: '50%',
      height: 'calc(100vh - 144px)',
      minWidth: '320px',
      border: '1px solid #ccc',
      boxShadow: 'none',
      overflow: 'auto',
    },
  },
  menuItem: {
    '&.MuiMenuItem-root': {
      display: 'flex',
      justifyContent: 'flex-start',
    },
  },
};

export default classes;
