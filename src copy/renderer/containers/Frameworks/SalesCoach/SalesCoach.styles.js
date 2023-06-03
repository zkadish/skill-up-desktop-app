import { colors } from '../../../styles/variables.styles';

const classes = {
  accordion: {
    '&.MuiPaper-root': {
      backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    // backgroundColor: 'rgba(0, 0, 0, 0)',
    // border: '1px solid rgba(0, 0, 0, .5)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&.Mui-expanded': {
      margin: 'auto',
    },
  },
  accordionSummary: {
    '&.MuiButtonBase-root': {
      color: 'white',
      display: 'flex',
      padding: '0 16px',
    },
    backgroundColor: 'rgba(255, 255, 255, .05)',
    borderBottom: '1px solid rgba(0, 0, 0, .5)',
    // marginBottom: '-10px',
    minHeight: 56,
    color: 'white',
    '&.Mui-expanded': {
      minHeight: 56,
      borderBottom: '1px solid rgba(0, 0, 0, .5)',
      // margin: '0',
    },
    '& .MuiAccordionSummary-content': {
      '&.Mui-expanded': {
        margin: '12px 0',
        // border: '1px solid red',
      },
    },
  },
  accordionDetails: {
    '&.MuiAccordionDetails-root': {
      padding: '16px',
      color: 'white',
      backgroundColor: 'rgba(0, 0, 0, .15)',
    },
  },
  input: {
    margin: '0',
    color: '#fff',
    backgroundColor: 'rgba(255, 255, 255, .1)',
    '& .MuiOutlinedInput-input': {
      padding: '6.5px 14px',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(255, 255, 255, .75)',
    },
    '&.Mui-focused': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(255, 255, 255, .75)',
        borderWidth: '1px',
      },
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(255, 255, 255, 1)',
    },
  },
  textField: {
    margin: '6px 0',
    '& .MuiOutlinedInput-input': {
      padding: '6.5px 14px',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(255, 255, 255, .5)',
    },
    '& .MuiOutlinedInput-root:hover': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(255, 255, 255, .85)',
      },
    },
    '& .MuiOutlinedInput-root.Mui-focused': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(255, 255, 255, .85)',
      },
    },
    '& .MuiInputBase-root': {
      color: '#fff',
      padding: '1px 0',
    },
    '& .MuiFormLabel-root': {
      width: 'calc(100% - 28px)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      color: 'rgba(255, 255, 255, .5)',
      '&.Mui-focused': {
        color: 'rgba(255, 255, 255, .5)',
      },
    },
  },
  checkbox: {
    color: 'white',
    '& .MuiCheckbox-root': {
      padding: '9px',
    },
    '&.Mui-checked': {
      color: 'white',
    },
  },
  questionAnswer: {
    padding: '6px 0',
    '& .MuiOutlinedInput-input': {
      padding: '6.5px 14px',
    },
    '& .MuiOutlinedInput-root': {
      margin: '4px 0 0',
      padding: '1px 0',
      color: '#fff',
      backgroundColor: 'rgba(255, 255, 255, .1)',
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(255, 255, 255, .75)',
      },
      '&.Mui-focused': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: 'rgba(255, 255, 255, .75)',
          borderWidth: '1px',
        },
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(255, 255, 255, 1)',
      },
    },
  },
  search: {
    alignSelf: 'center',
    position: 'relative',
    borderRadius: '4px',
    backgroundColor: 'rgba(0, 0, 0, .15)',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, .25)',
    },
    marginLeft: 0,
    width: '100%',
    height: '35px',
    '& .MuiInputBase-root': {
      color: 'inherit',
      '& .MuiInputBase-input': {
        padding: '8px 40px 8px 16px',
        width: '100%',
        '&::placeholder': {
          color: 'white',
        },
        transition: 'width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        color: 'white',
        '&.Mui-disabled': {
          color: 'white',
          '-webkit-text-fill-color': 'white',
        },
      },
    },
    '.searchIcon': {
      position: 'absolute',
      top: '0px',
      right: '0px',
      display: 'flex',
      padding: '0 8px',
      height: '100%',
      pointerEvents: 'none',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'rgba(255, 255, 255, 0.4)',
    },
    '.cancelIcon': {
      position: 'absolute',
      top: '0px',
      right: '0px',
      display: 'flex',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      '& .MuiIconButton-root': {
        padding: '6px',
        color: 'rgba(255, 255, 255, 1)',
      },
    },
  },
  elements: {
    width: '100%',
    '.actionItem': {
      display: 'flex',
      input: {
        width: '100%',
      },
    },
    '.attendee': {
      display: 'flex',
      alignItems: 'center',
      height: '36px',
      '&__text': {
        margin: '0 8px',
        whiteSpace: 'nowrap',
      },
    },
    '.talkTrack': {
      display: 'flex',
      padding: '6px 0',
      '&__bullet': {
        svg: {
          position: 'relative',
          top: '1px',
          left: '-1px',
          width: '12px',
          height: '12px',
        },
      },
      '&__text': {
        padding: '0 0 0 3px',
      },
    },
    '.battleCards': {
      display: 'flex',
      flexDirection: 'column',
      '&__list': {
        margin: '8px 0 0',
        maxHeight: '240px',
        overflow: 'auto',
      },
    },
  },
  attendeeIconBtn: {
    '&.MuiIconButton-root': {
      margin: '0 -12px 0 0',
      color: 'inherit',
    },
  },
  addBtn: {
    '&.MuiButtonBase-root': {
      padding: '6px',
      margin: '0 -12px 0 4px',
    },
  },
};

export default classes;
