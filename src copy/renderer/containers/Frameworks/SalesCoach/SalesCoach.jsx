import React, { useEffect, useState } from 'react';
import { object } from 'prop-types';
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
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import classes from './SalesCoach.styles';

const SalesCoach = (props) => {
  const { activeTemplate } = props;

  const [selectedCard, setSelectedCard] = useState(null);
  const [searchValues, setSearchValues] = useState({});
  const [expanded, setExpanded] = useState({});
  const [battleCardsState, setBattleCardsState] = useState(null);
  const [filteredBattleCards, setFilteredBattleCards] = useState(null);

  // TODO: when templates change and there are open accordions they change if
  // the number of blocks changes store open and closed state for each template
  useEffect(() => {
    if (!activeTemplate?.blocks) return;

    const battleCardsBlocks = activeTemplate.blocks.filter(
      (b) => b.type === 'battle-cards'
    );
    const battleCardsElements = battleCardsBlocks.reduce((state, block) => {
      const battleCard = {};
      battleCard[block.id] = block.elements;
      return { ...state, ...battleCard };
    }, {});

    setBattleCardsState(battleCardsElements);
    setFilteredBattleCards(battleCardsElements);
  }, [activeTemplate]);

  const onChangeAccordion = (panel) => (e, toggle) => {
    setExpanded({ ...expanded, [panel]: toggle });
  };

  const onChangeSearch = (block) => (e) => {
    setSearchValues({
      ...searchValues,
      [block.id]: e.target.value,
    });

    const battleElements = battleCardsState[block.id].filter((ele) => {
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
    <>
      {activeTemplate?.blocks?.map((block, i) => {
        if (block.type === 'pre-call' || block.type === 'post-call') {
          return null;
        }
        return (
          <Accordion
            key={block.id}
            square
            expanded={expanded[`panel${i}`] || false}
            onChange={onChangeAccordion(`panel${i}`)}
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
                          {filteredBattleCards?.[block.id]?.map((element) => {
                            if (!element) return null;
                            return (
                              <Box key={element?.id}>
                                <MenuItem
                                  onClick={onClickBattleCard(block, element)}
                                  sx={{
                                    '&.MuiButtonBase-root': {
                                      display: 'flex',
                                      justifyContent: 'flex-start',
                                      padding: '6px 16px',
                                    },
                                  }}
                                >
                                  {element?.label}
                                </MenuItem>
                                <Divider
                                  sx={{ '&.MuiDivider-root': { margin: '0' } }}
                                />
                              </Box>
                            );
                          })}
                        </MenuList>
                      )}
                      {selectedCard?.[block.id]?.['talk-tracks'].map(
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
                {/* ALL OTHER BLOCKS */}
                <Box className="actionItem">
                  {block.type === 'actions' && (
                    <>
                      <Input
                        key={block.id}
                        value=""
                        placeholder="Enter an action"
                        onChange={() => {}}
                        sx={{ ...classes.input }}
                        fullWidth
                      />
                      <IconButton
                        onClick={() => {}}
                        size="large"
                        sx={{ ...classes.addBtn }}
                      >
                        <AddCircleIcon sx={{ color: '#fff' }} />
                      </IconButton>
                    </>
                  )}
                  {block.type === 'notes' && (
                    <>
                      <Input
                        key={block.id}
                        value=""
                        placeholder="Enter a note"
                        onChange={() => {}}
                        onKeyPress={() => {}}
                        sx={{ ...classes.input }}
                        fullWidth
                      />
                      <IconButton
                        onClick={() => {}}
                        size="large"
                        sx={{ ...classes.addBtn }}
                      >
                        <AddCircleIcon sx={{ color: '#fff' }} />
                      </IconButton>
                    </>
                  )}
                </Box>
                {block.type === 'attendees' && (
                  <Box key={block.id} className="attendee">
                    <AccountCircle />
                    <Box className="attendee__text">First Last</Box>
                    <Box style={{ flexGrow: 1 }} />
                    <IconButton
                      sx={{ ...classes.attendeeIconBtn }}
                      size="large"
                    >
                      <FileCopyOutlinedIcon />
                    </IconButton>
                    <IconButton
                      sx={{ ...classes.attendeeIconBtn }}
                      size="large"
                    >
                      <MailOutlineIcon />
                    </IconButton>
                    <IconButton
                      sx={{ ...classes.attendeeIconBtn }}
                      size="large"
                    >
                      <DeleteOutlinedIcon />
                    </IconButton>
                  </Box>
                )}
                {block?.elements?.map((element) => {
                  switch (element?.type) {
                    case 'research-field':
                      return (
                        <TextField
                          sx={{ ...classes.textField }}
                          id={element.id}
                          label={element.label}
                          key={element.id}
                          variant="outlined"
                          multiline
                          fullWidth
                        />
                      );
                    case 'question-answer':
                      return (
                        <Box
                          key={element.id}
                          sx={{ ...classes.questionAnswer }}
                        >
                          <Box>{element.label}</Box>
                          <Input multiline fullWidth />
                        </Box>
                      );
                    case 'check-list':
                      return (
                        <FormControlLabel
                          key={element.id}
                          sx={{
                            width: 'calc(100% + 11px)',
                            margin: '0 0 0 -11px',
                          }}
                          control={
                            <Checkbox
                              id={element.id}
                              sx={{ ...classes.checkbox }}
                            />
                          }
                          label={element.label}
                        />
                      );
                    case 'talk-track':
                      return (
                        <Box key={element.id} className="talkTrack">
                          <Box className="talkTrack__bullet">
                            <FiberManualRecordIcon />
                          </Box>
                          <Box className="talkTrack__text">{element.value}</Box>
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
    </>
  );
};

SalesCoach.propTypes = {
  activeTemplate: object, // eslint-disable-line
};

export default SalesCoach;
