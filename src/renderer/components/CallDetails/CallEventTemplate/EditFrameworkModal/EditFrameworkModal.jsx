/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import { func, object } from 'prop-types';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
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

function EditFrameworkModal(props) {
  const {
    activeCall,
    callEventModal,
    callEventInitState,
    setCallEventInitState,
    setCallEventModal,
    setFrameworkTemplate,
  } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const [isDirty, setIsDirty] = useState(false);
  const [path, setPath] = useState('/blocks');

  useEffect(() => {
    // console.log(location);
    // debugger;
    // navigate('/app/calls/templates/modal');
    setCallEventInitState(callEventModal.template);
  }, []);

  useEffect(() => {
    if (!callEventInitState || !callEventModal.template) return;
    const notDirty = isEqual(callEventModal.template, callEventInitState);
    setIsDirty(!isEqual(callEventModal.template, callEventInitState));
  }, [callEventModal, callEventInitState]);

  const handleClose = () => {
    setCallEventModal({ open: false });
    // navigate('/app/calls/templates/modal/blocks');
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
    // navigate('/app/calls/templates/modal/blocks');
  };

  return (
    <Paper sx={{ ...classes.root }}>
      <AppBar sx={{ ...classes.appBar }} position="static">
        <Box sx={{ ...classes.breadCrumbs }}>
          <BreadCrumbs path={path} setPath={setPath} />
          <IconButton onClick={handleClose} size="large">
            <CloseOutlinedIcon />
          </IconButton>
        </Box>
      </AppBar>
      <Box sx={{ ...classes.scrollContainer }}>
        {path === '/blocks' && <Blocks setPath={setPath} />}
        {path === '/blocks/elements' && <Elements setPath={setPath} />}
        {path === '/blocks/battle-cards' && <BattleCards setPath={setPath} />}
        {path === '/blocks/battle-cards/battle-card' && (
          <BattleCard setPath={setPath} />
        )}
        {/* <Routes> */}
        {/* <Route path="modal/blocks" element={<Blocks />} /> */}
        {/* <Route path="modal" element={<Blocks />} />
          <Route path="modal/blocks/elements" element={<Elements />} />
          <Route path="modal/blocks/battle-cards" element={<BattleCards />} />
          <Route
            path="modal/blocks/battle-cards/battle-card"
            element={<BattleCard />}
          />
        </Routes> */}
      </Box>
      <SaveCancel onCancel={onCancel} isDirty={isDirty} onSave={onSave} />
    </Paper>
  );
}

EditFrameworkModal.propTypes = {
  activeCall: object, // eslint-disable-line
  callEventModal: object, // eslint-disable-line
  callEventInitState: object, // eslint-disable-line
  setCallEventInitState: func.isRequired,
  setCallEventModal: func.isRequired,
  setFrameworkTemplate: func.isRequired,
};

export default EditFrameworkModal;
