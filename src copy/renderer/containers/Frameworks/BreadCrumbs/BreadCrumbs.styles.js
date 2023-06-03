import { colors } from '../../../styles/variables.styles';

const classes = {
  root: {
    '& .MuiBreadcrumbs-li': {
      maxWidth: '200px',
      fontSize: '14px',
      color: colors.TEXT_SECONDARY_DARK,
    },
    '.inactive': {
      color: 'rgba(0, 0, 0, 0.54)',
      fontWeight: '500',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    '.active': {
      fontWeight: '500',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: 'block',
      maxWidth: '200px',
    },
  },
  arrow: {
    width: '16px',
  },
};

export default classes;
