import React, { useState, useEffect } from 'react';
import { object, func } from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { Box, IconButton } from '@mui/material';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Input from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import MoreMenu from './MoreMenu';
import { severity, dialog } from '../../../constants/notifications';
import { isEmpty, notUnique } from '../utils/validation';
import { uuid } from '../../../utils/data';

import classes from './Blocks.styles';

// TODO: Add validation for: there can only be one Block of type BattleCards!

function Blocks(props) {
  const {
    activeTemplate,
    activeBlock,
    setActiveBlock,
    setBlocks,
    setBlock,
    removeBlock,
    setBlockName,
    setAlert,
    setAlertDialog,
  } = props;
  const navigate = useNavigate();

  const [newBlockName, setNewBlockName] = useState('');
  const [customInputValues, setCustomInputValues] = useState({});
  const [addInputError, setAddInputError] = useState(false);
  const [customInputError, setCustomInputError] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);

  // TODO: active state should be tracked by template state in the store
  // useEffect(() => {
  //   if (!activeTemplate?.blocks) return;

  //   const found = activeTemplate.blocks.find(b => b.active);
  //   if (found) {
  //     setActiveBlock(found);
  //   }
  // }, []);

  // set customInput values
  useEffect(() => {
    if (!activeTemplate?.blocks) return;

    const blockInputValues = activeTemplate.blocks.reduce((state, block) => {
      return {
        ...state,
        [block.id]: block.label.toUpperCase(),
      };
    }, {});
    setCustomInputValues(blockInputValues);
  }, [activeTemplate]);

  const onChangeAddInput = (e) => {
    const { value } = e.target;

    // if (isAllowedChar(value)) setAddInputError(false);
    // if (!isAllowedChar(value)) {
    //   setAlert({
    //     open: true,
    //     duration: 5000,
    //     severity: severity.ERROR,
    //     message: `Blocks names may only contain letters, numbers, dashes, underscores or periods.`
    //   });
    //   setAddInputError(true);
    //   setNewBlockName(value.toUpperCase());
    //   return;
    // }
    // console.log(activeTemplate.blocks, value.toUpperCase());
    // debugger
    if (notUnique(activeTemplate.blocks, value.toUpperCase())) {
      setAddInputError(false);
    }
    if (!notUnique(activeTemplate.blocks, value.toUpperCase())) {
      setAlert({
        open: true,
        duration: 5000,
        severity: severity.ERROR,
        message: `Block names must be unique, "${value}" already exists.`,
      });
      setAddInputError(true);
      setNewBlockName(value.toUpperCase());
      return; // can't have 2 templates of the same name
    }

    setNewBlockName(value.toUpperCase());
  };

  const onClickAddBtn = () => {
    const { id: templateId } = activeTemplate;
    const blockName = newBlockName.trim();

    if (isEmpty(blockName)) return;

    const id = uuid();
    setBlock({
      id,
      corporate_id: '',
      account_id: '',
      container_id: templateId,
      elements: [],
      label: blockName,
      type: 'default',
      system: false,
      active: false,
    });
    setCustomInputValues({
      ...customInputValues,
      [id]: blockName.toUpperCase(),
    });
    setNewBlockName('');
  };

  const onKeyPressAddInput = (e) => {
    if (addInputError) return;
    if (e.key === 'Enter') onClickAddBtn();
  };

  const onClickListItem = (block) => () => {
    if (activeBlock?.id === block.id) return;
    setActiveBlock(block);
  };

  // change the name of the active block
  const onChangeCustomInput = (block) => (e) => {
    const { value } = e.target;
    // TODO: introduce yup!!!
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
        [block.id]: value.toUpperCase(),
      });
      return;
    }

    // if (isAllowedChar(value)) {
    //   setCustomInputError({
    //     ...customInputError,
    //     [block.id]: false
    //   });
    // }
    // if (!isAllowedChar(value)) {
    //   setAlert({
    //     open: true,
    //     duration: 5000,
    //     severity: severity.ERROR,
    //     message: `Block names may only contain letters, numbers, dashes, underscores or periods.`
    //   });
    //   setCustomInputError({
    //     ...customInputError,
    //     [block.id]: true
    //   });
    //   setCustomInputValues({
    //     ...customInputValues,
    //     [block.id]: value
    //   });
    //   return;
    // }

    if (notUnique(activeTemplate.blocks, value, block)) {
      setCustomInputError({
        ...customInputError,
        [block.id]: false,
      });
    }
    if (!notUnique(activeTemplate.blocks, value, block)) {
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
    if (newValue === activeBlock?.label) return;
    block.label = newValue;
    block.active = true;

    setBlockName(block);
    setActiveBlock(block);
  };

  const onKeyPressCustomInput = (block) => (e) => {
    if (customInputError[block.id]) return;
    if (e.key === 'Enter') {
      onBlurCustomInput(block)();
    }
  };

  const onDelete = (block) => {
    setAnchorEl(null); // TODO: check if this is still needed
    removeBlock(block);
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

  const onClickEditBtn = (block) => (e) => {
    e.stopPropagation();

    if (
      block.type === 'attendees' ||
      block.type === 'actions' ||
      block.type === 'notes'
    ) {
      return;
    }

    setActiveBlock(block);
    if (block.type === 'battle-cards') {
      navigate('/app/frameworks/templates/blocks/battle-cards');
      return;
    }

    navigate('/app/frameworks/templates/blocks/elements');
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
    const reorderedBlocks = [...activeTemplate.blocks];
    const removedBlock = reorderedBlocks.splice(source.index, 1)[0];
    reorderedBlocks.splice(destination.index, 0, removedBlock);
    setBlocks(reorderedBlocks);
  };

  const onMouseDownDragBtn = (block) => (e) => {
    e.stopPropagation();

    if (activeBlock) {
      const selected = document.getElementById(activeBlock.id);
      if (!selected) return;
      selected.blur();
    }
    setActiveBlock(block);
  };

  const onClickMoreBtn = (block) => (e) => {
    e.currentTarget.style.cssText = `position:absolute;right:16px;display:block`;
    setAnchorEl(e.currentTarget);
    setActiveBlock(block);
  };

  const onCloseMoreMenu = () => {
    anchorEl.style.cssText = '';
    setAnchorEl(null);
  };

  return (
    <>
      <Paper sx={{ ...classes.paper }}>
        <Box sx={{ ...classes.createBlocks }}>
          <Input
            sx={{ ...classes.addInput }}
            placeholder="Create a block..."
            value={newBlockName}
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
          <Droppable droppableId="1">
            {(provided) => (
              <List
                ref={provided.innerRef}
                {...provided.droppableProps}
                sx={{ ...classes.list }}
                component="nav"
                aria-label="Created templates"
              >
                {activeTemplate?.blocks?.map((block, index) => {
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
                          button
                          aria-controls="template-menu"
                          aria-label="template blocks"
                          onClick={onClickListItem(block)}
                          className={clsx(
                            'listItem',
                            { active: block.active },
                            { dragging: snapshot.isDragging }
                          )}
                        >
                          {/* <CustomInput
                            id={block.id}
                            className={clsx(
                              customInputClasses.root,
                              styles.customInput
                            )}
                            value={customInputValues[block.id] || ''}
                            placeholder="Template Name"
                            inputProps={{ 'aria-label': 'Template Name' }}
                            onChange={onChangeCustomInput(block)}
                            onBlur={onBlurCustomInput(block)}
                            onKeyPress={onKeyPressCustomInput(block)}
                            error={customInputError[block.id]}
                          /> */}
                          <TextField
                            sx={{ ...classes.textField }}
                            id={block.id}
                            label={block.type.replace('-', ' ')}
                            value={customInputValues[block.id] || ''}
                            onChange={onChangeCustomInput(block)}
                            onBlur={onBlurCustomInput(block)}
                            onKeyPress={onKeyPressCustomInput(block)}
                            error={customInputError[block.id]}
                            variant="outlined"
                            multiline
                            disabled={block.system}
                          />
                          <IconButton
                            className={clsx({ display: !snapshot.isDragging })}
                            sx={{ ...classes.iconButton }}
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
                            className={clsx({ display: !snapshot.isDragging })}
                            sx={{ ...classes.iconButton }}
                            color="primary"
                            onClick={onClickDeleteBtn(block)}
                            disabled={block.system}
                            size="large"
                          >
                            <DeleteIcon />
                          </IconButton>
                          <IconButton
                            {...provided.dragHandleProps}
                            className={clsx({ display: !snapshot.isDragging })}
                            sx={{ ...classes.iconButton }}
                            color="primary"
                            onMouseDown={onMouseDownDragBtn(block)}
                            disabled={block.system}
                            size="large"
                          >
                            <DragIndicatorIcon />
                          </IconButton>
                          <IconButton
                            className={clsx({ display: !snapshot.isDragging })}
                            sx={{ ...classes.iconButton }}
                            color="primary"
                            onClick={onClickMoreBtn(block)}
                            disabled={block.system}
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
      <MoreMenu anchorEl={anchorEl} onCloseMoreMenu={onCloseMoreMenu} />
    </>
  );
}

Blocks.propTypes = {
  activeTemplate: object, // eslint-disable-line
  activeBlock: object, // eslint-disable-line
  setActiveBlock: func.isRequired,
  setBlocks: func.isRequired,
  setBlock: func.isRequired,
  removeBlock: func.isRequired,
  setBlockName: func.isRequired,
  setAlert: func.isRequired,
  setAlertDialog: func.isRequired,
};

export default Blocks;
