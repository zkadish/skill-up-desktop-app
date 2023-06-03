import { colors, spacing } from '../../styles/variables.styles';

const classes = {
  card: {
    position: 'relative',
    // minWidth: 275,
    margin: '0 16px 16px',
    background: colors.BACKGROUND_PRIMARY,
    '&:hover': {
      // background: scss.WHITE,
      border: `1px solid rgba(63, 81, 181, .5)`,
    },
    '&:last-child': {
      margin: '0 16px 0',
    },
  },
  active: {
    background: 'rgba(63, 81, 181, .05)',
    border: '1px solid rgba(63, 81, 181, .5)',
    boxShadow:
      '0px 2px 4px -1px rgba(0,0,0,0.1), 0px 4px 5px 0px rgba(0,0,0,0.07), 0px 1px 10px 0px rgba(0,0,0,0.06)',
  },
  launchBtn: {
    '&.MuiButtonGroup-root': {
      background: '#fff',
      margin: `0 0 ${spacing.XS}`,
    },
    '& .MuiButton-outlined': {
      padding: '7px',
    },
    '& .MuiButton-root': {
      fontSize: '12px',
      lineHeight: 0,
      '&:hover': {
        background: 'rgba(63, 81, 181, .05)',
      },
    },
  },
  launchBtnIcon: {
    transform: 'rotate(-90deg)',
  },
};

export default classes;
