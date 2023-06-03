import React, { useState, useEffect } from 'react';
import { object, func } from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import clsx from 'clsx';
import Paper from '@mui/material/Paper';
import Input from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Box, IconButton, List, ListItem } from '@mui/material';

import TalkTrackLibrary from '../TalkTrackLibrary';
import { severity, dialog } from '../../../constants/notifications';
import { isEmpty, notUnique } from '../utils/validation';
import { uuid } from '../../../utils/data';

import classes from './BattleCard.styles';

const BattleCard = (props) => {
  const {
    activeTemplate,
    // activeElement,
    activeBattleCard,
    activeBattleCardTalkTrack,
    setActiveBattleCardTalkTrack,
    setBattleCardTalkTracks,
    // setBattleCardTalkTrack,
    removeBattleCardTalkTrack,
    // setBattleCardTalkTrackName,
    // alphabetizeLibraryTalkTracks,
    setLibraryTalkTrackName,
    setLibraryTalkTrack,
    addLibraryTalkTrack,
    setAlert,
    setAlertDialog,
  } = props;

  const [newTalkTrack, setNewTalkTrack] = useState('');
  const [customInputValues, setCustomInputValues] = useState({});
  const [addInputError, setAddInputError] = useState(false);
  const [customInputError, setCustomInputError] = useState({});

  // set customInput values
  useEffect(() => {
    if (!activeBattleCard) return;

    const talkTrackInputValues = activeBattleCard['talk-tracks'].reduce(
      (state, ele) => {
        return {
          ...state,
          [ele.id]: ele.value,
        };
      },
      {}
    );

    setCustomInputValues(talkTrackInputValues);
  }, [activeBattleCard]);

  const onChangeAddInput = (e) => {
    const { value } = e.target;

    if (notUnique(activeBattleCard['talk-tracks'], value)) {
      setAddInputError(false);
    }
    if (!notUnique(activeBattleCard['talk-tracks'], value)) {
      setAlert({
        open: true,
        duration: 5000,
        severity: severity.ERROR,
        message: `Talk tracks must be unique, "${value.slice(
          0,
          20
        )}..." already exists.`,
      });
      setAddInputError(true);
      setNewTalkTrack(value);
      return; // can't have 2 templates of the same name
    }

    setNewTalkTrack(value);
  };

  const onClickAddBtn = () => {
    const talkTrackLabel = newTalkTrack.trim();

    if (isEmpty(talkTrackLabel)) return;

    const id = uuid();
    const talkTrack = {
      id,
      corporate_id: null,
      account_id: '',
      library_id: uuid(),
      type: 'talk-track',
      label: talkTrackLabel,
      value: talkTrackLabel,
      active: false,
      system: false,
    };

    setLibraryTalkTrack(talkTrack);

    talkTrack.container_id = activeBattleCard.id;
    // setBattleCardTalkTrack(talkTrack, activeBattleCard);
    addLibraryTalkTrack(talkTrack, activeBattleCard);
    setCustomInputValues({
      ...customInputValues,
      [id]: talkTrackLabel,
    });
    setNewTalkTrack('');
  };

  const onKeyPressAddInput = (e) => {
    if (addInputError) return;
    if (e.key === 'Enter') onClickAddBtn();
  };

  const onClickListItem = (talkTrack) => () => {
    if (activeBattleCardTalkTrack?.id === talkTrack.id) return;
    setActiveBattleCardTalkTrack(talkTrack);
  };

  // Change the name of the active BattleCardTalkTrack
  const onChangeCustomInput = (talkTrack) => (e) => {
    const { value } = e.target;

    if (value) {
      setCustomInputError({
        ...customInputError,
        [talkTrack.id]: false,
      });
    }
    if (value === '') {
      setAlert({
        open: true,
        duration: 5000,
        severity: severity.ERROR,
        message: `Talk track elements must have a track.`,
      });
      setCustomInputError({
        ...customInputError,
        [talkTrack.id]: true,
      });
      setCustomInputValues({
        ...customInputValues,
        [talkTrack.id]: value,
      });
      return;
    }

    if (notUnique(activeBattleCard['talk-tracks'], value, talkTrack)) {
      setCustomInputError({
        ...customInputError,
        [talkTrack.id]: false,
      });
    }
    if (!notUnique(activeBattleCard['talk-tracks'], value, talkTrack)) {
      setAlert({
        open: true,
        duration: 5000,
        severity: severity.ERROR,
        message: `Element names must be unique, "${value}" already exists.`,
      });
      setCustomInputError({
        ...customInputError,
        [talkTrack.id]: true,
      });
      // return; // can't have 2 templates of the same name
    }

    setCustomInputValues({
      ...customInputValues,
      [talkTrack.id]: e.target.value,
    });
  };

  const onBlurCustomInput = (tt) => () => {
    const talkTrack = { ...tt };
    if (customInputError[talkTrack.id]) {
      setCustomInputValues({
        ...customInputValues,
        [talkTrack.id]: talkTrack.value,
      });
      setCustomInputError({
        ...customInputError,
        [talkTrack.id]: false,
      });
      return;
    }

    const newValue = customInputValues[talkTrack.id].trim();
    if (newValue === activeBattleCardTalkTrack?.value) return;

    talkTrack.value = customInputValues[talkTrack.id];
    talkTrack.label = customInputValues[talkTrack.id];
    talkTrack.active = true;

    // setBattleCardTalkTrackName(talkTrack);
    setLibraryTalkTrackName(talkTrack);
    setActiveBattleCardTalkTrack(talkTrack);
    // alphabetizeLibraryTalkTracks();
  };

  const onKeyPressCustomInput = (talkTrack) => (e) => {
    if (customInputError[talkTrack.id]) return;
    if (e.key === 'Enter') {
      onBlurCustomInput(talkTrack)();
    }
  };

  const onDelete = (talkTrack) => {
    removeBattleCardTalkTrack(talkTrack, activeBattleCard);
    setAlertDialog({ open: false });
  };

  const onClickDeleteBtn = (talkTrack) => (e) => {
    e.stopPropagation();

    setAlertDialog({
      open: true,
      title: dialog.title.DELETE_CONFIRMATION,
      message: `Are you sure you want to delete the "${talkTrack.label}" talk track?`,
      type: dialog.type.DELETE,
      action: () => onDelete(talkTrack),
    });
  };

  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const reorderedTalkTracks = [...activeBattleCard['talk-tracks']];
    const removedTalkTracks = reorderedTalkTracks.splice(source.index, 1)[0];
    reorderedTalkTracks.splice(destination.index, 0, removedTalkTracks);
    setBattleCardTalkTracks(reorderedTalkTracks, activeBattleCard);
  };

  const onMouseDownDragBtn = (talkTrack) => (e) => {
    e.stopPropagation();

    if (activeBattleCardTalkTrack) {
      const selected = document.getElementById(activeBattleCardTalkTrack.id);
      if (!selected) return;
      selected.blur();
    }
    setActiveBattleCardTalkTrack(talkTrack);
  };

  return (
    <>
      {activeBattleCard && (
        <>
          <Paper sx={{ ...classes.paper }}>
            <Box sx={{ ...classes.createElements }}>
              <Input
                sx={{ ...classes.addInput }}
                placeholder={`Create talk tracks for "${activeBattleCard.label}"...`}
                value={newTalkTrack}
                onChange={onChangeAddInput}
                onKeyPress={onKeyPressAddInput}
                error={addInputError}
                fullWidth
                disabled={activeTemplate?.system}
              />
              <IconButton
                color="primary"
                sx={{ ...classes.iconButton }}
                onClick={onClickAddBtn}
                disabled={addInputError || activeTemplate?.system}
                size="large"
              >
                <AddCircleIcon />
              </IconButton>
            </Box>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="3">
                {(provided) => (
                  <List
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    sx={{ ...classes.list }}
                    component="nav"
                    aria-label="Created templates"
                  >
                    {activeBattleCard?.['talk-tracks'].map(
                      (talkTrack, index) => {
                        return (
                          <Draggable
                            key={talkTrack.id}
                            draggableId={talkTrack.id}
                            index={index}
                          >
                            {(provided, snapshot) => ( // eslint-disable-line
                                // eslint-disable-line
                              <ListItem
                                {...provided.draggableProps}
                                ref={provided.innerRef}
                                button
                                aria-controls="template-menu"
                                aria-label="when device is locked"
                                onClick={onClickListItem(talkTrack)}
                                className={clsx(
                                  'listItem',
                                  { active: talkTrack.active },
                                  { dragging: snapshot.isDragging }
                                )}
                              >
                                <TextField
                                  sx={{ ...classes.textField }}
                                  id={talkTrack.id}
                                  label={talkTrack.type.replace('-', ' ')}
                                  value={customInputValues[talkTrack.id] || ''}
                                  onChange={onChangeCustomInput(talkTrack)}
                                  onBlur={onBlurCustomInput(talkTrack)}
                                  onKeyPress={onKeyPressCustomInput(talkTrack)}
                                  error={customInputError[talkTrack.id]}
                                  variant="outlined"
                                  multiline
                                  disabled={talkTrack.system}
                                />
                                <IconButton
                                  className={clsx({
                                    display: !snapshot.isDragging,
                                  })}
                                  sx={{ ...classes.iconButton }}
                                  color="primary"
                                  onClick={onClickDeleteBtn(talkTrack)}
                                  disabled={activeTemplate.system}
                                  size="large"
                                >
                                  <DeleteIcon />
                                </IconButton>
                                <IconButton
                                  {...provided.dragHandleProps}
                                  className={clsx({
                                    display: !snapshot.isDragging,
                                  })}
                                  sx={{ ...classes.iconButton }}
                                  color="primary"
                                  onMouseDown={onMouseDownDragBtn(talkTrack)}
                                  disabled={activeTemplate.system}
                                  size="large"
                                >
                                  <DragIndicatorIcon />
                                </IconButton>
                              </ListItem>
                            )}
                          </Draggable>
                        );
                      }
                    )}
                    {provided.placeholder}
                  </List>
                )}
              </Droppable>
            </DragDropContext>
          </Paper>
          <TalkTrackLibrary libraryOnly={false} />
        </>
      )}
    </>
  );
};

BattleCard.propTypes = {
  activeTemplate: object, // eslint-disable-line
  setLibraryTalkTrackName: func.isRequired,
  addLibraryTalkTrack: func.isRequired,
  setLibraryTalkTrack: func.isRequired,
  activeBattleCard: object, // eslint-disable-line
  activeBattleCardTalkTrack: object, // eslint-disable-line
  setBattleCardTalkTracks: func.isRequired,
  // setBattleCardTalkTrack: func.isRequired,
  removeBattleCardTalkTrack: func.isRequired,
  // setBattleCardTalkTrackName: func.isRequired,
  setActiveBattleCardTalkTrack: func.isRequired,
  setAlert: func.isRequired,
  setAlertDialog: func.isRequired,
};

export default BattleCard;
