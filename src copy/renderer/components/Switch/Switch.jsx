import React, { useCallback } from 'react';
import { string } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CoreSwitch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';

const CustomSwitch = withStyles(theme => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex'
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    '&$checked': {
      transform: 'translateX(12px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        // backgroundColor: 'rgba(255, 255, 255, .3)',
        borderColor: theme.palette.primary.main
      }
    }
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none'
  },
  track: {
    height: 'initial',
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white
  },
  checked: {}
}))(CoreSwitch);

const Switch = props => {
  const { className } = props;
  const [checked, setState] = React.useState(false);

  const handleChange = useCallback(() => {
    setState(!checked);
  }, [checked]);

  return (
    <Typography component="div">
      <CustomSwitch
        className={className}
        checked={checked}
        onChange={handleChange}
        value="checkedC"
      />
    </Typography>
  );
};

Switch.propTypes = {
  className: string // eslint-disable-line
};

Switch.defaultProps = {
  className: ''
};

export default Switch;
