import { colors } from '../../styles/variables.styles';

const classes = {
  titleBar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '22px',
    boxSizing: 'border-box',
    webkitAppRegion: 'drag',
    backgroundColor: `${colors.BACKGROUND_PRIMARY}`,
    fontSize: '14px',
    color: 'rgba(0, 0, 0, 0.5)',
  },
  duration: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '56px',
    backgroundColor: 'rgba(63, 81, 181, 1)',
    border: '1px solid rgba(0, 0, 0, 0.5)',
    borderWidth: '1px 1px 0',
    textAlign: 'center',
    color: 'white',
    letterSpacing: '2px',
    fontSize: '20px',
  },
  callEventTemplate: {
    height: 'calc(100vh - 78px)',
    borderRadius: '0 0 6px 6px',
    overflow: 'auto',
    backgroundColor: 'rgba(63, 81, 181, 0.75)',
  },
};

export default classes;
