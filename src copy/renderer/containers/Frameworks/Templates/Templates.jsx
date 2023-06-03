import React, { useEffect, useState } from 'react';
import { object, func, array, string } from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import clsx from 'clsx';
import { Box, IconButton } from '@mui/material';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Input from '@mui/material/OutlinedInput';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

import Spinner from '../../../components/Spinner';
import { severity, dialog } from '../../../constants/notifications';
import { uuid } from '../../../utils/data';
import { isEmpty, notUnique, isAllowedChar } from '../utils/validation';

import classes from './Templates.styles';

/**
 * Templates
 * @param {*} props - see index.js for connected props
 * Docs: A templates is the framework for a call event. The template will have pre research information
 * for the sales reps and will also give the rep a way to take extensive notes and reminders during the
 * call.
 *
 * Working issue: Should a template already assigned to a call event be updated by changes made to it
 * in the framework builder? Creating this feature is very involved... and we should start with once
 * a template is assigned it will not be updated by the framework builder. Yeah this makes more sense
 * to me because it was the way the sales rep wanted it when it was assigned. If they want an updated
 * template they can reassign it the new one to the call event before the call takes place.
 *
 * TODO: currently if a framework's name changes it will update the a template which has already been
 * assigned to a call event. This needs to change back so the a name change will not effect an already
 * assigned framework template
 */

const Templates = (props) => {
  const {
    templates,
    activeTemplate,
    setActiveTemplate,
    setTemplates,
    setTemplate,
    removeTemplate,
    setTemplateName,
    setAlert,
    setAlertDialog,
    history,
  } = props;

  const [newTemplateName, setNewTemplateName] = useState('');
  const [customInputValues, setCustomInputValues] = useState({});
  const [addInputError, setAddInputError] = useState(false);
  const [customInputError, setCustomInputError] = useState({});

  useEffect(() => {
    if (templates.length === 0) return;
    const templatesInputValues = templates.reduce((state, ele) => {
      return {
        ...state,
        [ele.id]: ele.label,
      };
    }, {});
    setCustomInputValues(templatesInputValues);
  }, [templates]);

  const onChangeAddInput = (e) => {
    const { value } = e.target;

    // if (isAllowedChar(value)) setAddInputError(false);
    // if (!isAllowedChar(value)) {
    //   setAlert({
    //     open: true,
    //     duration: 5000,
    //     severity: severity.ERROR,
    //     message: `Template names may only contain letters, numbers, dashes, underscores or periods.`
    //   });
    //   setAddInputError(true);
    //   setNewTemplateName(value);
    //   return;
    // }

    if (notUnique(templates, value)) setAddInputError(false);
    if (!notUnique(templates, value)) {
      setAlert({
        open: true,
        duration: 5000,
        severity: severity.ERROR,
        message: `Template names must be unique, "${value}" already exists.`,
      });
      setAddInputError(true);
      setNewTemplateName(value);
      return; // can't have 2 templates of the same name
    }

    setNewTemplateName(value);
  };

  const onClickAddBtn = () => {
    const templateName = newTemplateName.trim();
    // TODO: introduce yup!!!
    if (isEmpty(templateName)) return;

    const id = uuid();

    setTemplate({
      id,
      corporate_id: '',
      account_id: '',
      label: templateName,
      blocks: [],
      system: false,
      active: false,
    }).catch((err) => {
      // TODO: handle errors with a snack bar and possible actions
    });
    setCustomInputValues({
      ...customInputValues,
      [id]: templateName,
    });
    setNewTemplateName('');
  };

  const onKeyPressAddInput = (e) => {
    if (addInputError) return;
    if (e.key === 'Enter') onClickAddBtn();
  };

  const onClickListItem = (template) => () => {
    if (activeTemplate?.id === template.id) return;
    setActiveTemplate(template);
  };

  // change the name of the active template
  const onChangeCustomInput = (template) => (e) => {
    const { value } = e.target;
    // TODO: introduce yup!!!
    if (value) {
      setCustomInputError({
        ...customInputError,
        [template.id]: false,
      });
    }
    if (value === '') {
      setAlert({
        open: true,
        duration: 5000,
        severity: severity.ERROR,
        message: `Templates must have a name.`,
      });
      setCustomInputError({
        ...customInputError,
        [template.id]: true,
      });
      setCustomInputValues({
        ...customInputValues,
        [template.id]: value,
      });
      return;
    }

    // if (isAllowedChar(value)) {
    //   setCustomInputError({
    //     ...customInputError,
    //     [template.id]: false
    //   });
    // }
    // if (!isAllowedChar(value)) {
    //   setAlert({
    //     open: true,
    //     duration: 5000,
    //     severity: severity.ERROR,
    //     message: `Template names may only contain letters, numbers, dashes, underscores or periods.`
    //   });
    //   setCustomInputError({
    //     ...customInputError,
    //     [template.id]: true
    //   });
    //   setCustomInputValues({
    //     ...customInputValues,
    //     [template.id]: value
    //   });
    //   return;
    // }

    if (notUnique(templates, value, template)) {
      setCustomInputError({
        ...customInputError,
        [template.id]: false,
      });
    }
    if (!notUnique(templates, value, template)) {
      setAlert({
        open: true,
        duration: 5000,
        severity: severity.ERROR,
        message: `Template names must be unique, "${value}" already exists.`,
      });
      setCustomInputError({
        ...customInputError,
        [template.id]: true,
      });
      // return; // can't have 2 templates of the same name
    }

    setCustomInputValues({
      ...customInputValues,
      [template.id]: value,
    });
  };

  const onBlurCustomInput = (t) => () => {
    const template = { ...t };
    if (customInputError[template.id]) {
      setCustomInputValues({
        ...customInputValues,
        [template.id]: template.label,
      });
      setCustomInputError({
        ...customInputError,
        [template.id]: false,
      });
      return;
    }

    const newValue = customInputValues[template.id].trim();
    if (newValue === activeTemplate?.label) return;
    template.label = newValue;
    template.active = true;
    setTemplateName(template);
    // TODO: update active state in db???
    setActiveTemplate(template);
  };

  const onKeyPressCustomInput = (template) => (e) => {
    if (customInputError[template.id]) return;
    if (e.key === 'Enter') {
      onBlurCustomInput(template)();
    }
  };

  const onDelete = (template) => {
    removeTemplate(template);
    setAlertDialog({ open: false });
  };

  const onClickDeleteBtn = (template) => (e) => {
    e.stopPropagation();

    setAlertDialog({
      open: true,
      title: dialog.title.DELETE_CONFIRMATION,
      message: `Are you sure you want to delete the "${template.label}" template? This action can not be undone!`,
      type: dialog.type.DELETE,
      action: () => onDelete(template),
    });
  };

  const onClickEditBtn = (template) => (e) => {
    e.stopPropagation();

    setActiveTemplate(template);
    history.push('/app/frameworks/templates/blocks');
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
    const reorderedTemplates = [...templates];
    const removedTemplate = reorderedTemplates.splice(source.index, 1)[0];
    reorderedTemplates.splice(destination.index, 0, removedTemplate);
    setTemplates(reorderedTemplates);
  };

  const onMouseDownDragBtn = (template) => (e) => {
    e.stopPropagation();

    if (activeTemplate) {
      const selected = document.getElementById(activeTemplate.id);
      if (!selected) return;
      selected.blur();
    }

    setActiveTemplate(template);
  };

  return (
    <Paper sx={{ ...classes.paper }}>
      <Box sx={{ ...classes.createTemplate }}>
        <Input
          sx={{ ...classes.addInput }}
          placeholder="Create a template..."
          value={newTemplateName}
          onChange={onChangeAddInput}
          onKeyPress={onKeyPressAddInput}
          error={addInputError}
          fullWidth
        />
        <IconButton
          color="primary"
          sx={{ ...classes.iconButton }}
          onClick={onClickAddBtn}
          disabled={addInputError}
          size="large"
        >
          <AddCircleIcon />
        </IconButton>
      </Box>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="0">
          {(provided) => (
            <List
              ref={provided.innerRef}
              {...provided.droppableProps}
              sx={{ ...classes.list }}
              component="nav"
              aria-label="Created templates"
            >
              {templates.length === 0 && <Spinner type="TRIPLE_SPINNER" />}
              {templates.length > 0 &&
                templates.map((template, index) => {
                  return (
                    <Draggable
                      key={template.id}
                      draggableId={template.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <ListItem
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                          button
                          aria-controls="builder-template"
                          aria-label="parent node of builder template"
                          onClick={onClickListItem(template)}
                          className={clsx(
                            'listItem',
                            { active: template.active },
                            { dragging: snapshot.isDragging }
                          )}
                        >
                          <Input
                            id={template.id}
                            sx={{ ...classes.customInput }}
                            value={customInputValues[template.id] || ''}
                            placeholder="Template Name"
                            inputProps={{ 'aria-label': 'Template Name' }}
                            onChange={onChangeCustomInput(template)}
                            onBlur={onBlurCustomInput(template)}
                            onKeyPress={onKeyPressCustomInput(template)}
                            error={customInputError[template.id]}
                            disabled={template.system}
                          />
                          <IconButton
                            className={clsx({
                              display: !snapshot.isDragging,
                            })}
                            sx={{ ...classes.iconButton }}
                            color="primary"
                            onClick={onClickEditBtn(template)}
                            disabled={customInputError[template.id]}
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
                            onClick={onClickDeleteBtn(template)}
                            disabled={template.system}
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
                            onMouseDown={onMouseDownDragBtn(template)}
                            size="large"
                          >
                            <DragIndicatorIcon id={template.id} />
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
  );
};

Templates.propTypes = {
  activeTemplate: object, // eslint-disable-line
  setActiveTemplate: func.isRequired,
  history: object, // eslint-disable-line
  setTemplates: func.isRequired,
  setTemplate: func.isRequired,
  removeTemplate: func.isRequired,
  setTemplateName: func.isRequired,
  setAlert: func.isRequired,
  setAlertDialog: func.isRequired,
  templates: array // eslint-disable-line
};

export default Templates;
