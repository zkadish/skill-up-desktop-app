import React from 'react';
import { object } from 'prop-types';
import makeStyles from '@mui/styles/makeStyles';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Attending from '../../Attending';

const accordionStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    background: '#fff',
    // border: '1px solid rgba(63, 81, 181, .5)',
    border: '1px solid rgba(0, 0, 0, 0.23)',
    borderRadius: '4px',
    '&::before': {
      backgroundColor: 'transparent',
    },
    '&.Mui-expanded': {
      margin: 0,
      // border: '1px solid red'
    },
    '& .MuiAccordionSummary-content': {
      '&.Mui-expanded': {
        margin: 0,
        // border: '1px solid red'
      },
    },
  },
  rootSummary: {
    '&.Mui-expanded': {
      margin: 0,
      minHeight: '36px',
      '& .MuiExpansionPanelSummary-content': {
        '&.Mui-expanded': {
          margin: 0,
        },
      },
    },
    minHeight: '36px',
    '& > div': {
      margin: '0',
      padding: '0',
      '& > p': {
        fontSize: '0.875rem',
        // color: 'rgba(63, 81, 181, 1)',
        fontWeight: '500',
      },
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  flex: {
    flexDirection: 'column',
    padding: '8px 16px 16px',
  },
}));

const AccordionWrapper = (props) => {
  const { event } = props;

  const accordionClasses = accordionStyles();

  const handleChange = (e) => {
    e.stopPropagation();
  };

  return (
    <Accordion
      className={accordionClasses.root}
      onChange={handleChange}
      elevation={0}
      sx={{
        '&.MuiAccordion-root.Mui-expanded': {
          margin: '0',
        },
        '&.MuiAccordion-rounded': {
          borderRadius: '4px',
          '.MuiAccordionSummary-root': {
            minHeight: '36px',
            display: 'flex',
            padding: '0px 16px',
          },
        },
      }}
    >
      <AccordionSummary
        className={accordionClasses.rootSummary}
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={accordionClasses.heading}>ATTENDEES</Typography>
      </AccordionSummary>
      <AccordionDetails className={accordionClasses.flex}>
        <Attending event={event} />
      </AccordionDetails>
    </Accordion>
  );
};

AccordionWrapper.propTypes = {
  event: object.isRequired, // eslint-disable-line
};

export default AccordionWrapper;
