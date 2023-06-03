import { colors } from '../../styles/variables.styles';

const classes = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
    backgroundColor: colors.BACKGROUND_PRIMARY_LIGHT,
    a: {
      color: colors.BLACK,
    },
    '.login': {
      maxWidth: '400px',
    },
    '.appName': {
      margin: '0 0 16px',
      fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
      fontSize: '3rem',
      fontWeight: '500',
      '&:nth-child(2)': {
        fontSize: '3.5rem',
      },
      svg: {
        position: 'relative',
        top: '20px',
        left: '-5px',
        width: '4.5rem',
        height: '4.5rem',
      },
    },
    '.loginOptions': {
      display: 'flex',
      justifyContent: 'center',
      margin: '0 0 24px',
      fontSize: '1rem',
      '&__rememberMe': {
        display: 'flex',
      },
    },
    '.signUp': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '0 0 24px',
      fontSize: '1rem',
      button: {
        textTransform: 'inherit',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
      },
    },
  },
  formControl: {
    width: '100%',
    margin: '0 0 5px',
  },
  loginBtn: {
    margin: '0 0 24px',
    height: '56px',
    fontSize: '1.4rem',
    textTransform: 'inherit',
    fontWeight: '400',
  },
  helperText: {
    display: 'inline-block',
    height: '22px',
    width: '100%',
    padding: '0 0 0 14px',
  },
};

export default classes;
