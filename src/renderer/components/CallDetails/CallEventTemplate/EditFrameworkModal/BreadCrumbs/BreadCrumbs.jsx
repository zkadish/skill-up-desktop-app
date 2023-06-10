import React, { useState, useEffect } from 'react';
import { object, string, func } from 'prop-types';
import { Box } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import classes from './BreadCrumbs.styles';

function BreadCrumbs(props) {
  const {
    activeCall,
    activeFrameworkBlock,
    activeFrameworkBattleCard,
    setPath,
    path,
  } = props;
  const [pathLength, setPathLength] = useState(0);

  useEffect(() => {
    const { length } = path.split('/');
    setPathLength(length);
  }, [path]);

  const onClick = (pathname) => {
    setPath(pathname);
  };

  return (
    <Breadcrumbs
      sx={{ ...classes.root }}
      aria-label="breadcrumb"
      separator={<ArrowForwardIosIcon sx={{ ...classes.arrowIcon }} />}
    >
      {pathLength === 2 && (
        <Box sx={{ ...classes.inactive }}>
          {activeCall.frameworkTemplate.label}
        </Box>
      )}
      {pathLength >= 3 && (
        <Box onClick={() => onClick('/blocks')} sx={{ ...classes.active }}>
          {activeCall.frameworkTemplate.label}
        </Box>
      )}
      {activeFrameworkBlock && pathLength === 3 && (
        <Box sx={{ ...classes.inactive }}>{activeFrameworkBlock.label}</Box>
      )}
      {activeFrameworkBlock && pathLength === 4 && (
        <Box
          onClick={() => onClick('/blocks/battle-cards')}
          sx={{ ...classes.active }}
        >
          {activeFrameworkBlock.label}
        </Box>
      )}
      {activeFrameworkBattleCard && pathLength === 4 && (
        <Box sx={{ ...classes.inactive }}>
          {activeFrameworkBattleCard.label}
        </Box>
      )}
    </Breadcrumbs>
  );
}

BreadCrumbs.propTypes = {
  activeCall: object, // eslint-disable-line
  activeFrameworkBlock: object, // eslint-disable-line
  activeFrameworkBattleCard: object, // eslint-disable-line
  path: string, // eslint-disable-line
  setPath: func.isRequired, // eslint-disable-line
};

export default BreadCrumbs;
