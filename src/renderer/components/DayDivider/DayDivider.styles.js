import { colors } from '../../styles/variables.styles';

const classes = {
  container: {
    position: 'relative',
    height: '48px',
    '.divider': {
      position: 'absolute',
      top: '12px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      height: '24px',
      width: '100%',
    },
    '.day': {
      position: 'absolute',
      top: '12px',
      width: '100%',
      textAlign: 'center',
      span: {
        padding: '0 12px',
        color: colors.TEXT_SECONDARY_DARK,
        lineHeight: '1.5',
        fontSize: '16px',
        fontWeight: '500',
      },
      '.white': {
        backgroundColor: colors.WHITE,
      },
      '.lightgrey': {
        backgroundColor: colors.BACKGROUND_PRIMARY,
      },
    },
  },
};

export default classes;
