import React, { useState, useEffect } from 'react';
import { object, func } from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Input from '@mui/material/OutlinedInput';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CheckIcon from '@mui/icons-material/Check';
import TextField from '@mui/material/TextField';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

import { Box, IconButton, List, ListItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { severity, dialog } from '../../../../../constants/notifications';
import {
  isEmpty,
  notUnique,
  isAllowedChar,
} from '../../../../../containers/Frameworks/utils/validation';
import { uuid } from '../../../../../utils/data';

import classes from './Elements.styles';

function Elements(props) {
  const {
    activeFrameworkBlock,
    activeFrameworkElement,
    setFrameworkElement,
    setActiveFrameworkElement,
    setFrameworkElementName,
    removeFrameworkElement,
    setFrameworkElements,
    setFrameworkElementType,
    setAlert,
    setAlertDialog,
    setPath,
  } = props;

  const [newElementName, setNewElementName] = useState('');
  const [customInputValues, setCustomInputValues] = useState({});
  const [addInputError, setAddInputError] = useState(false);
  const [customInputError, setCustomInputError] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [moreMenuElement, setMoreMenuElement] = useState({});

  // set active elements like this
  useEffect(() => {
    if (!activeFrameworkBlock) return;
    const found = activeFrameworkBlock.elements.find(
      (element) => element.active
    );

    if (found) setActiveFrameworkElement(found);
  }, []);

  // set customInput values
  useEffect(() => {
    if (!activeFrameworkBlock) return;

    const elementInputValues = activeFrameworkBlock.elements.reduce(
      (state, ele) => {
        return {
          ...state,
          [ele.id]: ele.label,
        };
      },
      {}
    );

    setCustomInputValues(elementInputValues);
  }, []);

  const onChangeAddInput = (e) => {
    const { value } = e.target;
    const { elements } = activeFrameworkBlock;
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

    if (notUnique(elements, value)) {
      setAddInputError(false);
    }
    if (!notUnique(elements, value)) {
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
    setFrameworkElement({
      id,
      corporate_id: '',
      account_id: '',
      container_id: '',
      label: cleanValue,
      value: type === 'talk-track' ? cleanValue : '',
      type: type === 'battle-card' ? [] : type,
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
    if (activeFrameworkElement?.id === element.id) return;
    setActiveFrameworkElement(element);
  };

  // change the name of the active element
  const onChangeCustomInput = (element) => (e) => {
    const { value } = e.target;
    const { elements } = activeFrameworkBlock;

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

    if (notUnique(elements, value, element)) {
      setCustomInputError({
        ...customInputError,
        [element.id]: false,
      });
    }
    if (!notUnique(elements, value, element)) {
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
    if (newValue === activeFrameworkElement?.label) return;
    element.label = customInputValues[element.id];
    element.active = true;

    setFrameworkElementName(element);
    setActiveFrameworkElement(element);
  };

  const onKeyPressCustomInput = (element) => (e) => {
    if (customInputError[element.id]) return;
    if (e.key === 'Enter') {
      onBlurCustomInput(element)();
    }
  };

  const onClickEditBtn = (element) => (e) => {
    e.stopPropagation();
    setActiveFrameworkElement(element);
    setPath('/elements/battle-card');
  };

  const onDelete = (element) => {
    setAnchorEl(null);
    removeFrameworkElement(element);
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
    const { destination, source, draggableId } = result;
    const { elements } = activeFrameworkBlock;
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const reorderedElements = [...elements];
    const removedElement = reorderedElements.splice(source.index, 1)[0];
    reorderedElements.splice(destination.index, 0, removedElement);
    setFrameworkElements(reorderedElements);
  };

  const onMouseDownDragBtn = (element) => (e) => {
    e.stopPropagation();

    if (activeFrameworkElement) {
      document.getElementById(activeFrameworkElement.id).blur();
    }
    setActiveFrameworkElement(element);
  };

  const onClickMoreBtn = (element) => (e) => {
    // e.currentTarget.style.cssText = `position:absolute;right:16px;display:block`;
    setMoreMenuElement(element);

    setAnchorEl(e.currentTarget);
    setActiveFrameworkElement(element);
  };

  const onCloseMoreMenu = () => {
    anchorEl.style.cssText = '';
    setAnchorEl(null);
  };

  const onClickMenuItem = (type) => () => {
    setMoreMenuElement({
      ...moreMenuElement,
      type,
    });
    setFrameworkElementType({ type });
  };

  return (
    <>
      {activeFrameworkBlock?.type !== 'battle-cards' && (
        <>
          <Box sx={{ ...classes.createElements }}>
            <Input
              placeholder="Create an element..."
              value={newElementName}
              onChange={onChangeAddInput}
              onKeyPress={onKeyPressAddInput('question-answer')}
              error={addInputError}
              fullWidth
              sx={{ ...classes.addInput }}
            />
            <IconButton
              color="primary"
              sx={{ ...classes.addInputIcon }}
              onClick={onClickAddBtn(
                activeFrameworkBlock?.type === 'talk-track'
                  ? 'talk-track'
                  : 'question-answer'
              )}
              disabled={addInputError}
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
                  {activeFrameworkBlock &&
                    activeFrameworkBlock.elements?.map((element, index) => {
                      return (
                        <Draggable
                          key={element.id}
                          draggableId={element.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <ListItem
                              key={element.id}
                              {...provided.draggableProps}
                              ref={provided.innerRef}
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
                              <IconButton
                                id={element.id}
                                sx={{
                                  ...classes.iconButton,
                                  ...(snapshot.isDragging &&
                                    classes.iconButtonDragging),
                                }}
                                color="primary"
                                onClick={onClickMoreBtn(element)}
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
        </>
      )}
      <Box>
        <Menu
          id="customized-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={onCloseMoreMenu}
          sx={{ ...classes.menu }}
        >
          <MenuItem
            sx={{
              ...classes.menuItem,
              ...(moreMenuElement.type === 'question-answer' &&
                classes.menuItemActive),
            }}
            onClick={onClickMenuItem('question-answer')}
          >
            <ListItemIcon sx={{ ...classes.menuItemCheck }}>
              {moreMenuElement.type === 'question-answer' && (
                <CheckIcon fontSize="small" />
              )}
            </ListItemIcon>
            <ListItemText primary="Question & Answer" />
          </MenuItem>
          <MenuItem
            sx={{
              ...classes.menuItem,
              ...(moreMenuElement.type === 'research-field' &&
                classes.menuItemActive),
            }}
            onClick={onClickMenuItem('research-field')}
          >
            <ListItemIcon sx={{ ...classes.menuItemCheck }}>
              {moreMenuElement.type === 'research-field' && (
                <CheckIcon fontSize="small" />
              )}
            </ListItemIcon>
            <ListItemText primary="Research Field" />
          </MenuItem>
          <MenuItem
            sx={{
              ...classes.menuItem,
              ...(moreMenuElement.type === 'check-list' &&
                classes.menuItemActive),
            }}
            onClick={onClickMenuItem('check-list')}
          >
            <ListItemIcon sx={{ ...classes.menuItemCheck }}>
              {moreMenuElement.type === 'check-list' && (
                <CheckIcon fontSize="small" />
              )}
            </ListItemIcon>
            <ListItemText primary="Check List" />
          </MenuItem>
          <MenuItem
            sx={{
              ...classes.menuItem,
              ...(moreMenuElement.type === 'talk-track' &&
                classes.menuItemActive),
            }}
            onClick={onClickMenuItem('talk-track')}
          >
            <ListItemIcon sx={{ ...classes.menuItemCheck }}>
              {moreMenuElement.type === 'talk-track' && (
                <CheckIcon fontSize="small" />
              )}
            </ListItemIcon>
            <ListItemText primary="Talk Track" />
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
}

Elements.propTypes = {
  activeFrameworkBlock: object, // eslint-disable-line
  activeFrameworkElement: object, // eslint-disable-line
  removeFrameworkElement: func.isRequired,
  setFrameworkElement: func.isRequired,
  setFrameworkElements: func.isRequired,
  setFrameworkElementType: func.isRequired,
  setActiveFrameworkElement: func.isRequired,
  setFrameworkElementName: func.isRequired,
  setAlert: func.isRequired,
  setAlertDialog: func.isRequired,
  setPath: func.isRequired, // eslint-disable-line
};

export default Elements;
