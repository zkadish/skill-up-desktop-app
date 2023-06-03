import { colors } from '../../styles/variables.styles';

const classes = {
  grow: {
    position: 'relative',
    flexGrow: 1,
    zIndex: 100,
  },
  appBar: {
    '&.MuiPaper-root': {
      backgroundColor: colors.BACKGROUND_SECONDARY,
    },
  },
  menuButton: {
    '&.MuiButtonBase-root': {
      padding: '0',
      margin: '0 14px 0 0',
      color: '#fff',
    },
  },
  menuIcon: {
    '&.MuiSvgIcon-root': {
      width: '36px',
      height: '36px',
    },
  },
  sectionDesktop: {
    display: 'flex',
    // [theme.breakpoints.up('md')]: {
    //   display: 'flex',
    // },
  },
  sectionMobile: {
    display: 'none',
    // display: 'flex',
    // [theme.breakpoints.up('md')]: {
    //   display: 'none',
    // },
  },
  profileMenuItem: {
    '&.MuiButtonBase-root': {
      display: 'block',
      padding: '6px 16px',
    },
  },
  callsButton: {
    '&.MuiButton-root': {
      width: '100px',
      color: '#fff',
      border: '1px solid rgba(255, 255, 255, .65)',
      marginRight: '16px',
    },
  },
  frameWorksButton: {
    '&.MuiButton-root': {
      width: '160px',
      color: '#fff',
      border: '1px solid rgba(255, 255, 255, .65)',
      marginRight: '16px',
    },
  },
  notificationBtn: {
    '&.MuiButtonBase-root': {
      padding: '12px',
    },
  },
  profileBtn: {
    '&.MuiButtonBase-root': {
      padding: '0',
      color: '#fff',
    },
  },
  profileIcon: {
    '&.MuiSvgIcon-root': {
      width: '36px',
      height: '36px',
    },
  },
};

export default classes;
