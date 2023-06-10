import React, { useState, useEffect } from 'react';
import { object } from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { Box, Breadcrumbs } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import classes from './BreadCrumbs.styles';

function BreadCrumbs(props) {
  const {
    activeTemplate,
    activeBlock,
    // activeElement,
    activeBattleCard,
    // elements
  } = props;
  const location = useLocation();
  const [pathLength, setPathLength] = useState(0);

  useEffect(() => {
    const { length } = location.pathname.split('/');
    setPathLength(length);
  }, [location.pathname]);

  return (
    <Breadcrumbs
      sx={{ ...classes.root }}
      separator={<ArrowForwardIosIcon sx={{ ...classes.arrow }} />}
      aria-label="breadcrumb"
    >
      {pathLength === 4 && <Box className="inactive">TEMPLATES</Box>}
      {pathLength >= 5 && (
        // <Link to="/app/frameworks/templates" className="active">
        <Link to="/app/frameworks" className="active">
          TEMPLATES
        </Link>
      )}

      {activeTemplate && pathLength === 5 && (
        <Box className="inactive">{activeTemplate.label}</Box>
      )}
      {activeTemplate && pathLength >= 6 && (
        <Link to="/app/frameworks/templates/blocks" className="active">
          {activeTemplate.label}
        </Link>
      )}

      {activeBlock && pathLength === 6 && (
        <Box className="inactive">{activeBlock.label}</Box>
      )}
      {activeBlock && pathLength >= 7 && (
        <Link
          to="/app/frameworks/templates/blocks/battle-cards"
          className="active"
        >
          {activeBlock.label}
        </Link>
      )}

      {activeBattleCard && pathLength === 7 && (
        <Box className="inactive">{activeBattleCard.label}</Box>
      )}
    </Breadcrumbs>
  );
}

BreadCrumbs.propTypes = {
  activeBattleCard: object, // eslint-disable-line
  activeBlock: object, // eslint-disable-line
  // activeElement: object, // eslint-disable-line
  activeTemplate: object, // eslint-disable-line
  // elements: object, // eslint-disable-line
};

export default BreadCrumbs;
