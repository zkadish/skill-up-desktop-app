import { colors } from '../../../../../styles/variables.styles';

const classes = {
  root: {
    '&.MuiBreadcrumbs-li': {
      maxWidth: '200px',
      fontSize: '16px',
      color: colors.TEXT_SECONDARY_DARK,
    },
  },
  arrowIcon: {
    width: '16px',
  },
  inactive: {
    color: 'rgba(0, 0, 0, 0.54)',
    fontWeight: '500',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  active: {
    fontWeight: '500',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  inactiveArrow: {
    marginRight: '8px',
    marginLeft: '8px',
  },
};

export default classes;
