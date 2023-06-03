import { colors } from '../../../../styles/variables.styles';

const classes = {
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '600px',
    height: '484px',
    margin: '-242px 0 0 -300px',
    padding: '0px 0px 24px',
    borderRadius: '4px',
    outline: 'none',
  },
  appBar: {
    '&.MuiPaper-root': {
      position: 'relative',
      zIndex: '50',
      height: '56px',
      backgroundColor: 'white',
      borderRadius: '4px 4px 0 0',
    },
  },
  breadCrumbs: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 4px 0 16px',
    height: '56px',
    color: colors.TEXT_SECONDARY_DARK,
    fontSize: '20px',
    fontWeight: '500',
  },
  scrollContainer: {
    padding: '16px 0 0 0',
    height: '370px',
    overflow: 'auto',
  },
};

export default classes;
