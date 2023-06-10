import React, { useState, useEffect } from 'react';
import { object, func } from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Input from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Box, IconButton, List, ListItem } from '@mui/material';

import { severity, dialog } from '../../../../../constants/notifications';
import {
  isEmpty,
  notUnique,
  isAllowedChar,
} from '../../../../../containers/Frameworks/utils/validation';
import { uuid } from '../../../../../utils/data';

import classes from './BattleCard.styles';

function BattleCard(props) {
  const {
    activeFrameworkBattleCard,
    activeFrameworkBattleCardTalkTrack,
    setActiveFrameworkBattleCardTalkTrack,
    setFrameworkBattleCardTalkTracks,
    setFrameworkBattleCardTalkTrack,
    setFrameworkBattleCardTalkTrackName,
    removeFrameworkBattleCardTalkTrack,
    setAlert,
    setAlertDialog,
    // setPath,
  } = props;

  const [newElementName, setNewElementName] = useState('');
  const [customInputValues, setCustomInputValues] = useState({});
  const [addInputError, setAddInputError] = useState(false);
  const [customInputError, setCustomInputError] = useState({});

  useEffect(() => {
    if (!activeFrameworkBattleCard) return;
    const found = activeFrameworkBattleCard['talk-tracks'].find(
      (talkTrack) => talkTrack.active
    );

    if (found) setActiveFrameworkBattleCardTalkTrack(found);
  }, []);

  // set customInput values
  useEffect(() => {
    if (!activeFrameworkBattleCard) return;

    const talkTrackInputValues = activeFrameworkBattleCard[
      'talk-tracks'
    ].reduce((state, talkTrack) => {
      return {
        ...state,
        [talkTrack.id]: talkTrack.value,
      };
    }, {});

    setCustomInputValues(talkTrackInputValues);
  }, [activeFrameworkBattleCard]);

  const onChangeAddInput = (e) => {
    const { value } = e.target;
    if (isAllowedChar(value)) setAddInputError(false);
    if (!isAllowedChar(value)) {
      setAlert({
        open: true,
        duration: 5000,
        severity: severity.ERROR,
        message: `Elements names may only contain letters, numbers, dashes, underscores or periods.`,
      });
      setAddInputError(true);
      setNewElementName(value);
      return;
    }

    if (notUnique(activeFrameworkBattleCard['talk-tracks'], value)) {
      setAddInputError(false);
    }
    if (!notUnique(activeFrameworkBattleCard['talk-tracks'], value)) {
      setAlert({
        open: true,
        duration: 5000,
        severity: severity.ERROR,
        message: `Template names must be unique, "${value}" already exists.`,
      });
      setAddInputError(true);
      setNewElementName(value);
      return; // can't have 2 templates of the same name
    }

    setNewElementName(value);
  };

  const onClickAddBtn = (type) => () => {
    const cleanValue = newElementName.trim();
    if (isEmpty(cleanValue)) return;

    const id = uuid();
    setFrameworkBattleCardTalkTrack({
      id,
      corporate_id: null,
      account_id: '',
      container_id: '',
      library_id: uuid(),
      label: cleanValue,
      value: cleanValue,
      type,
      active: false,
      system: false,
    });
    setCustomInputValues({
      ...customInputValues,
      [id]: cleanValue,
    });
    setNewElementName('');
  };

  const onKeyPressAddInput = (type) => (e) => {
    if (addInputError) return;
    if (e.key === 'Enter') onClickAddBtn(type)();
  };

  const onClickListItem = (talkTrack) => () => {
    // debugger
    if (activeFrameworkBattleCardTalkTrack?.id === talkTrack.id) return;
    setActiveFrameworkBattleCardTalkTrack(talkTrack);
  };

  // change the name of the active element
  const onChangeCustomInput = (element) => (e) => {
    const { value } = e.target;

    if (value) {
      setCustomInputError({
        ...customInputError,
        [element.id]: false,
      });
    }
    if (value === '') {
      setAlert({
        open: true,
        duration: 5000,
        severity: severity.ERROR,
        message: `Elements must have a name.`,
      });
      setCustomInputError({
        ...customInputError,
        [element.id]: true,
      });
      setCustomInputValues({
        ...customInputValues,
        [element.id]: value,
      });
      return;
    }

    if (isAllowedChar(value)) {
      setCustomInputError({
        ...customInputError,
        [element.id]: false,
      });
    }
    if (!isAllowedChar(value)) {
      setAlert({
        open: true,
        duration: 5000,
        severity: severity.ERROR,
        message: `Element names may only contain letters, numbers, dashes, underscores or periods.`,
      });
      setCustomInputError({
        ...customInputError,
        [element.id]: true,
      });
      setCustomInputValues({
        ...customInputValues,
        [element.id]: value,
      });
      return;
    }

    if (notUnique(activeFrameworkBattleCard['talk-tracks'], value, element)) {
      setCustomInputError({
        ...customInputError,
        [element.id]: false,
      });
    }
    if (!notUnique(activeFrameworkBattleCard['talk-tracks'], value, element)) {
      setAlert({
        open: true,
        duration: 5000,
        severity: severity.ERROR,
        message: `Element names must be unique, "${value}" already exists.`,
      });
      setCustomInputError({
        ...customInputError,
        [element.id]: true,
      });
    }

    setCustomInputValues({
      ...customInputValues,
      [element.id]: e.target.value,
    });
  };

  const onBlurCustomInput = (ele) => () => {
    const element = { ...ele };
    if (customInputError[element.id]) {
      setCustomInputValues({
        ...customInputValues,
        [element.id]: element.value,
      });
      setCustomInputError({
        ...customInputError,
        [element.id]: false,
      });
      return;
    }

    const newValue = customInputValues[element.id].trim();
    if (newValue === activeFrameworkBattleCard?.value) return;
    element.value = customInputValues[element.id];
    element.label = customInputValues[element.id];
    element.active = true;

    setFrameworkBattleCardTalkTrackName(element);
    setActiveFrameworkBattleCardTalkTrack(element);
  };

  const onKeyPressCustomInput = (element) => (e) => {
    if (customInputError[element.id]) return;
    if (e.key === 'Enter') {
      onBlurCustomInput(element)();
    }
  };

  const onDelete = (element) => {
    removeFrameworkBattleCardTalkTrack(element);
    setAlertDialog({ open: false });
  };

  const onClickDeleteBtn = (element) => (e) => {
    e.stopPropagation();

    setAlertDialog({
      open: true,
      title: dialog.title.DELETE_CONFIRMATION,
      message: `Are you sure you want to delete the "${element.label}" element?`,
      type: dialog.type.DELETE,
      action: () => onDelete(element),
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
    const reorderedElements = [...activeFrameworkBattleCard['talk-tracks']];
    const removedElement = reorderedElements.splice(source.index, 1)[0];
    reorderedElements.splice(destination.index, 0, removedElement);

    setFrameworkBattleCardTalkTracks(reorderedElements);
  };

  const onMouseDownDragBtn = (element) => (e) => {
    e.stopPropagation();

    if (activeFrameworkBattleCardTalkTrack) {
      document.getElementById(activeFrameworkBattleCardTalkTrack.id).blur();
    }
    setActiveFrameworkBattleCardTalkTrack(element);
  };

  return (
    <>
      {activeFrameworkBattleCard?.type === 'battle-card' && (
        <>
          <Box sx={{ ...classes.createElements }}>
            <Input
              placeholder="Create a talk track..."
              value={newElementName}
              onChange={onChangeAddInput}
              onKeyPress={onKeyPressAddInput('talk-track')}
              error={addInputError}
              fullWidth
              sx={{ ...classes.addInput }}
            />
            <IconButton
              color="primary"
              sx={{ ...classes.addInputIcon }}
              onClick={onClickAddBtn('talk-track')}
              disabled={addInputError}
              size="large"
            >
              <AddCircleIcon />
            </IconButton>
          </Box>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="2">
              {(provided) => (
                <List
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  sx={{ ...classes.list }}
                  component="nav"
                  aria-label="Created templates"
                >
                  {activeFrameworkBattleCard &&
                    activeFrameworkBattleCard['talk-tracks'].map(
                      (element, index) => {
                        return (
                          <Draggable
                            key={element.id}
                            draggableId={element.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <ListItem
                                {...provided.draggableProps}
                                ref={provided.innerRef}
                                key={element.id}
                                button
                                aria-controls="template-menu"
                                aria-label="when device is locked"
                                onClick={onClickListItem(element)}
                                sx={{
                                  ...classes.listItem,
                                  ...(element.active && classes.active),
                                  ...(snapshot.isDragging && classes.dragging),
                                }}
                              >
                                <TextField
                                  id={element.id}
                                  label={element.type.replace('-', ' ')}
                                  value={customInputValues[element.id] || ''}
                                  onChange={onChangeCustomInput(element)}
                                  onBlur={onBlurCustomInput(element)}
                                  onKeyPress={onKeyPressCustomInput(element)}
                                  error={customInputError[element.id]}
                                  key={element.id}
                                  variant="outlined"
                                  multiline
                                  sx={{ ...classes.textField }}
                                />
                                <IconButton
                                  id={element.id}
                                  sx={{
                                    ...classes.iconButton,
                                    ...(snapshot.isDragging &&
                                      classes.iconButtonDragging),
                                  }}
                                  color="primary"
                                  onClick={onClickDeleteBtn(element)}
                                  size="large"
                                >
                                  <DeleteIcon />
                                </IconButton>
                                <IconButton
                                  {...provided.dragHandleProps}
                                  id={element.id}
                                  sx={{
                                    ...classes.iconButton,
                                    ...(snapshot.isDragging &&
                                      classes.iconButtonDragging),
                                  }}
                                  color="primary"
                                  onMouseDown={onMouseDownDragBtn(element)}
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
        </>
      )}
    </>
  );
}

BattleCard.propTypes = {
  activeFrameworkBattleCard: object, // eslint-disable-line react/forbid-prop-types
  activeFrameworkBattleCardTalkTrack: object, // eslint-disable-line react/forbid-prop-types
  setActiveFrameworkBattleCardTalkTrack: func.isRequired,
  setFrameworkBattleCardTalkTracks: func.isRequired,
  setFrameworkBattleCardTalkTrack: func.isRequired,
  setFrameworkBattleCardTalkTrackName: func.isRequired,
  removeFrameworkBattleCardTalkTrack: func.isRequired,
  setAlert: func.isRequired,
  setAlertDialog: func.isRequired,
  // setPath: object.isRequired, // eslint-disable-line react/forbid-prop-types
};

BattleCard.defaultProps = {
  activeFrameworkBattleCard: null,
  activeFrameworkBattleCardTalkTrack: null,
};

export default BattleCard;
