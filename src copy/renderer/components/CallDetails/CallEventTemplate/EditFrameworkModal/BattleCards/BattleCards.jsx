import React, { useState, useEffect } from 'react';
import { object, func } from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Input from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

import { IconButton, List, ListItem, Box } from '@mui/material';

import { severity, dialog } from '../../../../../constants/notifications';
import {
  isEmpty,
  notUnique,
  isAllowedChar,
} from '../../../../../containers/Frameworks/utils/validation';
import { uuid } from '../../../../../utils/data';

import classes from './BattleCards.styles';

const BattleCards = (props) => {
  const {
    activeFrameworkBlock,
    activeFrameworkBattleCard,
    setFrameworkBattleCard,
    setFrameworkBattleCardName,
    setFrameworkElements,
    removeFrameworkBattleCard,
    setActiveFrameworkBattleCard,
    setAlert,
    setAlertDialog,
    history,
  } = props;

  const [newElementName, setNewElementName] = useState('');
  const [customInputValues, setCustomInputValues] = useState({});
  const [addInputError, setAddInputError] = useState(false);
  const [customInputError, setCustomInputError] = useState({});

  useEffect(() => {
    if (!activeFrameworkBlock) return;

    const found = activeFrameworkBlock.elements.find(
      (element) => element.active
    );

    if (found) setActiveFrameworkBattleCard(found);
  }, [history.location.pathname]);

  // set customInput values
  useEffect(() => {
    if (!activeFrameworkBlock) return;

    const elementInputValues = activeFrameworkBlock.elements.reduce(
      (state, card) => {
        return {
          ...state,
          [card.id]: card.label,
        };
      },
      {}
    );

    setCustomInputValues(elementInputValues);
  }, []);

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

    if (notUnique(activeFrameworkBlock.elements, value)) {
      setAddInputError(false);
    }
    if (!notUnique(activeFrameworkBlock.elements, value)) {
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
    setFrameworkBattleCard({
      id,
      corporate_id: null,
      account_id: '',
      container_id: '',
      library_id: uuid(),
      label: cleanValue,
      type,
      value: type === 'battle-card' ? [] : '',
      'talk-tracks': [],
      system: false,
      active: false,
    });
    // TODO: add to the Battle Card library
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

  const onClickListItem = (element) => () => {
    if (activeFrameworkBattleCard?.id === element.id) return;
    setActiveFrameworkBattleCard(element);
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

    if (notUnique(activeFrameworkBlock.elements, value, element)) {
      setCustomInputError({
        ...customInputError,
        [element.id]: false,
      });
    }
    if (!notUnique(activeFrameworkBlock.elements, value, element)) {
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
        [element.id]: element.label,
      });
      setCustomInputError({
        ...customInputError,
        [element.id]: false,
      });
      return;
    }

    const newValue = customInputValues[element.id].trim();
    if (newValue === activeFrameworkBattleCard?.label) return;
    element.label = customInputValues[element.id];
    element.active = true;

    setFrameworkBattleCardName(element);
    setActiveFrameworkBattleCard(element);
  };

  const onKeyPressCustomInput = (element) => (e) => {
    if (customInputError[element.id]) return;
    if (e.key === 'Enter') {
      onBlurCustomInput(element)();
    }
  };

  const onClickEditBtn = (element) => (e) => {
    e.stopPropagation();
    setActiveFrameworkBattleCard(element);
    history.push('/app/calls/templates/modal/blocks/battle-cards/battle-card');
  };

  const onDelete = (element) => {
    removeFrameworkBattleCard(element);
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
    const reorderedElements = [...activeFrameworkBlock.elements];
    const removedElement = reorderedElements.splice(source.index, 1)[0];
    reorderedElements.splice(destination.index, 0, removedElement);

    setFrameworkElements(reorderedElements);
  };

  const onMouseDownDragBtn = (element) => (e) => {
    e.stopPropagation();

    if (activeFrameworkBattleCard) {
      document.getElementById(activeFrameworkBattleCard.id).blur();
    }
    setActiveFrameworkBattleCard(element);
  };

  return (
    <>
      <Box sx={{ ...classes.createElements }}>
        <Input
          placeholder="Create a battle card..."
          value={newElementName}
          onChange={onChangeAddInput}
          onKeyPress={onKeyPressAddInput('battle-card')}
          error={addInputError}
          fullWidth
          sx={{ ...classes.addInput }}
        />
        <IconButton
          color="primary"
          onClick={onClickAddBtn('battle-card')}
          disabled={addInputError}
          size="large"
          sx={{ ...classes.addInputIcon }}
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
              {activeFrameworkBlock?.elements.map((element, index) => {
                return (
                  <>
                    {element.type === 'battle-card' && (
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
                              onClick={onClickEditBtn(element)}
                              disabled={customInputError[element.id]}
                              size="large"
                            >
                              <EditOutlinedIcon />
                            </IconButton>
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
                    )}
                  </>
                );
              })}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

BattleCards.propTypes = {
  activeFrameworkBlock: object, // eslint-disable-line react/forbid-prop-types
  activeFrameworkBattleCard: object, // eslint-disable-line react/forbid-prop-types
  removeFrameworkBattleCard: func.isRequired,
  setFrameworkBattleCard: func.isRequired,
  setFrameworkElements: func.isRequired,
  setActiveFrameworkBattleCard: func.isRequired,
  setFrameworkBattleCardName: func.isRequired,
  setAlert: func.isRequired,
  setAlertDialog: func.isRequired,
  history: object.isRequired, // eslint-disable-line react/forbid-prop-types
};

BattleCards.defaultProps = {
  activeFrameworkBlock: null,
  activeFrameworkBattleCard: null,
};

export default BattleCards;
