import React, { useState, useEffect } from 'react';
import { object, func, array } from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import clsx from 'clsx';
import Paper from '@mui/material/Paper';
import Input from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { IconButton, List, ListItem, Box } from '@mui/material';

import TalkTrackLibrary from '../TalkTrackLibrary';
import { severity, dialog } from '../../../constants/notifications';
import { isEmpty, notUnique } from '../utils/validation';
import routes from '../../../constants/routes';
import { uuid } from '../../../utils/data';

import classes from './TalkTracks.styles';

const TalkTracks = (props) => {
  const {
    activeLibraryBattleCard,
    setActiveLibraryBattleCardTackTrack,
    // setActiveLibraryBattleCard,
    setBattleCardTalkTracks,
    setLibraryTalkTrack,
    addLibraryTalkTrack,
    removeBattleCardTalkTrack,
    activeBattleCardTalkTrack,
    setLibraryTalkTrackName,
    setAlert,
    setAlertDialog,
    talkTracks,
    history,
  } = props;

  const [newTalkTrack, setNewTalkTrack] = useState('');
  const [customInputValues, setCustomInputValues] = useState({});
  const [addInputError, setAddInputError] = useState(false);
  const [customInputError, setCustomInputError] = useState({});

  // useEffect(() => {
  //   if (!activeLibraryBattleCard?.['talk-tracks']) return;
  //   const found = activeLibraryBattleCard['talk-tracks'].find(e => e.active);
  //   if (found) setActiveLibraryBattleCardTackTrack(found);
  // }, []);

  // set customInput values
  useEffect(() => {
    if (!activeLibraryBattleCard) return;

    const talkTrackInputValues = activeLibraryBattleCard['talk-tracks'].reduce(
      (state, ele) => {
        return {
          ...state,
          [ele.id]: ele.value,
        };
      },
      {}
    );

    setCustomInputValues(talkTrackInputValues);
  }, [activeLibraryBattleCard]);

  const onChangeAddInput = (e) => {
    const { value } = e.target;
    if (notUnique(talkTracks, value)) {
      setAddInputError(false);
    }
    if (!notUnique(talkTracks, value)) {
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

    talkTrack.container_id = activeLibraryBattleCard.id;
    // setBattleCardTalkTrack(talkTrack, activeLibraryBattleCard);
    addLibraryTalkTrack(talkTrack, activeLibraryBattleCard);
    setCustomInputValues({
      ...customInputValues,
      [id]: talkTrackLabel,
    });
    setNewTalkTrack('');
  };

  const onKeyPressAddInput = (type) => (e) => {
    if (addInputError) return;
    if (e.key === 'Enter') onClickAddBtn();
  };

  const onClickListItem = (talkTrack) => () => {
    if (activeBattleCardTalkTrack?.id === talkTrack.id) return;
    setActiveLibraryBattleCardTackTrack(talkTrack);
  };

  // Change the name of the active BattleCardTalkTrack
  const onChangeCustomInput = (talkTrack) => (e) => {
    const { value } = e.target;
    debugger
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

    if (notUnique(activeLibraryBattleCard['talk-tracks'], value, talkTrack)) {
      setCustomInputError({
        ...customInputError,
        [talkTrack.id]: false,
      });
    }
    if (!notUnique(activeLibraryBattleCard['talk-tracks'], value, talkTrack)) {
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
    debugger
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
    setActiveLibraryBattleCardTackTrack(talkTrack);
    // alphabetizeLibraryTalkTracks();
  };

  const onKeyPressCustomInput = (talkTrack) => (e) => {
    if (customInputError[talkTrack.id]) return;
    if (e.key === 'Enter') {
      onBlurCustomInput(talkTrack)();
    }
  };

  const onDelete = (talkTrack) => {
    removeBattleCardTalkTrack(talkTrack, activeLibraryBattleCard);
    setAlertDialog({ open: false });
  };

  const onClickDeleteBtn = (talkTrack) => (e) => {
    e.stopPropagation();

    setAlertDialog({
      open: true,
      title: dialog.title.DELETE_CONFIRMATION,
      message: `Are you sure you want to delete the "${talkTrack.label}" element?`,
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
    const reorderedTalkTracks = [...activeLibraryBattleCard['talk-tracks']];
    const removedTalkTracks = reorderedTalkTracks.splice(source.index, 1)[0];
    reorderedTalkTracks.splice(destination.index, 0, removedTalkTracks);
    setBattleCardTalkTracks(reorderedTalkTracks, activeLibraryBattleCard);
  };

  const onMouseDownDragBtn = (talkTrack) => (e) => {
    e.stopPropagation();

    if (activeBattleCardTalkTrack) {
      const selected = document.getElementById(activeBattleCardTalkTrack.id);
      if (!selected) return;
      selected.blur();
    }
    setActiveLibraryBattleCardTackTrack(talkTrack);
  };

  const onClickBackBtn = () => {
    history.push(routes.LIBRARY_BATTLE_CARDS);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Paper sx={{ ...classes.paper }}>
        <Box sx={{ ...classes.createElements }}>
          <IconButton
            color="primary"
            sx={{ ...classes.backButton }}
            onClick={onClickBackBtn}
            disabled={addInputError}
            size="large"
          >
            <ArrowBackIosIcon sx={{ ...classes.backButtonIcon }} />
          </IconButton>
          <Input
            sx={{ ...classes.addInput }}
            placeholder={`Create a talk track for ${activeLibraryBattleCard?.label}...`}
            value={newTalkTrack}
            onChange={onChangeAddInput}
            onKeyPress={onKeyPressAddInput('talk-track')}
            error={addInputError}
            disabled={activeLibraryBattleCard?.system}
            fullWidth
          />
          <IconButton
            color="primary"
            sx={{ ...classes.iconButton }}
            onClick={onClickAddBtn}
            disabled={addInputError || activeLibraryBattleCard?.system}
            size="large"
          >
            <AddCircleIcon />
          </IconButton>
        </Box>
        <Droppable droppableId="talkTracks-1">
          {(provided) => (
            <List
              ref={provided.innerRef}
              {...provided.droppableProps}
              sx={{ ...classes.list }}
              component="nav"
              aria-label="Created templates"
            >
              {activeLibraryBattleCard?.['talk-tracks']?.map(
                (element, index) => {
                  return (
                    <Draggable
                      key={element.id}
                      draggableId={element.id}
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
                          onClick={onClickListItem(element)}
                          className={clsx(
                            'listItem',
                            { selected: element.active },
                            { active: element.active }
                          )}
                        >
                          <TextField
                            sx={{ ...classes.textField }}
                            id={element.id}
                            label={element.type.replace('-', ' ')}
                            value={customInputValues[element.id] || ''}
                            onChange={onChangeCustomInput(element)}
                            onBlur={onBlurCustomInput(element)}
                            onKeyPress={onKeyPressCustomInput(element)}
                            error={customInputError[element.id]}
                            variant="outlined"
                            multiline
                            disabled={element.system}
                          />
                          <IconButton
                            className="display"
                            sx={{ ...classes.iconButton }}
                            color="primary"
                            onClick={onClickDeleteBtn(element)}
                            disabled={activeLibraryBattleCard?.system}
                            size="large"
                          >
                            <DeleteIcon />
                          </IconButton>
                          <IconButton
                            {...provided.dragHandleProps}
                            className="display"
                            sx={{ ...classes.iconButton }}
                            color="primary"
                            onMouseDown={onMouseDownDragBtn(element)}
                            disabled={activeLibraryBattleCard?.system}
                            size="large"
                          >
                            <DragIndicatorIcon />
                          </IconButton>
                          {/* <IconButton
                            className={clsx(
                              { [styles.display]: !snapshot.isDragging },
                              iconButtonClasses.root,
                            )}
                            color="primary"
                            onClick={onClickMoreElement(element)}
                          >
                            <MoreVertIcon />
                          </IconButton> */}
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
      </Paper>
      <TalkTrackLibrary libraryOnly={false} />
    </DragDropContext>
  );
};

TalkTracks.propTypes = {
  addLibraryTalkTrack: func.isRequired,
  setLibraryTalkTrack: func.isRequired,
  activeLibraryBattleCard: object, // eslint-disable-line
  activeBattleCardTalkTrack: object, // eslint-disable-line
  setActiveLibraryBattleCardTackTrack: func.isRequired,
  setLibraryTalkTrackName: func.isRequired,
  setBattleCardTalkTracks: func.isRequired,
  removeBattleCardTalkTrack: func.isRequired,
  setAlert: func.isRequired,
  setAlertDialog: func.isRequired,
  history: object.isRequired, // eslint-disable-line
  talkTracks: array.isRequired, // eslint-disable-line
};

export default TalkTracks;
