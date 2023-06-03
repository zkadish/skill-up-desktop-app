import { colors } from '../../styles/variables.styles';

const classes = {
  container: {
    display: 'flex',
    height: 'calc(100vh - 64px)',
    '.leftCol': {
      padding: '16px',
      width: '30%',
      minWidth: '360px',
      overflow: 'hidden',
      borderWidth: '0 1px 0 0',
    },
    '.salesCoach': {
      height: 'calc(100vh - 96px)',
      boxSizing: 'border-box',
      border: '1px solid #ccc',
      borderRadius: '6px',
    },
    '.titleBar': {
      height: '22px',
      padding: ' 0 16px',
      boxSizing: 'border-box',
      borderRadius: '6px 6px 0 0',
      fontSize: '14px',
      color: 'rgba(0, 0, 0, 0.5)',
      lineHeight: '22px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      textAlign: 'center',
    },
    '.duration': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '56px',
      backgroundColor: 'rgba(63, 81, 181, 1)',
      border: '1px solid rgba(0, 0, 0, 0.5)',
      borderWidth: '1px 0 0',
      textAlign: 'center',
      color: 'white',
      letterSpacing: '2px',
      fontSize: '20px',
    },
    '.callFramework': {
      height: 'calc(100vh - 174px)',
      borderRadius: '0 0 6px 6px',
      overflow: 'auto',
      backgroundColor: 'rgba(63, 81, 181, 0.75)',
    },
    '.rightCol': {
      position: 'relative',
      width: '100%',
      '.breadCrumbs': {
        padding: '12px 16px',
        color: colors.TEXT_SECONDARY_DARK,
        fontSize: '20px',
        fontWeight: '500',
        '& ol': {
          height: '24px',
        },
      },
    },
  },
  appBar: {
    position: 'relative',
    zIndex: '50',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: '48px',
    backgroundColor: 'white',
    borderRadius: '0',
  },
  paper: {
    display: 'flex',
    padding: '8px 8px 0',
    height: 'calc(100vh - 112px)',
    borderRadius: 0,
    overflow: 'auto',
  },
};

export default classes;
