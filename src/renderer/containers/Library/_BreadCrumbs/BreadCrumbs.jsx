import React, { useState, useEffect } from 'react';
import { object } from 'prop-types';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import styles from './BreadCrumbs.module.scss';
import scss from '../../../styles/_variables.module.scss';

const breadCrumbStyles = makeStyles({
  root: {
    '& .MuiBreadcrumbs-li': {
      maxWidth: '200px',
      fontSize: '16px',
      color: scss.TEXT_SECONDARY_DARK
    }
  }
});

const arrowStyles = makeStyles({
  root: {
    width: '16px'
  }
});

const BreadCrumbs = props => {
  const {
    activeTemplate,
    activeBlock,
    // activeElement,
    activeBattleCard,
    history
    // elements
  } = props;

  const breadCrumbClasses = breadCrumbStyles();
  const arrowClasses = arrowStyles();

  const [pathLength, setPathLength] = useState(0);

  useEffect(() => {
    const { length } = history.location.pathname.split('/');
    setPathLength(length);
  }, [history.location.pathname]);

  return (
    <Breadcrumbs
      separator={<ArrowForwardIosIcon className={arrowClasses.root} />}
      className={breadCrumbClasses.root}
      aria-label="breadcrumb"
    >
      {pathLength === 4 && <div className={styles.inactive}>TEMPLATES</div>}
      {pathLength >= 5 && (
        <Link to="/app/frameworks/templates" className={styles.active}>
          TEMPLATES
        </Link>
      )}

      {activeTemplate && pathLength === 5 && (
        <div className={styles.inactive}>{activeTemplate.label}</div>
      )}
      {activeTemplate && pathLength >= 6 && (
        <Link to="/app/frameworks/templates/blocks" className={styles.active}>
          {activeTemplate.label}
        </Link>
      )}

      {activeBlock && pathLength === 6 && (
        <div className={styles.inactive}>{activeBlock.label}</div>
      )}
      {activeBlock && pathLength >= 7 && (
        <Link
          to="/app/frameworks/templates/blocks/battle-cards"
          className={styles.active}
        >
          {activeBlock.label}
        </Link>
      )}

      {activeBattleCard && pathLength === 7 && (
        <div className={styles.inactive}>{activeBattleCard.label}</div>
      )}
    </Breadcrumbs>
  );
};

BreadCrumbs.propTypes = {
  activeBattleCard: object, // eslint-disable-line
  activeBlock: object, // eslint-disable-line
  // activeElement: object, // eslint-disable-line
  activeTemplate: object, // eslint-disable-line
  // elements: object, // eslint-disable-line
  history: object.isRequired // eslint-disable-line
};

export default BreadCrumbs;
