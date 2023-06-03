/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import { func, object } from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { isEqual } from 'lodash';

import BreadCrumbs from './BreadCrumbs';
import Blocks from './Blocks';
import Elements from './Elements';
import BattleCards from './BattleCards';
import BattleCard from './BattleCard';
import SaveCancel from './SaveCancel';

import classes from './EditFrameworkModal.styles';

const EditFrameworkModal = (props) => {
  const {
    activeCall,
    callEventModal,
    callEventInitState,
    setCallEventInitState,
    setCallEventModal,
    setFrameworkTemplate,
    history,
  } = props;

  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    history.push('/app/calls/templates/modal/blocks');
    setCallEventInitState(callEventModal.template);
  }, []);

  useEffect(() => {
    if (!callEventInitState || !callEventModal.template) return;
    const notDirty = isEqual(callEventModal.template, callEventInitState);
    setIsDirty(!isEqual(callEventModal.template, callEventInitState));
  }, [callEventModal, callEventInitState]);

  const handleClose = () => {
    setCallEventModal({ open: false });
    history.push('/app/calls/templates/modal/blocks');
  };

  const onCancel = () => {
    if (!isDirty) {
      setCallEventModal({ open: false });
      return;
    }
    setCallEventModal({ template: callEventInitState });
  };

  const onSave = () => {
    setFrameworkTemplate(callEventModal.template, activeCall);
    setCallEventModal({ open: false });
    history.push('/app/calls/templates/modal/blocks');
  };

  return (
    <>
      <Paper sx={{ ...classes.root }}>
        <AppBar sx={{ ...classes.appBar }} position="static">
          <Box sx={{ ...classes.breadCrumbs }}>
            <BreadCrumbs />
            <IconButton onClick={handleClose} size="large">
              <CloseOutlinedIcon />
            </IconButton>
          </Box>
        </AppBar>
        <Box sx={{ ...classes.scrollContainer }}>
          <Switch>
            <Route
              exact
              path="/app/calls/templates/modal/blocks/battle-cards/battle-card"
            >
              <BattleCard />
            </Route>
            <Route exact path="/app/calls/templates/modal/blocks/battle-cards">
              <BattleCards />
            </Route>
            <Route exact path="/app/calls/templates/modal/blocks/elements">
              <Elements />
            </Route>
            <Route path="/app/calls/templates/modal/blocks">
              <Blocks />
            </Route>
          </Switch>
        </Box>
        <SaveCancel onCancel={onCancel} isDirty={isDirty} onSave={onSave} />
      </Paper>
    </>
  );
};

EditFrameworkModal.propTypes = {
  activeCall: object, // eslint-disable-line
  callEventModal: object, // eslint-disable-line
  callEventInitState: object, // eslint-disable-line
  history: object, // eslint-disable-line
  setCallEventInitState: func.isRequired,
  setCallEventModal: func.isRequired,
  setFrameworkTemplate: func.isRequired,
};

export default EditFrameworkModal;
