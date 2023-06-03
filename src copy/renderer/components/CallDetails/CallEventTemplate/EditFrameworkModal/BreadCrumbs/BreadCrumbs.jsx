import React, { useState, useEffect } from 'react';
import { object } from 'prop-types';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import classes from './BreadCrumbs.styles';

const BreadCrumbs = (props) => {
  const {
    activeCall,
    activeFrameworkBlock,
    // activeFrameworkElement,
    activeFrameworkBattleCard,
    history,
  } = props;

  const [pathLength, setPathLength] = useState(0);

  useEffect(() => {
    const { length } = history.location.pathname.split('/');
    setPathLength(length);
  }, [history.location.pathname]);

  return (
    <Breadcrumbs
      sx={{ ...classes.root }}
      aria-label="breadcrumb"
      separator={<ArrowForwardIosIcon sx={{ ...classes.arrowIcon }} />}
    >
      {pathLength === 6 && (
        <Box sx={{ ...classes.inactive }}>
          {activeCall.frameworkTemplate.label}
        </Box>
      )}
      {pathLength >= 7 && (
        <Link to="/app/calls/templates/modal/blocks" sx={{ ...classes.active }}>
          {activeCall.frameworkTemplate.label}
        </Link>
      )}
      {activeFrameworkBlock && pathLength === 7 && (
        <Box sx={{ ...classes.inactive }}>{activeFrameworkBlock.label}</Box>
      )}
      {activeFrameworkBlock && pathLength === 8 && (
        <Link
          to="/app/calls/templates/modal/blocks/battle-cards"
          sx={{ ...classes.active }}
        >
          {activeFrameworkBlock.label}
        </Link>
      )}
      {activeFrameworkBattleCard && pathLength === 8 && (
        <Box sx={{ ...classes.inactive }}>
          {activeFrameworkBattleCard.label}
        </Box>
      )}
    </Breadcrumbs>
  );
};

BreadCrumbs.propTypes = {
  activeCall: object, // eslint-disable-line
  activeFrameworkBlock: object, // eslint-disable-line
  // activeFrameworkElement: object, // eslint-disable-line
  activeFrameworkBattleCard: object, // eslint-disable-line
  history: object.isRequired // eslint-disable-line
};

export default BreadCrumbs;
