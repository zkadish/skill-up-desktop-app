import { colors } from '../../styles/variables.styles';

const classes = {
  snackBar: {
    display: 'flex',
    alignItems: 'center',
    padding: '6px 16px',
    border: '1px solid rgba(255, 255, 255, .75)',
    borderRadius: '4px',
    boxShadow:
      '0 3px 5px -1px rgba(0,0,0,0.2), 0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12)',
    color: '#fff',
    fontSize: '0.875rem',
    fontWeight: '300',
    letterSpacing: '0.01071em',
    lineHeight: '1.43',
    '.snackBarIcon': {
      display: 'flex',
      opacity: '0.9',
      padding: '7px 0',
      fontSize: '22px',
      marginRight: '12px',
      color: '#fff',
    },
    '.closeIcon': {
      display: 'flex',
      opacity: '0.9',
      padding: '7px 0',
      fontSize: '22px',
      marginLeft: '12px',
      color: '#fff',
      cursor: 'pointer',
      background: 'none',
      border: 'none',
      outline: 'none',
    },
  },
  error: {
    backgroundColor: '#f44336',
  },
  warning: {
    backgroundColor: '#ff9800',
  },
  info: {
    backgroundColor: '#2196f3',
  },
  success: {
    backgroundColor: '#4caf50',
  },
};

export default classes;
