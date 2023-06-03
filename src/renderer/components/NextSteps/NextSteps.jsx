import React from 'react';
// import shortid from 'shortid';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';

import styles from './NextSteps.module.scss';

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600]
    }
  },
  checked: {}
})(props => <Checkbox color="default" {...props} />); // eslint-disable-line

const paperStyles = makeStyles(() => ({
  root: {
    padding: '8px 16px 0',
    margin: '8px',
    border: '1px solid #ccc',
    boxShadow: 'none'
  }
}));

const titleStyles = makeStyles(() => ({
  root: {
    margin: '0 0 8px 4px',
    fontWeight: 500
  }
}));

const NextSteps = () => {
  const [recCheckState, setRecCheckState] = React.useState({
    checkRecLinkedIn: true,
    checkRecDocumentation: false,
    checkRecCallBack: false
  });

  const paperClasses = paperStyles();
  const titleClasses = titleStyles();

  const onRecCheckboxChange = event => {
    setRecCheckState({
      ...recCheckState,
      [event.target.name]: event.target.checked
    });
  };

  // TODO: dynamically generate the JSX output for this component
  return (
    <Paper className={paperClasses.root}>
      <Typography className={titleClasses.root}>
        RECOMMENDED NEXT STEPS
      </Typography>
      <div>
        <FormControlLabel
          control={(
            <GreenCheckbox
              checked={recCheckState.checkRecLinkedIn}
              onChange={onRecCheckboxChange}
              name="checkRecLinkedIn"
            />
          )}
          label="Connect on LinkedIn"
        />
      </div>
      <div>
        <FormControlLabel
          control={(
            <GreenCheckbox
              checked={recCheckState.checkRecDocumentation}
              onChange={onRecCheckboxChange}
              name="checkRecDocumentation"
            />
          )}
          label="Send documentation"
        />
      </div>
      <div>
        <FormControlLabel
          control={(
            <GreenCheckbox
              checked={recCheckState.checkRecCallBack}
              onChange={onRecCheckboxChange}
              name="checkRecCallBack"
            />
          )}
          label="Call back ask about timeline"
        />
      </div>
    </Paper>
  );
};

export default NextSteps;
