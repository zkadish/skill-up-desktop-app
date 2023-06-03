import { colors } from '../../../../../styles/variables.styles';

const classes = {
  createElements: {
    display: 'flex',
    alignItems: 'center',
    height: '36px',
    padding: '0 16px',
  },
  addInput: {
    '.MuiOutlinedInput-input': {
      padding: '8.5px 14px',
    },
    '&.Mui-error': {
      color: '#f44336',
    },
  },
  addInputIcon: {
    '&.MuiIconButton-root': {
      margin: '0 -12px 0 0',
      height: '48px',
      width: '48px',
      borderRadius: '50%',
      color: colors.BACKGROUND_SECONDARY,
    },
  },
  list: {
    padding: '16px 0 0 0',
  },
  listItem: {
    '&.MuiListItem-root': {
      minHeight: '64px',
      padding: '8px 16px',
      justifyContent: 'left',
    },
    '&:hover': {
      '.MuiIconButton-root': {
        display: 'block',
      },
    },
  },
  active: {
    '&.MuiButtonBase-root': {
      backgroundColor: 'rgba(0, 0, 0, 0.08)',
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.08)',
      },
    },
  },
  dragging: {
    '&.MuiButtonBase-root': {
      backgroundColor: 'rgba(63, 81, 181, .5)',
    },
  },
  textField: {
    '.MuiOutlinedInput-input': {
      padding: '8.5px 14px',
    },
    '.MuiInputBase-multiline': {
      padding: '0',
    },
    '&.MuiTextField-root': {
      margin: '10px 0',
      width: 'calc(100% - 108px)',
      fieldset: {
        borderColor: 'transparent',
      },
      '& .MuiFormLabel-root': {
        width: 'calc(100% - 28px)',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(0, 0, 0, 0)',
      },
    },
  },
  iconButton: {
    '&.MuiIconButton-root': {
      display: 'none',
      margin: '0 -12px 0 0',
      height: '48px',
      width: '48px',
      borderRadius: '50%',
      color: colors.BACKGROUND_SECONDARY,
    },
  },
  iconButtonDragging: {
    '&.MuiButtonBase-root': {
      display: 'block',
      margin: '0 -12px 0 0',
    },
  },
};

export default classes;
