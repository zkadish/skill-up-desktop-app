import React, { useState, useEffect } from 'react';
import { func, object } from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Input from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import { Box, IconButton } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CheckIcon from '@mui/icons-material/Check';

import {
  isEmpty,
  notUnique,
  isAllowedChar,
} from '../../../../../containers/Frameworks/utils/validation';

import { severity, dialog } from '../../../../../constants/notifications';
import { uuid } from '../../../../../utils/data';

import classes from './Blocks.styles';

function Blocks(props) {
  const {
    // activeCall,
    callEventModal,
    setAlert,
    setAlertDialog,
    setFrameworkBlocks,
    setFrameworkBlock,
    setActiveFrameworkBlock,
    removeFrameworkBlock,
    activeFrameworkBlock,
    setFrameworkBlockName,
    setFrameworkBlockType,
    setPath,
  } = props;

  const [newBlockName, setNewBlockName] = useState('');
  const [customInputValues, setCustomInputValues] = useState({});
  const [addInputError, setAddInputError] = useState(false);
  const [customInputError, setCustomInputError] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [moreMenuBlock, setMoreMenuBlock] = useState({});

  // set customInput values
  useEffect(() => {
    // if (!activeCall) return;

    const blockInputValues = callEventModal.template.blocks.reduce(
      (state, block) => {
        return {
          ...state,
          [block.id]: block.label,
        };
      },
      {}
    );
    setCustomInputValues(blockInputValues);
  }, []);

  const onChangeAddInput = (e) => {
    const { value } = e.target;

    if (isAllowedChar(value)) setAddInputError(false);
    if (!isAllowedChar(value)) {
      setAlert({
        open: true,
        duration: 5000,
        severity: severity.ERROR,
        message: `Blocks names may only contain letters, numbers, dashes, underscores or periods.`,
      });
      setAddInputError(true);
      setNewBlockName(value.toUpperCase());
      return;
    }

    // TODO: fix validation
    if (notUnique(callEventModal.template.blocks, value)) {
      setAddInputError(false);
    }
    if (!notUnique(callEventModal.template.blocks, value)) {
      setAlert({
        open: true,
        duration: 5000,
        severity: severity.ERROR,
        message: `Template names must be unique, "${value}" already exists.`,
      });
      setAddInputError(true);
      setNewBlockName(value);
      return; // can't have 2 templates of the same name
    }

    setNewBlockName(value);
  };

  const onClickAddBtn = () => {
    const cleanValue = newBlockName.trim();

    if (isEmpty(cleanValue)) return;

    const id = uuid();
    setFrameworkBlock({
      id,
      corporate_id: '',
      account_id: '',
      container_id: '',
      elements: [],
      label: cleanValue,
      type: 'default',
      system: false,
      active: false,
    });
    setCustomInputValues({
      ...customInputValues,
      [id]: cleanValue,
    });
    setNewBlockName('');
  };

  const onKeyPressAddInput = (e) => {
    if (addInputError) return;
    if (e.key === 'Enter') onClickAddBtn();
  };

  const onClickListItem = (block) => () => {
    if (activeFrameworkBlock?.id === block.id) return;
    setActiveFrameworkBlock(block);
  };

  // change the name of the active block
  const onChangeCustomInput = (block) => (e) => {
    const { value } = e.target;
    // TODO: create a modular way to handle validation
    // TODO: move validation out of this file
    // TODO: introduce yup???
    if (value) {
      setCustomInputError({
        ...customInputError,
        [block.id]: false,
      });
    }
    if (value === '') {
      setAlert({
        open: true,
        duration: 5000,
        severity: severity.ERROR,
        message: `Blocks must have a name.`,
      });
      setCustomInputError({
        ...customInputError,
        [block.id]: true,
      });
      setCustomInputValues({
        ...customInputValues,
        [block.id]: value,
      });
      return;
    }

    if (isAllowedChar(value)) {
      setCustomInputError({
        ...customInputError,
        [block.id]: false,
      });
    }
    if (!isAllowedChar(value)) {
      setAlert({
        open: true,
        duration: 5000,
        severity: severity.ERROR,
        message: `Block names may only contain letters, numbers, dashes, underscores or periods.`,
      });
      setCustomInputError({
        ...customInputError,
        [block.id]: true,
      });
      setCustomInputValues({
        ...customInputValues,
        [block.id]: value,
      });
      return;
    }

    if (notUnique(callEventModal.template.blocks, value, block)) {
      setCustomInputError({
        ...customInputError,
        [block.id]: false,
      });
    }
    if (!notUnique(callEventModal.template.blocks, value, block)) {
      setAlert({
        open: true,
        duration: 5000,
        severity: severity.ERROR,
        message: `Block names must be unique, "${value}" already exists.`,
      });
      setCustomInputError({
        ...customInputError,
        [block.id]: true,
      });
    }

    setCustomInputValues({
      ...customInputValues,
      [block.id]: value.toUpperCase(),
    });
  };

  const onBlurCustomInput = (b) => () => {
    const block = { ...b };
    if (customInputError[block.id]) {
      setCustomInputValues({
        ...customInputValues,
        [block.id]: block.label,
      });
      setCustomInputError({
        ...customInputError,
        [block.id]: false,
      });
      return;
    }

    const newValue = customInputValues[block.id].trim();
    if (newValue === activeFrameworkBlock?.label) return;
    block.label = customInputValues[block.id];
    block.active = true;

    setFrameworkBlockName(block);
    setActiveFrameworkBlock(block);
  };

  const onKeyPressCustomInput = (block) => (e) => {
    if (customInputError[block.id]) return;
    if (e.key === 'Enter') {
      onBlurCustomInput(block)();
    }
  };

  const onClickEditBtn = (block) => (e) => {
    e.stopPropagation();

    if (
      block.type === 'attendees' ||
      block.type === 'actions' ||
      block.type === 'notes'
    ) {
      return;
    }

    setActiveFrameworkBlock(block);
    if (block.type === 'battle-cards') {
      setPath('/blocks/battle-cards');
      return;
    }
    setPath('/blocks/elements');
  };

  const onDelete = (block) => {
    setAnchorEl(null);
    removeFrameworkBlock(block);
    setAlertDialog({ open: false });
  };

  const onClickDeleteBtn = (block) => (e) => {
    e.stopPropagation();

    setAlertDialog({
      open: true,
      title: dialog.title.DELETE_CONFIRMATION,
      message: `Are you sure you want to delete the "${block.label}" block?`,
      type: dialog.type.DELETE,
      action: () => onDelete(block),
    });
  };

  const onClickMoreBtn = (block) => (e) => {
    // e.currentTarget.style.cssText = `position:absolute;right:16px;display:block`;
    setMoreMenuBlock(block);

    setAnchorEl(e.currentTarget);
    setActiveFrameworkBlock(block);
  };

  const onCloseMoreMenu = () => {
    anchorEl.style.cssText = '';
    setAnchorEl(null);
  };

  const onClickMenuItem = (type) => () => {
    setMoreMenuBlock({
      ...moreMenuBlock,
      type,
    });
    setFrameworkBlockType({ type });
    setAnchorEl(null);
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const reorderedBlocks = [...callEventModal.template.blocks];
    const removedBlock = reorderedBlocks.splice(source.index, 1)[0];
    reorderedBlocks.splice(destination.index, 0, removedBlock);
    setFrameworkBlocks(reorderedBlocks);
  };

  const onMouseDownDragBtn = (block) => (e) => {
    e.stopPropagation();

    if (activeFrameworkBlock) {
      document.getElementById(activeFrameworkBlock.id).blur();
    }
    setActiveFrameworkBlock(block);
  };

  return (
    <>
      <Box sx={{ ...classes.createElements }}>
        <Input
          placeholder="Create a block..."
          value={newBlockName}
          onChange={onChangeAddInput}
          onKeyPress={onKeyPressAddInput}
          error={addInputError}
          fullWidth
          sx={{ ...classes.addInput }}
        />
        <IconButton
          color="primary"
          sx={{ ...classes.addInputIcon }}
          onClick={onClickAddBtn}
          disabled={addInputError}
          size="large"
        >
          <AddCircleIcon />
        </IconButton>
      </Box>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="1">
          {(provided) => (
            <List
              {...provided.droppableProps}
              ref={provided.innerRef}
              sx={{ ...classes.list }}
              component="nav"
              aria-label="Created templates"
            >
              {callEventModal?.template &&
                callEventModal.template.blocks.map((block, index) => {
                  return (
                    <Draggable
                      key={block.id}
                      draggableId={block.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <ListItem
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                          key={block.id}
                          id={block.id}
                          button
                          aria-controls="template-menu"
                          aria-label="template blocks"
                          onClick={onClickListItem(block)}
                          sx={{
                            ...classes.listItem,
                            ...(block.active && classes.active),
                            ...(snapshot.isDragging && classes.dragging),
                          }}
                        >
                          <TextField
                            id={block.id}
                            label={block.type.replace('-', ' ')}
                            value={customInputValues[block.id] || ''}
                            onChange={onChangeCustomInput(block)}
                            onBlur={onBlurCustomInput(block)}
                            onKeyPress={onKeyPressCustomInput(block)}
                            error={customInputError[block.id]}
                            key={block.id}
                            variant="outlined"
                            multiline
                            sx={{ ...classes.textField }}
                          />
                          <IconButton
                            sx={{
                              ...classes.iconButton,
                              ...(snapshot.isDragging &&
                                classes.iconButtonDragging),
                            }}
                            color="primary"
                            onClick={onClickEditBtn(block)}
                            disabled={
                              block.type === 'attendees' ||
                              block.type === 'actions' ||
                              block.type === 'notes' ||
                              customInputError[block.id]
                            }
                            size="large"
                          >
                            <EditOutlinedIcon />
                          </IconButton>
                          <IconButton
                            id={block.id}
                            sx={{
                              ...classes.iconButton,
                              ...(snapshot.isDragging &&
                                classes.iconButtonDragging),
                            }}
                            color="primary"
                            onClick={onClickDeleteBtn(block)}
                            size="large"
                          >
                            <DeleteIcon />
                          </IconButton>
                          <IconButton
                            {...provided.dragHandleProps}
                            id={block.id}
                            sx={{
                              ...classes.iconButton,
                              ...(snapshot.isDragging &&
                                classes.iconButtonDragging),
                            }}
                            color="primary"
                            onMouseDown={onMouseDownDragBtn(block)}
                            size="large"
                          >
                            <DragIndicatorIcon id={block.id} />
                          </IconButton>
                          <IconButton
                            id={block.id}
                            sx={{
                              ...classes.iconButton,
                              ...(snapshot.isDragging &&
                                classes.iconButtonDragging),
                            }}
                            color="primary"
                            onClick={onClickMoreBtn(block)}
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
      <Menu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={onCloseMoreMenu}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        sx={{ ...classes.menu }}
      >
        <MenuItem
          onClick={onClickMenuItem('default')}
          sx={{
            ...classes.menuItem,
            ...(moreMenuBlock.type === 'default' && classes.menuItemActive),
          }}
        >
          <ListItemIcon sx={{ ...classes.menuItemCheck }}>
            {moreMenuBlock.type === 'default' && <CheckIcon fontSize="small" />}
          </ListItemIcon>
          <ListItemText primary="Default" />
        </MenuItem>
        <MenuItem
          onClick={onClickMenuItem('talk-tracks')}
          sx={{
            ...classes.menuItem,
            ...(moreMenuBlock.type === 'talk-tracks' && classes.menuItemActive),
          }}
        >
          <ListItemIcon sx={{ ...classes.menuItemCheck }}>
            {moreMenuBlock.type === 'talk-tracks' && (
              <CheckIcon fontSize="small" />
            )}
          </ListItemIcon>
          <ListItemText primary="Talk Track" />
        </MenuItem>
        <MenuItem
          onClick={onClickMenuItem('battle-cards')}
          sx={{
            ...classes.menuItem,
            ...(moreMenuBlock.type === 'battle-cards' &&
              classes.menuItemActive),
          }}
        >
          <ListItemIcon sx={{ ...classes.menuItemCheck }}>
            {moreMenuBlock.type === 'battle-cards' && (
              <CheckIcon fontSize="small" />
            )}
          </ListItemIcon>
          <ListItemText primary="Battle Cards" />
        </MenuItem>
        <MenuItem
          onClick={onClickMenuItem('actions')}
          sx={{
            ...classes.menuItem,
            ...(moreMenuBlock.type === 'actions' && classes.menuItemActive),
          }}
        >
          <ListItemIcon sx={{ ...classes.menuItemCheck }}>
            {moreMenuBlock.type === 'actions' && <CheckIcon fontSize="small" />}
          </ListItemIcon>
          <ListItemText primary="Actions" />
        </MenuItem>
        <MenuItem
          onClick={onClickMenuItem('notes')}
          sx={{
            ...classes.menuItem,
            ...(moreMenuBlock.type === 'notes' && classes.menuItemActive),
          }}
        >
          <ListItemIcon sx={{ ...classes.menuItemCheck }}>
            {moreMenuBlock.type === 'notes' && <CheckIcon fontSize="small" />}
          </ListItemIcon>
          <ListItemText primary="Notes" />
        </MenuItem>
        <MenuItem
          onClick={onClickMenuItem('attendees')}
          sx={{
            ...classes.menuItem,
            ...(moreMenuBlock.type === 'attendees' && classes.menuItemActive),
          }}
        >
          <ListItemIcon sx={{ ...classes.menuItemCheck }}>
            {moreMenuBlock.type === 'attendees' && (
              <CheckIcon fontSize="small" />
            )}
          </ListItemIcon>
          <ListItemText primary="Attendees" />
        </MenuItem>
        <MenuItem
          onClick={onClickMenuItem('pre-call')}
          sx={{
            ...classes.menuItem,
            ...(moreMenuBlock.type === 'pre-call' && classes.menuItemActive),
          }}
        >
          <ListItemIcon sx={{ ...classes.menuItemCheck }}>
            {moreMenuBlock.type === 'pre-call' && (
              <CheckIcon fontSize="small" />
            )}
          </ListItemIcon>
          <ListItemText primary="Pre Call Actions" />
        </MenuItem>
        <MenuItem
          onClick={onClickMenuItem('post-call')}
          sx={{
            ...classes.menuItem,
            ...(moreMenuBlock.type === 'post-call' && classes.menuItemActive),
          }}
        >
          <ListItemIcon sx={{ ...classes.menuItemCheck }}>
            {moreMenuBlock.type === 'post-call' && (
              <CheckIcon fontSize="small" />
            )}
          </ListItemIcon>
          <ListItemText primary="Post Call Actions" />
        </MenuItem>
      </Menu>
    </>
  );
}

Blocks.propTypes = {
  // activeCall: object, // eslint-disable-line
  callEventModal: object, // eslint-disable-line
  activeFrameworkBlock: object, // eslint-disable-line
  setAlert: func.isRequired,
  setAlertDialog: func.isRequired,
  setFrameworkBlocks: func.isRequired,
  setFrameworkBlock: func.isRequired,
  setFrameworkBlockName: func.isRequired,
  setFrameworkBlockType: func.isRequired,
  removeFrameworkBlock: func.isRequired,
  setActiveFrameworkBlock: func.isRequired,
  setPath: func.isRequired,
};

export default Blocks;
