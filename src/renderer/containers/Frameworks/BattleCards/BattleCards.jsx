import React, { useState, useEffect } from 'react';
import { object, func, array } from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import Paper from '@mui/material/Paper';
import Input from '@mui/material/OutlinedInput';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import TextField from '@mui/material/TextField';
import AddCircleIcon from '@mui/icons-material/AddCircle';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Box, IconButton, List, ListItem } from '@mui/material';

import { severity, dialog } from '../../../constants/notifications';
import { isEmpty, notUnique } from '../utils/validation';
import { uuid } from '../../../utils/data';
import BattleCardLibrary from '../BattleCardLibrary';

import classes from './BattleCards.style';

function BattleCards(props) {
  const {
    activeTemplate,
    setLibraryBattleCard,
    addLibraryBattleCard,
    // setBattleCard,
    // setBattleCardName,
    setActiveBattleCard,
    activeBattleCard,
    // setLibraryBattleCards,
    activeBlock,
    // activeLibraryBattleCard,
    battleCards,
    setElements,
    removeBattleCard,
    setLibraryBattleCardName,
    setAlert,
    setAlertDialog,
    // setActiveBlock,
  } = props;
  const navigate = useNavigate();

  const [newElementName, setNewElementName] = useState('');
  const [customInputValues, setCustomInputValues] = useState({});
  const [addInputError, setAddInputError] = useState(false);
  const [customInputError, setCustomInputError] = useState({});

  // set customInput values
  useEffect(() => {
    if (!activeBlock) return;

    const battleCardsInputValues = activeBlock?.elements.reduce(
      (state, ele) => {
        // TODO: use activeBlock battleCards
        return {
          ...state,
          [ele.id]: ele.label,
        };
      },
      {}
    );
    setCustomInputValues(battleCardsInputValues);
  }, [activeBlock]);

  const onClickAddBtn = (type) => () => {
    const { id: blockId } = activeBlock;
    const cleanValue = newElementName.trim();
    if (isEmpty(cleanValue)) return;

    const id = uuid();
    const battleCard = {
      id,
      corporate_id: null,
      account_id: '',
      library_id: uuid(),
      label: cleanValue,
      type,
      'talk-tracks': [],
      active: false,
      system: false,
    }; // NOTE: battle cards going directly into the library should not get a container_id
    setLibraryBattleCard(battleCard);
    // NOTE: The instance of the battle card going into the block as an element needs to have
    // its have a container_id set to the blocks id its being assigned to.
    battleCard.container_id = blockId;
    addLibraryBattleCard({ ...battleCard, id: uuid() }, activeBlock);
    // TODO: remove after some testing the setBattleCard action
    // setBattleCard(battleCard);
    setCustomInputValues({
      ...customInputValues,
      [id]: cleanValue,
    });
    setNewElementName('');
  };

  const onChangeAddInput = (e) => {
    const { value } = e.target;
    // debugger
    // if (isAllowedChar(value)) setAddInputError(false);
    // if (!isAllowedChar(value)) {
    //   setAlert({
    //     open: true,
    //     duration: 5000,
    //     severity: severity.ERROR,
    //     message: `Elements names may only contain letters, numbers, dashes, underscores or periods.`
    //   });
    //   setAddInputError(true);
    //   setNewElementName(value);
    //   return;
    // }

    if (notUnique(activeBlock.elements, value)) {
      setAddInputError(false);
    }
    if (!notUnique(battleCards, value)) {
      setAlert({
        open: true,
        duration: 5000,
        severity: severity.ERROR,
        message: `Battle card names must be unique, "${value}" already exists in the battle card library.`,
      });
      setAddInputError(true);
      setNewElementName(value);
      return; // can't have 2 templates of the same name
    }

    setNewElementName(value);
  };

  const onKeyPressAddInput = (type) => (e) => {
    if (addInputError) return;
    if (e.key === 'Enter') onClickAddBtn(type)();
  };

  const onFocusAddInput = () => (e) => {
    onChangeAddInput(e);
  };

  const onClickListItem = (battleCard) => () => {
    if (activeBattleCard?.id === battleCard.id) return;
    setActiveBattleCard(battleCard);
  };

  const onChangeCustomInput = (element) => (e) => {
    const { value } = e.target;

    if (value) {
      setCustomInputError({
        ...customInputError,
        [element.id]: false,
      });
    }
    if (value === '') {
      let message = '';
      switch (element.type) {
        case 'question-answer':
          message = 'Question and answer elements must have a question.';
          break;
        case 'talk-track':
          message = 'Talk track elements must have a track.';
          break;
        case 'check-list':
          message = 'Check list elements must have an action.';
          break;
        default:
          message = 'Research fields must have a label.';
      }
      if (element.type === 'question-answer') {
        message = 'Question and answer elements must have a name.';
      }
      setAlert({
        open: true,
        duration: 5000,
        severity: severity.ERROR,
        message,
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

    // if (isAllowedChar(value)) {
    //   setCustomInputError({
    //     ...customInputError,
    //     [battleCard.id]: false
    //   });
    // }
    // if (!isAllowedChar(value)) {
    //   setAlert({
    //     open: true,
    //     duration: 5000,
    //     severity: severity.ERROR,
    //     message: `Element names may only contain letters, numbers, dashes, underscores or periods.`
    //   });
    //   setCustomInputError({
    //     ...customInputError,
    //     [battleCard.id]: true
    //   });
    //   setCustomInputValues({
    //     ...customInputValues,
    //     [battleCard.id]: value
    //   });
    //   return;
    // }

    if (notUnique(activeBlock.elements, value, element)) {
      setCustomInputError({
        ...customInputError,
        [element.id]: false,
      });
    }
    if (!notUnique(activeBlock.elements, value, element)) {
      setAlert({
        open: true,
        duration: 5000,
        severity: severity.ERROR,
        message: `Battle Card names must be unique, "${value}" already exists.`,
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
    const battleCard = { ...ele };
    if (customInputError[battleCard.id]) {
      setCustomInputValues({
        ...customInputValues,
        [battleCard.id]: battleCard.label,
      });
      setCustomInputError({
        ...customInputError,
        [battleCard.id]: false,
      });
      return;
    }

    const newValue = customInputValues[battleCard.id].trim();
    if (newValue === activeBattleCard?.label) return;
    battleCard.label = customInputValues[battleCard.id];
    battleCard.active = true;

    setLibraryBattleCardName(battleCard);
    setActiveBattleCard(battleCard);
  };

  const onKeyPressCustomInput = (battleCard) => (e) => {
    if (customInputError[battleCard.id]) return;
    if (e.key === 'Enter') {
      onBlurCustomInput(battleCard)();
    }
  };

  const onClickEditBtn = (battleCard) => (e) => {
    e.stopPropagation();

    setActiveBattleCard(battleCard);
    navigate('/app/frameworks/templates/blocks/battle-cards/battle-card');
  };

  const onDelete = (battleCard) => {
    setAlertDialog({ open: false });
    removeBattleCard(battleCard, activeBlock);
  };

  const onClickDeleteBtn = (battleCard) => (e) => {
    e.stopPropagation();

    setAlertDialog({
      open: true,
      title: dialog.title.DELETE_CONFIRMATION,
      message: `Are you sure you want to delete the "${battleCard.label}" Battle Card?`,
      type: dialog.type.DELETE,
      action: () => onDelete(battleCard),
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

    const reorderedElements = [...activeBlock.elements];
    // const reorderedElements = [...battleCardState];
    const removedElement = reorderedElements.splice(source.index, 1)[0];
    reorderedElements.splice(destination.index, 0, removedElement);
    setElements(reorderedElements);
  };

  const onMouseDownDragBtn = (battleCard) => (e) => {
    e.stopPropagation();

    if (activeBattleCard) {
      const selected = document.getElementById(activeBattleCard.id);
      if (!selected) return;
      selected.blur();
    }
    setActiveBattleCard(battleCard);
  };

  return (
    <>
      {activeBlock && (
        <>
          <Paper sx={{ ...classes.paper }}>
            <Box sx={{ ...classes.createElements }}>
              <Input
                sx={{ ...classes.addInput }}
                placeholder="Create a battle card..."
                value={newElementName}
                onChange={onChangeAddInput}
                onFocus={onFocusAddInput('battle-card')}
                onKeyPress={onKeyPressAddInput('battle-card')}
                error={addInputError}
                fullWidth
                disabled={activeTemplate?.system}
              />
              <IconButton
                color="primary"
                sx={{ ...classes.iconButton }}
                onClick={onClickAddBtn('battle-card')}
                disabled={addInputError || activeTemplate?.system}
                size="large"
              >
                <AddCircleIcon />
              </IconButton>
            </Box>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="battleCards-1">
                {(provided) => (
                  <List
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    sx={{ ...classes.list }}
                    component="nav"
                    aria-label="Created templates"
                  >
                    {activeBlock.elements?.map((battleCard, index) => {
                      if (!battleCard) return null;
                      return (
                        <Draggable
                          key={battleCard.id}
                          draggableId={battleCard.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <ListItem
                              {...provided.draggableProps}
                              ref={provided.innerRef}
                              button
                              aria-controls="template-menu"
                              aria-label="when device is locked"
                              onClick={onClickListItem(battleCard)}
                              className={clsx(
                                'listItem',
                                { active: battleCard.active },
                                { dragging: snapshot.isDragging }
                              )}
                            >
                              <TextField
                                sx={{ ...classes.textField }}
                                id={battleCard.id}
                                label={battleCard.type?.replace('-', ' ')}
                                value={customInputValues[battleCard.id] || ''}
                                onChange={onChangeCustomInput(battleCard)}
                                onBlur={onBlurCustomInput(battleCard)}
                                onKeyPress={onKeyPressCustomInput(battleCard)}
                                error={customInputError[battleCard.id]}
                                variant="outlined"
                                multiline
                                disabled={battleCard.system}
                              />
                              <IconButton
                                className={clsx({
                                  display: !snapshot.isDragging,
                                })}
                                sx={{ ...classes.iconButton }}
                                color="primary"
                                onClick={onClickEditBtn(battleCard)}
                                disabled={customInputError[battleCard.id]}
                                size="large"
                              >
                                <EditOutlinedIcon />
                              </IconButton>
                              <IconButton
                                className={clsx({
                                  display: !snapshot.isDragging,
                                })}
                                sx={{ ...classes.iconButton }}
                                color="primary"
                                onClick={onClickDeleteBtn(battleCard)}
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
                                onMouseDown={onMouseDownDragBtn(battleCard)}
                                disabled={activeTemplate.system}
                                size="large"
                              >
                                <DragIndicatorIcon />
                              </IconButton>
                              {/* <IconButton
                                  className={clsx({
                                  display: !snapshot.isDragging,
                                })}
                                sx={{ ...classes.iconButton }}
                                color="primary"
                                onClick={onAddToLibrary(battleCard)}
                              >
                                <AddCircleOutlineIcon />
                              </IconButton> */}
                            </ListItem>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </List>
                )}
              </Droppable>
            </DragDropContext>
          </Paper>
          <BattleCardLibrary />
        </>
      )}
    </>
  );
}

BattleCards.propTypes = {
  addLibraryBattleCard: func.isRequired,
  // setBattleCard: func.isRequired,
  // setBattleCardName: func.isRequired,
  setActiveBattleCard: func.isRequired,
  setLibraryBattleCards: func.isRequired,
  setLibraryBattleCard: func.isRequired,
  activeTemplate: object, // eslint-disable-line
  activeBlock: object, // eslint-disable-line
  // activeLibraryBattleCard: object, // eslint-disable-line
  activeBattleCard: object, // eslint-disable-line
  setLibraryBattleCardName: func.isRequired,
  setElements: func.isRequired,
  removeBattleCard: func.isRequired,
  setAlert: func.isRequired,
  setAlertDialog: func.isRequired,
  battleCards: array, // eslint-disable-line
};

export default BattleCards;
