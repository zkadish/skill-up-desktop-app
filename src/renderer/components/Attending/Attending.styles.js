import { colors } from '../../styles/variables.styles';

const classes = {
  root: {
    display: 'flex',
    alignItems: 'center',
    height: '36px',
    '&:hover': {
      '& .MuiButtonBase-root': {
        display: 'block',
        height: '48px',
      },
    },
  },
  display: {
    display: 'none',
  },
  green: {
    color: colors.SUCCESS_PRIMARY,
    margin: '0 8px 0 0',
  },
  orange: {
    color: 'orange',
    margin: '0 8px 0 0',
  },
  red: {
    color: 'red',
    margin: '0 8px 0 0',
  },
  iconButton: {
    margin: '0 -12px 0 0',
    '&.MuiIconButton-root': {
      margin: '0 -12px 0 0',
      color: 'rgba(0, 0, 0, 0.54)',
      padding: '12px',
      borderRadius: '50%',
    },
  },
  attendeeDisplayName: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
};

export default classes;
