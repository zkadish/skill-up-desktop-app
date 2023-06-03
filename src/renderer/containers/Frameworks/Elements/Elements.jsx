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
import MoreVertIcon from '@mui/icons-material/MoreVert';

import MoreMenu from './MoreMenu';
import { severity, dialog } from '../../../constants/notifications';
import { isEmpty, notUnique } from '../utils/validation';
import { uuid } from '../../../utils/data';

import classes from './Elements.styles';

const Elements = (props) => {
  const {
    activeTemplate,
    activeBlock,
    activeElement,
    setActiveElement,
    setElements,
    setElement,
    removeElement,
    setElementName,
    setAlert,
    setAlertDialog,
  } = props;

  const [newElementName, setNewElementName] = useState('');
  const [customInputValues, setCustomInputValues] = useState({});
  const [addInputError, setAddInputError] = useState(false);
  const [customInputError, setCustomInputError] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);

  // useEffect(() => {
  //   if (!activeBlock?.elements) return;
  //   const found = activeBlock.elements.find(e => e.active);
  //   if (found) setActiveElement(found);
  // }, []);

  // set customInput values
  useEffect(() => {
    if (!activeBlock) return;
    const elementInputValues = activeBlock.elements.reduce((state, ele) => {
      return {
        ...state,
        [ele.id]: ele.type === 'talk-track' ? ele.value : ele.label,
      };
    }, {});
    setCustomInputValues(elementInputValues);
  }, [activeBlock]);

  const onChangeAddInput = (e) => {
    const { value } = e.target;

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
    if (!notUnique(activeBlock.elements, value)) {
      setAlert({
        open: true,
        duration: 5000,
        severity: severity.ERROR,
        message: `Element names must be unique, "${value}" already exists.`,
      });
      setAddInputError(true);
      setNewElementName(value);
      return; // can't have 2 templates of the same name
    }

    setNewElementName(value);
  };

  const onClickAddBtn = (type) => () => {
    const { id: blockId } = activeBlock;
    const cleanValue = newElementName.trim();
    if (isEmpty(cleanValue)) return;
    // TODO: create a util function for replacing the dashes in a uuid
    const id = uuid();
    setElement({
      id,
      corporate_id: '',
      account_id: '',
      container_id: blockId,
      label: cleanValue,
      value: type === 'talk-track' ? cleanValue : '',
      type,
      system: false,
      active: false,
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

  const onClickListItem = (element) => () => {
    if (activeElement?.id === element.id) return;
    setActiveElement(element);
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
    //     [element.id]: false
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
    //     [element.id]: true
    //   });
    //   setCustomInputValues({
    //     ...customInputValues,
    //     [element.id]: value
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
    if (newValue === activeElement?.value) return;
    // TODO: check the other element types
    if (element.type === 'talk-track') {
      element.value = newValue;
    }
    element.label = newValue;
    element.active = true;

    setElementName(element);
    setActiveElement(element);
  };

  const onKeyPressCustomInput = (element) => (e) => {
    if (customInputError[element.id]) return;
    if (e.key === 'Enter') {
      onBlurCustomInput(element)();
    }
  };

  const onDelete = (element) => {
    setAnchorEl(null);
    removeElement(element);
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
    const reorderedElements = [...activeBlock.elements];
    const removedElement = reorderedElements.splice(source.index, 1)[0];
    reorderedElements.splice(destination.index, 0, removedElement);
    setElements(reorderedElements);
  };

  const onMouseDownDragBtn = (element) => (e) => {
    e.stopPropagation();

    if (activeElement) {
      const selected = document.getElementById(activeElement.id);
      if (!selected) return;
      selected.blur();
    }
    setActiveElement(element);
  };

  const onClickMoreElement = (element) => (e) => {
    e.currentTarget.style.cssText = `position:absolute;right:16px;display:block`;
    setActiveElement(element);
    setAnchorEl(e.currentTarget);
  };

  const onCloseMoreMenu = () => {
    anchorEl.style.cssText = '';
    setAnchorEl(null);
  };

  return (
    <>
      {activeBlock?.type !== 'battle-cards' && (
        <Paper sx={{ ...classes.paper }}>
          <Box sx={{ ...classes.createElements }}>
            <Input
              sx={{ ...classes.addInput }}
              placeholder="Create an element..."
              value={newElementName}
              onChange={onChangeAddInput}
              onKeyPress={onKeyPressAddInput('question-answer')}
              error={addInputError}
              fullWidth
              disabled={activeBlock?.system}
            />
            <IconButton
              color="primary"
              sx={{ ...classes.iconButton }}
              onClick={onClickAddBtn(
                activeBlock?.type === 'talk-track'
                  ? 'talk-track'
                  : 'question-answer'
              )}
              disabled={addInputError || activeBlock?.system}
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
                  {activeBlock?.elements?.map((element, index) => {
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
                            button
                            aria-controls="template-menu"
                            aria-label="when device is locked"
                            onClick={onClickListItem(element)}
                            className={clsx(
                              'listItem',
                              { active: element.active },
                              { dragging: snapshot.isDragging }
                            )}
                          >
                            <TextField
                              sx={{ ...classes.textField }}
                              id={element.id}
                              label={element.type?.replace('-', ' ')}
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
                              className={clsx({
                                display: !snapshot.isDragging,
                              })}
                              sx={{ ...classes.iconButton }}
                              color="primary"
                              onClick={onClickDeleteBtn(element)}
                              disabled={activeTemplate.system}
                              size="large"
                            >
                              <DeleteIcon />
                            </IconButton>
                            <IconButton
                              {...provided.dragHandleProps}
                              className={clsx({
                                display: !snapshot.isDragging
                              })}
                              sx={{ ...classes.iconButton }}
                              color="primary"
                              onMouseDown={onMouseDownDragBtn(element)}
                              disabled={activeTemplate.system}
                              size="large">
                              <DragIndicatorIcon />
                            </IconButton>
                            <IconButton
                              className={clsx({
                                display: !snapshot.isDragging
                              })}
                              sx={{ ...classes.iconButton }}
                              color="primary"
                              onClick={onClickMoreElement(element)}
                              disabled={element.system}
                              size="large"
                            >
                              <MoreVertIcon />
                            </IconButton>
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
      )}
      <MoreMenu anchorEl={anchorEl} onCloseMoreMenu={onCloseMoreMenu} />
    </>
  );
};

Elements.propTypes = {
  activeTemplate: object, // eslint-disable-line
  activeBlock: object, // eslint-disable-line
  activeElement: object, // eslint-disable-line
  setActiveElement: func.isRequired,
  setElementName: func.isRequired,
  setElements: func.isRequired,
  setElement: func.isRequired,
  removeElement: func.isRequired,
  setAlert: func.isRequired,
  setAlertDialog: func.isRequired,
  history: object.isRequired, // eslint-disable-line
  // elements: object.isRequired, // eslint-disable-line
};

export default Elements;
