/* eslint-disable react/display-name */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { object, func, array, bool } from 'prop-types';
import clsx from 'clsx';

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import {
  severity,
  dialog,
  EMAIL_COPIED_TO_CLIPBOARD,
} from '../../../constants/notifications';
import { uuid } from '../../../utils/data';

import EditFrameworkModal from './EditFrameworkModal';
import classes from './CallEventTemplate.styles';

/**
 * CallEventTemplate
 * @param {*} props
 * Docs: Assign a template to a selected call event.
 *
 * Once a template is assigned to a call event it becomes a unique framework to that call event
 * and can no longer be edited by the framework builder.
 *
 * Once a call event starts, or its past the start time of the event the framework template
 * get locked and the template can be change out for another one or elements added to its
 * blocks. However the data in the framework can still be edited.
 *
 */

const CallEventTemplate = (props) => {
  const {
    activeCall,
    activeWinCallEvent,
    removeCallEventAttendee,
    addFrameworkTemplate,
    addTemplateFrameworkLibrary,
    setFrameworkTemplate,
    setAlert,
    setAlertDialog,
    setCallEventModal,
    setCallEventNote,
    updateCallEventElement,
    templates,
    history,
  } = props;

  const [frameworkSelect, setFrameworkSelect] = useState('');
  const [templateOptions, setTemplateOptions] = useState(null);
  const [researchFieldValues, setResearchFieldValues] = useState({});
  const [answerFieldValues, setAnswerFieldValues] = useState({});
  const [checkBoxValues, setCheckBoxValues] = useState({});
  const [notesValue, setNotesValue] = useState('');
  // TODO: add accordionState of the template page into the redux store
  const [accordionState, setAccordionState] = useState(null);

  const select = useRef();

  useEffect(() => {
    if (!activeCall || templates.length === 0) return;
    const {
      frameworkTemplate: { id, label, locked },
    } = activeCall;
    const option = { id, label };
    setFrameworkSelect('');

    // framework template is locked
    if (locked) {
      setTemplateOptions([option]);
      setFrameworkSelect(option);
      return;
    }

    // framework template has been set
    if (id) {
      setTemplateOptions([option, { id: 'none', label: 'None' }, ...templates]);
      setFrameworkSelect(option);
      // setFrameworkSelect('');
      return;
    }

    // framework template is not set
    setTemplateOptions([{ id: 'none', label: 'None' }, ...templates]);
  }, [activeCall, templates]);

  useEffect(() => {
    if (
      !activeCall?.frameworkTemplate?.blocks ||
      !activeCall.frameworkTemplate.id
    ) {
      return;
    }
    const {
      frameworkTemplate: { blocks },
    } = activeCall;

    // set element.type: 'research-field', 'question-answer' and 'check-list' initial state
    // TODO: refactor to a single helper function
    const researchFields = {};
    const answerFields = {};
    const checkBoxes = {};
    const notes = {};
    blocks.forEach((block) => {
      const { id } = block;
      if (id === 'actions' || id === 'attendees') return;
      if (blocks === 0) return;

      blocks.forEach((b) => {
        if (!b.elements) return;
        b.elements.forEach((element) => {
          if (element.type === 'research-field') {
            researchFields[element.id] = element.value;
          }
          if (element.type === 'question-answer') {
            answerFields[element.id] = element.value;
          }
          if (element.type === 'check-list') {
            checkBoxes[element.id] = element.value;
          }
          if (element.type === 'notes-field') {
            notes[element.id] = element.value;
          }
        });
      });
    });

    setResearchFieldValues(researchFields);
    setAnswerFieldValues(answerFields);
    setCheckBoxValues(checkBoxes);
    setNotesValue(notes);

    // reset field values
    return () => { // eslint-disable-line
      setResearchFieldValues({});
      setAnswerFieldValues({});
      setCheckBoxValues({});
      setNotesValue({});
    };
  }, [activeCall]);

  const onConfirmation = (value, template) => {
    // assign template to call event
    if (!activeCall.frameworkTemplate.id) {
      addFrameworkTemplate(template, activeCall);
    }

    // update sales coach template
    if (activeCall.frameworkTemplate.id) {
      setFrameworkTemplate(template, activeCall);
    }

    // set select options
    if (template.id) {
      const option = {
        id: template.id,
        label: template.label,
      };
      const options = [option, ...templateOptions];

      setTemplateOptions(
        value ? options : templateOptions.filter((o) => !o.label.includes('*'))
      );
      setFrameworkSelect(value ? options[2] : '');
    }

    // set select value
    setTimeout(() => {
      document.getElementById('select-framework-template').blur();
    }, 0);
    setAlertDialog({ open: false });
  };

  /**
   * Assign or unassign a library template to a call event
   * @param {*} event - input change event obj
   * @returns undefined
   */
  // TODO: don't allow template changes past the time and date of an event!!!
  const onFrameworkChange = (event) => {
    const { value } = event.target;
    const id = value ? uuid() : null;
    const label = value ? `${value.label}*` : '';
    let blocks = value ? value.blocks : null;

    // an assigned template is no longer a system template
    if (blocks) {
      blocks = blocks.map((b) => {
        // copy and return blocks
        const block = { ...b };
        block.system = false;

        // turn this on when tested more
        // look into how the call event window updates the elements on these block types
        // if (block.type === 'attendees' || block.type === 'actions' || block.type === 'notes') {
        //   return block;
        // }

        // copy and return elements
        block.elements = b.elements.map((e) => {
          const element = { ...e };

          if (element.type === 'talk-track' || element.type === 'battle-card') {
            return element;
          }

          element.system = false;

          // NOTE: Battle card and talk tracks are all system until the user creates more

          return element;
        });

        return block;
      });
    }

    // create sales coach template
    const template = {
      id,
      label,
      locked: false,
      blocks,
    };

    if (
      templateOptions[0]?.label?.includes('*') &&
      !value?.label?.includes('*')
    ) {
      setAlertDialog({
        open: true,
        title: dialog.title.FRAMEWORK_TEMPLATE_CONFIRMATION,
        message: `
          Are you sure you want to change framework templates?
          If you change templates now you will lose all the data associated to that framework template.
          This action can't be undone.
        `,
        type: dialog.type.CONFIRM,
        action: () => onConfirmation(value, template),
      });
      return;
    }

    onConfirmation(value, template);
  };

  const ModalContent = forwardRef((refProps, ref) => {
    return (
      <div {...refProps} ref={ref}>
        <EditFrameworkModal />
      </div>
    );
  });

  /**
   * Open the model which edits assigned templates
   */
  const onClickEditBtn = () => {
    const template = {};
    // deep copy of blocks
    const blocks = activeCall.frameworkTemplate.blocks?.map((b) => {
      const block = { ...b };
      block.elements = b.elements.map((e) => {
        const element = { ...e };
        if (element.type === 'battle-card') {
          element['talk-tracks'] = e['talk-tracks'].map((t) => {
            const talkTrack = { ...t };
            return talkTrack;
          });
          return element;
        }
        return element;
      });

      return block;
    });

    template.blocks = blocks;
    template.id = activeCall.frameworkTemplate.id;
    template.label = activeCall.frameworkTemplate.label;
    template.locked = activeCall.frameworkTemplate.locked;

    setCallEventModal({
      open: true,
      onClose: () => {
        history.push('/app/calls/templates/modal/blocks');
      },
      template,
      children: <ModalContent />,
    });
  };

  /**
   * Add the assigned framework template to the templates library
   * This allows the user to add an assigned framework template which
   * has been edited to the template library
   */
  const onClickAddBtn = () => {
    const { frameworkTemplate } = activeCall;
    addTemplateFrameworkLibrary(frameworkTemplate);
  };

  const onResearchFieldChange = (e) => {
    const { id, value } = e.target;

    setResearchFieldValues({
      ...researchFieldValues,
      [id]: value,
    });
  };

  const onResearchFieldBlur = (blockId) => (e) => {
    const { id, value } = e.target;

    updateCallEventElement({
      eventId: activeCall.id,
      elementId: id,
      blockId,
      value,
    });
  };

  const onAnswerFieldChange = (e) => {
    const { id, value } = e.target;

    setAnswerFieldValues({
      ...answerFieldValues,
      [id]: value,
    });
  };

  const onAnswerFieldBlur = (blockId) => (e) => {
    const { id, value } = e.target;

    updateCallEventElement({
      eventId: activeCall.id,
      elementId: id,
      blockId,
      value,
    });
  };

  const onNoteChange = (e) => {
    const { id, value } = e.target;

    setNotesValue({
      ...notesValue,
      [id]: value,
    });
  };

  const onNoteBlur = (blockId) => (e) => {
    const { value } = e.target;

    setCallEventNote({
      eventId: activeCall.id,
      blockId,
      value,
    });
  };

  const onCheckBoxHandler = (blockId) => (e) => {
    const { id, checked } = e.target;

    updateCallEventElement({
      eventId: activeCall.id,
      elementId: id,
      blockId,
      value: checked,
    });
  };

  const onRemoveAttendee = (email) => () => {
    removeCallEventAttendee({
      eventId: activeCall.id,
      email,
    });
  };

  const onClickCopyEmail = (email) => () => {
    navigator.clipboard
      .writeText(email)
      .then(() => {
        setAlert({
          open: true,
          duration: 5000,
          severity: severity.INFO,
          message: `${email} ${EMAIL_COPIED_TO_CLIPBOARD}`,
        });
        return true;
      })
      .catch(() => {});
  };

  const onClickOpenEmail = (email) => () => {
    window.location.href = `mailto:${email}`;
  };

  const onChangeAccordion = (block) => (e, toggle) => {
    setAccordionState({
      ...accordionState,
      [block.id]: toggle,
    });
  };

  return (
    <>
      {activeCall && (
        <>
          <Paper sx={{ ...classes.header }} elevation={2}>
            <Typography variant="h6">{activeCall.summary}</Typography>
            <FormControl variant="outlined" sx={{ ...classes.select }}>
              <InputLabel id="select-framework-template-label">
                Sales Coach Template
              </InputLabel>
              <Select
                ref={select}
                labelId="select-framework-template-label"
                id="select-framework-template"
                value={frameworkSelect}
                onChange={onFrameworkChange}
                label="Sales Coach Template"
                placeholder="Sales Coach Template"
                disabled={
                  activeWinCallEvent || activeCall.frameworkTemplate.locked
                }
                IconComponent={
                  activeWinCallEvent || activeCall.frameworkTemplate.locked
                    ? LockOutlinedIcon
                    : ArrowDropDownIcon
                }
              >
                {templateOptions?.map((template) => {
                  if (template.id === 'none') {
                    return (
                      <MenuItem
                        key={template.id}
                        value=""
                        sx={{ ...classes.selectOption }}
                      >
                        <em>{template.label}</em>
                      </MenuItem>
                    );
                  }
                  return (
                    <MenuItem
                      key={template.id}
                      value={template}
                      sx={{ ...classes.selectOption }}
                    >
                      {template.label}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <IconButton
              sx={{ ...classes.editBtn }}
              color="primary"
              onClick={onClickEditBtn}
              disabled={
                activeWinCallEvent ||
                frameworkSelect === '' ||
                activeCall.frameworkTemplate.locked
              }
              size="large"
            >
              <EditOutlinedIcon />
            </IconButton>
            <IconButton
              sx={{ ...classes.addBtn }}
              color="primary"
              onClick={onClickAddBtn}
              disabled={
                activeWinCallEvent ||
                frameworkSelect === '' ||
                activeCall.frameworkTemplate.locked
              }
              size="large"
            >
              <AddCircleIcon />
            </IconButton>
          </Paper>
          <Box sx={{ ...classes.callTemplate }}>
            <Box className="block">
              <Box className="research">
                {activeCall?.frameworkTemplate?.blocks?.map((block) => {
                  if (block.type === 'battle-cards') return null;
                  if (block.type === 'post-call') return null;
                  if (block.type === 'actions') return null;
                  if (block.type === 'notes') return null;
                  return (
                    <Accordion
                      key={block.id}
                      sx={{ ...classes.accordion }}
                      expanded={accordionState?.[block.id] || false}
                      onChange={onChangeAccordion(block)}
                      elevation={0}
                    >
                      <AccordionSummary
                        sx={{ ...classes.summery }}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography sx={{ ...classes.heading }}>
                          {block.label.toUpperCase()}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails sx={{ ...classes.details }}>
                        {block?.elements?.map((element) => {
                          // if (block.type === 'pre-call') {
                          //   return (
                          //     <FormControlLabel
                          //       key={element.id}
                          //       className={formControlClasses.root}
                          //       control={(
                          //         <Checkbox
                          //           id={element.id}
                          //           checked={
                          //             checkBoxValues[element.id] || false
                          //           }
                          //           onChange={onCheckBoxHandler(block.id)}
                          //           name={element.label}
                          //         />
                          //       )}
                          //       label={element.label}
                          //     />
                          //   );
                          // }
                          if (block.type === 'attendees') {
                            const { responseStatus: status } = element;
                            return (
                              <Box
                                key={element.email}
                                sx={{ ...classes.attendee }}
                              >
                                <AccountCircle
                                  className={clsx({
                                    green: status === 'yes',
                                    red: status === 'no',
                                    orange: status === 'maybe',
                                  })}
                                />
                                <Box>{element.displayName}</Box>
                                <Box style={{ flexGrow: 1 }} />
                                <IconButton
                                  className="iconButton"
                                  onClick={onClickCopyEmail(element.email)}
                                  size="large"
                                >
                                  <FileCopyOutlinedIcon />
                                </IconButton>
                                <IconButton
                                  className="iconButton"
                                  onClick={onClickOpenEmail(element.email)}
                                  size="large"
                                >
                                  <MailOutlineIcon />
                                </IconButton>
                                <IconButton
                                  className="iconButton"
                                  onClick={onRemoveAttendee(element.email)}
                                  size="large"
                                >
                                  <DeleteOutlinedIcon />
                                </IconButton>
                              </Box>
                            );
                          }
                          switch (element.type) {
                            case 'research-field':
                              return (
                                <TextField
                                  key={element.id}
                                  sx={{ ...classes.textField }}
                                  id={element.id}
                                  label={element.label}
                                  value={researchFieldValues[element.id] || ''}
                                  onChange={onResearchFieldChange}
                                  onBlur={onResearchFieldBlur(block.id)}
                                  variant="outlined"
                                  multiline
                                  fullWidth
                                />
                              );
                            case 'question-answer':
                              return (
                                <Box key={element.id}>
                                  <Box className="question">
                                    {element.label}
                                  </Box>
                                  <Box>
                                    <TextField
                                      sx={{ ...classes.answerField }}
                                      id={element.id}
                                      label="Answer"
                                      value={
                                        answerFieldValues[element.id] || ''
                                      }
                                      onChange={onAnswerFieldChange}
                                      onBlur={onAnswerFieldBlur(block.id)}
                                      key={element.id}
                                      variant="outlined"
                                      multiline
                                      fullWidth
                                    />
                                  </Box>
                                </Box>
                              );
                            case 'check-list':
                              return (
                                <FormControlLabel
                                  key={element.id}
                                  sx={{
                                    ...classes.formControl,
                                    '&.MuiFormControlLabel-root': {
                                      margin: '0 -16px',
                                    },
                                  }}
                                  control={
                                    <Checkbox
                                      id={element.id}
                                      checked={
                                        checkBoxValues[element.id] || false
                                      }
                                      onChange={onCheckBoxHandler(block.id)}
                                      name={element.label}
                                      sx={{ ...classes.checkBox }}
                                    />
                                  }
                                  label={element.label}
                                />
                              );
                            case 'talk-track':
                              return (
                                <Box
                                  key={element.id}
                                  sx={{ ...classes.talkTrack }}
                                >
                                  <Box className="bullet">
                                    <FiberManualRecordIcon />
                                  </Box>
                                  <Box className="text">{element.label}</Box>
                                </Box>
                              );
                            default:
                              return null;
                          }
                        })}
                      </AccordionDetails>
                    </Accordion>
                  );
                })}
              </Box>
              <Box className="actionItems">
                {activeCall?.frameworkTemplate?.blocks?.map((block) => {
                  if (
                    block.type === 'actions' ||
                    block.type === 'notes' ||
                    block.type === 'post-call'
                  ) {
                    return (
                      <Accordion
                        key={block.id}
                        sx={{ ...classes.accordion }}
                        expanded={accordionState?.[block.id] || false}
                        onChange={onChangeAccordion(block)}
                        elevation={0}
                      >
                        <AccordionSummary
                          sx={{ ...classes.summery }}
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography sx={{ ...classes.heading }}>
                            {block.label.toUpperCase()}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ ...classes.details }}>
                          {block?.elements?.map((element) => {
                            if (
                              element.type === 'action-item' ||
                              element.type === 'check-list'
                            ) {
                              return (
                                <FormControlLabel
                                  key={element.id}
                                  sx={{
                                    ...classes.formControl,
                                    '&.MuiFormControlLabel-root': {
                                      margin: '0 -16px',
                                    },
                                  }}
                                  control={
                                    <Checkbox
                                      id={element.id}
                                      checked={element.value}
                                      onChange={onCheckBoxHandler(block.id)}
                                      name={element.label}
                                      sx={{ ...classes.checkBox }}
                                    />
                                  }
                                  label={element.label}
                                />
                              );
                            }
                            if (element.type === 'notes-field') {
                              return (
                                <TextField
                                  key={element.id}
                                  sx={{ ...classes.textField }}
                                  id={element.id}
                                  label=""
                                  value={notesValue[element.id] || ''}
                                  onChange={onNoteChange}
                                  onBlur={onNoteBlur(block.id)}
                                  variant="outlined"
                                  fullWidth
                                  multiline
                                />
                              );
                            }
                            return null;
                          })}
                        </AccordionDetails>
                      </Accordion>
                    );
                  }
                  return null;
                })}
              </Box>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

CallEventTemplate.propTypes = {
  addFrameworkTemplate: func.isRequired,
  addTemplateFrameworkLibrary: func.isRequired,
  setFrameworkTemplate: func.isRequired,
  activeWinCallEvent: bool.isRequired,
  activeCall: object, // eslint-disable-line react/forbid-prop-types
  // blocks: array.isRequired, // eslint-disable-line react/forbid-prop-types
  removeCallEventAttendee: func.isRequired,
  setAlert: func.isRequired,
  setAlertDialog: func.isRequired,
  setCallEventModal: func.isRequired,
  setCallEventNote: func.isRequired,
  templates: array.isRequired, // eslint-disable-line react/forbid-prop-types
  updateCallEventElement: func.isRequired,
  history: object.isRequired, // eslint-disable-line react/forbid-prop-types
};

CallEventTemplate.defaultProps = {
  activeCall: {},
};

export default CallEventTemplate;
