import React, { useEffect, useState } from 'react';
import { object, func } from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  MenuList,
  MenuItem,
  Divider,
  Box,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/OutlinedInput';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import AccountCircle from '@mui/icons-material/AccountCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import classes from './CallEventAccordion.styles';

const CallEventAccordion = (props) => {
  const { callEvent, removeCallEventWindowAttendee, updateWinElement } = props;

  const [expanded, setExpanded] = useState({});
  const [actionLabel, setActionLabel] = useState('');
  // const [actionNum, setActionNum] = useState(0);
  const [noteValue, setNoteValue] = useState('');
  const [noteNum, setNoteNum] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);
  const [searchValues, setSearchValues] = useState('');
  const [filteredBattleCards, setFilteredBattleCards] = useState(null);

  const [researchFieldValues, setResearchFieldValues] = useState({});
  const [answerFieldValues, setAnswerFieldValues] = useState({});
  const [checkBoxValues, setCheckBoxValues] = useState({});

  useEffect(() => {
    if (!callEvent) return () => {};

    // find blocks with type === 'battle-cards'
    const battleBlocks = callEvent.frameworkTemplate.blocks.filter(
      (block) => block.type === 'battle-cards'
    );

    const battleElements = battleBlocks.reduce((state, ele) => {
      const stateObj = { ...state };
      stateObj[ele.id] = [...ele.elements];
      return stateObj;
    }, {});

    setFilteredBattleCards(battleElements);

    return () => {
      setFilteredBattleCards(null);
    };
  }, [callEvent]);

  useEffect(() => {
    if (!callEvent) return;

    const {
      frameworkTemplate: { blocks, elements },
    } = callEvent;

    // set element research element initial state
    // TODO: refactor to a single helper function
    const researchFields = {};
    const answerFields = {};
    const checkBox = {};
    blocks.forEach((block) => {
      if (
        block.type === 'actions' ||
        block.type === 'attendees' ||
        block.type === 'notes'
      )
        return;

      block.elements.forEach((element) => {
        if (element.type === 'research-field') {
          researchFields[element.id] = element.value;
        }
        if (element.type === 'question-answer') {
          answerFields[element.id] = element.value;
        }
        if (element.type === 'check-list') {
          checkBox[element.id] = element.value;
        }
      });
    });

    setResearchFieldValues(researchFields);
    setAnswerFieldValues(answerFields);
    setCheckBoxValues(checkBox);

    return () => { // eslint-disable-line
      setResearchFieldValues({});
      setAnswerFieldValues({});
      setCheckBoxValues({});
    };
  }, [callEvent]);

  const handleChange = (panel) => (e, toggle) => {
    setExpanded({ ...expanded, [panel]: toggle });
  };

  // ACTIONS
  const onActionChangeHandler = (e) => {
    setActionLabel(e.target.value);
  };

  const onAddActionHandler = (blockId) => {
    // TODO: action name can't be identical, add validation
    setActionLabel('');
    window.electron.ipcRenderer.updateMainWindow({
      winEvent: 'update-actions',
      eventId: callEvent.id,
      blockId,
      elementId: uuidv4(),
      label: actionLabel,
      type: 'action-item',
    });
  };

  const onAddActionClick = (blockId) => () => {
    onAddActionHandler(blockId);
  };

  const onActionKeyPress = (blockId) => (e) => {
    if (e.key === 'Enter') onAddActionHandler(blockId);
  };

  // NOTES
  const onNoteChangeHandler = (e) => {
    setNoteValue(e.target.value);
  };

  const onAddNoteHandler = (blockId) => {
    const num = noteNum + 1;
    setNoteValue('');

    window.electron.ipcRenderer.updateMainWindow({
      winEvent: 'update-notes',
      eventId: callEvent.id,
      blockId,
      elementId: uuidv4(),
      label: `note-${num}`,
      value: noteValue,
    });

    setNoteNum(num);
  };

  const onAddNoteClick = (blockId) => () => {
    onAddNoteHandler(blockId);
  };

  const onAddNoteEnter = (blockId) => (e) => {
    if (e.key === 'Enter') onAddNoteHandler(blockId);
  };

  // RESEARCH FIELD
  const onResearchFieldChange = (e) => {
    const { id, value } = e.target;

    setResearchFieldValues({
      ...researchFieldValues,
      [id]: value,
    });
  };

  const onResearchFieldBlur = (blockId, ele) => (e) => {
    const { value } = e.target;

    updateWinElement({
      blockId,
      id: ele.id,
      value,
    });

    window.electron.ipcRenderer.updateMainWindow({
      winEvent: 'update-elements',
      eventId: callEvent.id,
      blockId,
      elementId: ele.id,
      value,
    });
  };

  // QUESTION ANSWER
  const onAnswerFieldChange = (e) => {
    const { id, value } = e.target;

    setAnswerFieldValues({
      ...answerFieldValues,
      [id]: value,
    });
  };

  const onAnswerFieldBlur = (blockId, ele) => (e) => {
    const { value } = e.target;

    updateWinElement({
      blockId,
      id: ele.id,
      value,
    });

    window.electron.ipcRenderer.updateMainWindow({
      winEvent: 'update-elements',
      eventId: callEvent.id,
      blockId,
      elementId: ele.id,
      value,
    });
  };

  // CHECK LIST
  const onCheckBoxChange = (blockId, ele) => (e) => {
    const { checked } = e.target;

    setCheckBoxValues({
      ...checkBoxValues,
      [ele.id]: checked,
    });

    updateWinElement({
      blockId,
      id: ele.id,
      value: checked,
    });

    window.electron.ipcRenderer.updateMainWindow({
      winEvent: 'update-elements',
      eventId: callEvent.id,
      blockId,
      elementId: ele.id,
      value: checked,
    });
  };

  const onClickCopyEmail = (email) => () => {
    navigator.clipboard
      .writeText(email)
      .then(() => {
        // TODO: add alert to tell the user the email was copied
        // TODO: add alerts to CallEventAccordion
        // setAlert({
        //   open: true,
        //   duration: 5000,
        //   severity: severity.INFO,
        //   message: `${email} ${EMAIL_COPIED_TO_CLIPBOARD}`
        // });
        return true;
      })
      .catch(() => {});
  };

  const onClickOpenEmail = (email) => () => {
    window.location.href = `mailto:${email}`;
  };

  // REMOVE ATTENDEE
  const onDeleteAttendee = (blockId, attendee) => () => {
    removeCallEventWindowAttendee({ blockId, attendee });
    window.electron.ipcRenderer.updateMainWindow({
      winEvent: 'remove-attendee',
      eventId: callEvent.id,
      blockId,
      attendee,
    });
  };

  // BATTLE CARDS
  const onChangeSearch = (block) => (e) => {
    setSearchValues({
      ...searchValues,
      [block.id]: e.target.value,
    });

    const battleBlock = callEvent.frameworkTemplate.blocks.filter(
      (b) => b.id === block.id
    )[0];

    const battleElements = battleBlock.elements.filter((ele) => {
      return ele.label.toLowerCase().includes(e.target.value.toLowerCase());
    });

    setFilteredBattleCards({
      ...filteredBattleCards,
      [block.id]: battleElements,
    });
  };

  const onClickBattleCard = (block, element) => () => {
    setSelectedCard({
      ...selectedCard,
      [block.id]: element,
    });
  };

  const onClickCancelBattleCard = (block) => () => {
    setSelectedCard({
      ...selectedCard,
      [block.id]: null,
    });
  };

  return (
    <Box>
      {callEvent?.frameworkTemplate?.blocks.map((block, i) => {
        if (block.type === 'pre-call' || block.type === 'post-call') {
          return null;
        }
        return (
          <Accordion
            key={block.id}
            square
            expanded={expanded[`panel${i}`] || false}
            onChange={handleChange(`panel${i}`)}
            sx={{ ...classes.accordion }}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
              sx={{ ...classes.accordionSummary }}
            >
              <Typography>{block.label}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ ...classes.accordionDetails }}>
              <Box sx={{ ...classes.elements }}>
                {block.type === 'battle-cards' && (
                  <Box className="battleCards">
                    <Box sx={{ ...classes.search }}>
                      <InputBase
                        placeholder="Search…"
                        value={
                          selectedCard?.[block.id]?.label ||
                          searchValues[block.id] ||
                          ''
                        }
                        onChange={onChangeSearch(block)}
                        inputProps={{ 'aria-label': 'search' }}
                        disabled={!!selectedCard?.[block.id]}
                        fullWidth
                      />
                      {!selectedCard?.[block.id] && (
                        <Box className="searchIcon">
                          <SearchIcon />
                        </Box>
                      )}
                      {selectedCard?.[block.id] && (
                        <Box className="cancelIcon">
                          <IconButton
                            onClick={onClickCancelBattleCard(block)}
                            size="large"
                          >
                            <CancelOutlinedIcon />
                          </IconButton>
                        </Box>
                      )}
                    </Box>
                    <Box className="battleCards__list">
                      {!selectedCard?.[block.id] && (
                        <MenuList>
                          <Divider />
                          {filteredBattleCards &&
                            filteredBattleCards[block.id] &&
                            filteredBattleCards[block.id].map((element) => {
                              return (
                                <Box key={element.id}>
                                  <MenuItem
                                    onClick={onClickBattleCard(block, element)}
                                  >
                                    {element.label}
                                  </MenuItem>
                                  <Divider
                                    sx={{
                                      '&.MuiDivider-root': { margin: '0' },
                                    }}
                                  />
                                </Box>
                              );
                            })}
                        </MenuList>
                      )}
                      {selectedCard?.[block.id] &&
                        selectedCard?.[block.id]['talk-tracks'].map(
                          (talkTrack) => {
                            return (
                              <Box key={talkTrack.id} className="talkTrack">
                                <Box className="talkTrack__bullet">
                                  <FiberManualRecordIcon />
                                </Box>
                                <Box className="talkTrack__text">
                                  {talkTrack.value}
                                </Box>
                              </Box>
                            );
                          }
                        )}
                    </Box>
                  </Box>
                )}
                <Box className="actionItem">
                  {block.type === 'actions' && (
                    <>
                      <Input
                        id={`add-${block.id}`}
                        value={actionLabel}
                        placeholder="enter an action"
                        onChange={onActionChangeHandler}
                        onKeyPress={onActionKeyPress(block.id)}
                        sx={{ ...classes.input }}
                        fullWidth
                      />
                      <IconButton
                        id={`add-${block.id}`}
                        onClick={onAddActionClick(block.id)}
                        size="large"
                        sx={{
                          padding: '6px',
                          margin: '0 -12px 0 4px',
                        }}
                      >
                        <AddCircleIcon sx={{ color: '#fff' }} />
                      </IconButton>
                    </>
                  )}
                  {block.type === 'notes' && (
                    <>
                      <Input
                        id={`add-${block.id}`}
                        value={noteValue}
                        placeholder="enter a note"
                        onChange={onNoteChangeHandler}
                        onKeyPress={onAddNoteEnter(block.id)}
                        sx={{ ...classes.input }}
                        fullWidth
                      />
                      <IconButton
                        id={`add-${block.id}`}
                        onClick={onAddNoteClick(block.id)}
                        size="large"
                        sx={{
                          padding: '6px',
                          margin: '0 -12px 0 4px',
                        }}
                      >
                        <AddCircleIcon sx={{ color: '#fff' }} />
                      </IconButton>
                    </>
                  )}
                </Box>
                {block?.elements?.map((ele) => {
                  if (block.type === 'attendees') {
                    return (
                      <Box className="attendee" key={ele.email}>
                        <AccountCircle />
                        <Box className="attendee__text">{ele.displayName}</Box>
                        <Box style={{ flexGrow: 1 }} />
                        <IconButton
                          sx={{
                            margin: '0 -12px 0 0',
                            color: 'inherit',
                          }}
                          onClick={onClickCopyEmail(ele.email)}
                          size="large"
                        >
                          <FileCopyOutlinedIcon />
                        </IconButton>
                        <IconButton
                          sx={{
                            margin: '0 -12px 0 0',
                            color: 'inherit',
                          }}
                          onClick={onClickOpenEmail(ele.email)}
                          size="large"
                        >
                          <MailOutlineIcon />
                        </IconButton>
                        <IconButton
                          sx={{
                            margin: '0 -12px 0 0',
                            color: 'inherit',
                          }}
                          onClick={onDeleteAttendee(block.id, ele)}
                          size="large"
                        >
                          <DeleteOutlinedIcon />
                        </IconButton>
                      </Box>
                    );
                  }
                  switch (ele.type) {
                    case 'research-field':
                      return (
                        <TextField
                          sx={{ ...classes.textField }}
                          id={ele.id}
                          label={ele.label}
                          value={researchFieldValues[ele.id] || ''}
                          onChange={onResearchFieldChange}
                          onBlur={onResearchFieldBlur(block.id, ele)}
                          key={ele.id}
                          variant="outlined"
                          multiline
                          fullWidth
                        />
                      );
                    case 'question-answer':
                      return (
                        <Box key={ele.id} sx={{ ...classes.questionAnswer }}>
                          <Box>{ele.label}</Box>
                          <Input
                            id={ele.id}
                            value={answerFieldValues[ele.id] || ''}
                            onChange={onAnswerFieldChange}
                            onBlur={onAnswerFieldBlur(block.id, ele)}
                            multiline
                            fullWidth
                          />
                        </Box>
                      );
                    case 'check-list':
                      return (
                        <FormControlLabel
                          key={ele.id}
                          sx={{
                            width: 'calc(100% + 11px)',
                            margin: '0 0 0 -11px',
                          }}
                          control={
                            <Checkbox
                              id={ele.id}
                              checked={checkBoxValues[ele.id] || false}
                              onChange={onCheckBoxChange(block.id, ele)}
                              sx={{ ...classes.checkbox }}
                            />
                          }
                          label={ele.label}
                        />
                      );
                    case 'talk-track':
                      return (
                        <Box key={ele.id} className="talkTrack">
                          <Box className="talkTrack__bullet">
                            <FiberManualRecordIcon />
                          </Box>
                          <Box className="talkTrack__text">
                            {ele.value || ele.label}
                          </Box>
                        </Box>
                      );
                    default:
                      return null;
                  }
                })}
              </Box>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
};

CallEventAccordion.propTypes = {
  callEvent: object, // eslint-disable-line
  removeCallEventWindowAttendee: func.isRequired,
  updateWinElement: func.isRequired,
};

export default CallEventAccordion;
