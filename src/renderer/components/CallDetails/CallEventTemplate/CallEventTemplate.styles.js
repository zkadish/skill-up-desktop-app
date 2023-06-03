import { colors } from '../../../styles/variables.styles';

const classes = {
  header: {
    '&.MuiPaper-root': {
      position: 'relative',
      zIndex: '10',
      padding: '8px 16px 16px',
      borderRadius: 0,
    },
  },
  select: {
    margin: '12px 0 0',
    minWidth: '300px',
  },
  selectOption: {
    '&.MuiMenuItem-root': {
      display: 'flex',
    },
  },
  editBtn: {
    '&.MuiButtonBase-root': {
      position: 'relative',
      top: '6px',
      margin: '0 0 0 6px',
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      color: colors.BACKGROUND_SECONDARY,
    },
  },
  addBtn: {
    '&.MuiButtonBase-root': {
      position: 'relative',
      top: '6px',
      left: '-14px',
      margin: '0 0 0 4px',
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      color: colors.BACKGROUND_SECONDARY,
    },
  },
  accordion: {
    margin: '8px',
    background: '#fff',
    border: '1px solid #ccc',
    borderRadius: '4px',
    '& .MuiButtonBase-root': {
      display: 'flex',
      padding: '0 16px',
    },
    '&::before': {
      backgroundColor: 'transparent',
    },
    '&.Mui-expanded': {
      margin: '8px',
      '&:firstChild': {
        marginTop: '8px',
      },
    },
    '& .MuiAccordionSummary-content': {
      '&.Mui-expanded': {
        margin: 0,
      },
    },
  },
  summery: {
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
      margin: '0',
      padding: '0',
      '& > p': {
        fontSize: '15px',
        fontWeight: '500',
      },
    },
  },
  heading: {
    fontSize: '15px',
    fontWeight: 500,
  },
  details: {
    '&.MuiAccordionDetails-root': {
      flexDirection: 'column',
      padding: '0 16px 8px',
    },
  },
  formControl: {
    width: '100%',
    margin: '0',
    height: '36px',
  },
  checkBox: {
    '&.MuiCheckbox-root': {
      width: '48px',
      height: '48px',
      borderRadius: '50%',
    },
  },
  callTemplate: {
    padding: '8px',
    height: 'calc(100vh - 216px)',
    overflow: 'auto',
    '.block': {
      display: 'flex',
    },
    '.research': {
      width: '50%',
    },
    '.question': {
      padding: '8px 0 8px 4px',
      fontWeight: '500',
    },
    '.actionItems': {
      flex: '1',
    },
    '.actions': {
      display: 'flex',
      justifyContent: 'flex-end',
    },
  },
  attendee: {
    display: 'flex',
    alignItems: 'center',
    height: '36px',
    '&:hover': {
      '& .MuiButtonBase-root': {
        display: 'block',
      },
    },
    '.green': {
      color: colors.SUCCESS_PRIMARY,
      margin: '0 8px 0 0',
    },
    '.red': {
      color: 'red',
      margin: '0 8px 0 0',
    },
    '.orange': {
      color: 'orange',
      margin: '0 8px 0 0',
    },
    '.iconButton': {
      display: 'none',
      margin: '0 -12px 0 0',
      width: '48px',
      height: '48px',
      borderRadius: '50%',
    },
  },
  textField: {
    margin: '10px 0',
    '& .MuiOutlinedInput-root': {
      padding: 0,
    },
    '& .MuiFormLabel-root': {
      width: 'calc(100% - 28px)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  },
  answerField: {
    margin: '0 0 8px',
    '& .MuiOutlinedInput-root': {
      padding: 0,
    },
    '& .MuiFormLabel-root': {
      width: 'calc(100% - 28px)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  },
  talkTrack: {
    display: 'flex',
    padding: '6px 0',
    '.bullet': {
      svg: {
        position: 'relative',
        top: '1px',
        left: '-1px',
        width: '12px',
        height: '12px',
      },
    },
    '.text': {
      padding: '0 0 0 3px',
    },
  },
};

export default classes;
