const classes = {
  root: {
    position: 'relative',
    zIndex: 10,
    padding: '8px 16px 16px',
    '&.MuiPaper-root': {
      borderRadius: 0,
    },
    '.menu': {
      display: 'flex',
      margin: '8px 0 0',
    },
    '.search': {
      alignSelf: 'center',
      position: 'relative',
      borderRadius: '4px',
      backgroundColor: 'rgba(0, 0, 0, 0.15)',
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
      },
      marginRight: '16px',
      marginLeft: 0,
      width: '30%',
      height: '36px',
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
      '& .MuiIconButton-root': {
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0)',
        },
      },
    },
  },
  input: {
    '&.MuiInputBase-root': {
      width: '100%',
    },
    '& .MuiInputBase-input': {
      padding: '8px 48px 8px 16px',
      '&::placeholder': {
        color: 'black',
      },
    },
  },
  scrollingLayout: {
    padding: '16px',
    height: 'calc(100vh - 211px)',
    overflow: 'auto',
    '.callHistory': {
      display: 'flex',
    },
    '.leftCol': {
      width: '100%',
    },
    '.blockContainer': {
      margin: '0 0 16px',
      '&:lastChild': {
        marginBottom: '0',
      },
    },
    '.blockLabel': {
      fontSize: '15px',
      fontWeight: '500',
    },
    '.element': {
      padding: '0 8px 0 0',
      fontSize: '14px',
    },
  },
  accordion: {
    margin: '8px 0 0 0',
    background: '#fff',
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '0 16px',
    '& .MuiAccordionSummary-root': {
      display: 'flex',
    },
    '&:firstChild': {
      marginTop: 0,
    },
    '&::before': {
      backgroundColor: 'transparent',
    },
    '&.Mui-expanded': {
      marginTop: '8px',
      '&:firstChild': {
        marginTop: 0,
      },
    },
    '& .MuiAccordionSummary-content': {
      '&.Mui-expanded': {
        margin: 0,
      },
    },
  },
  accordionSummary: {
    '&.Mui-expanded': {
      margin: 0,
      minHeight: '36px',
      '& .MuiExpansionPanelSummary-content': {
        '&.Mui-expanded': {
          margin: 0,
        },
      },
    },
    minHeight: '36px',
    '& > div': {
      display: 'block',
      margin: '0',
      padding: '0',
      '& > p': {
        '&:firstChild': {
          margin: '8px 0 0 0',
        },
        '&:last-child': {
          margin: '0 0 12px 0',
        },
        fontWeight: '500',
      },
    },
  },
  accordionHeading: {
    margin: '8px 0',
    fontSize: '18px',
    fontWeight: 'regular',
  },
  accordionDetails: {
    flexDirection: 'column',
    padding: '0 16px 16px',
  },
};

export default classes;
