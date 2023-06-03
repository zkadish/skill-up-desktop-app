import React, { useEffect, useState } from 'react';
import { object } from 'prop-types';
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  MenuList,
  MenuItem,
  Divider,
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/OutlinedInput';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

// import { green } from '@material-ui/core/colors';

import styles from './SalesCoach.module.scss';
import scss from '../../../styles/_variables.module.scss';

const outLinedInputStyles = makeStyles(() => ({
  root: {
    margin: '0',
    height: '36px',
    color: '#fff',
    backgroundColor: 'rgba(255, 255, 255, .1)',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(255, 255, 255, .75)',
    },
    '&.Mui-focused': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(255, 255, 255, .75)',
        borderWidth: '1px',
      },
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(255, 255, 255, 1)',
    },
  },
}));

const questionAnswerStyles = makeStyles(() => ({
  container: {
    padding: '6px 0',
  },
  root: {
    margin: '4px 0 0',
    color: '#fff',
    backgroundColor: 'rgba(255, 255, 255, .1)',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(255, 255, 255, .75)',
    },
    '&.Mui-focused': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(255, 255, 255, .75)',
        borderWidth: '1px',
      },
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(255, 255, 255, 1)',
    },
  },
}));

const AccordionWithStyles = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    border: '1px solid rgba(0, 0, 0, .5)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(Accordion);

const AccordionSummaryWithStyles = withStyles({
  root: {
    backgroundColor: 'rgba(255, 255, 255, .05)',
    borderBottom: '1px solid rgba(0, 0, 0, .5)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
    color: 'white',
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(AccordionSummary);

const addCircleIconStyles = makeStyles(() => ({
  root: {
    padding: '6px',
    margin: '0 -12px 0 4px',
  },
  icon: {
    color: '#fff',
  },
}));

const AccordionDetailsWithStyles = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, .15)',
  },
}))(AccordionDetails);

const formControlStyles = makeStyles(() => ({
  root: {
    width: 'calc(100% + 11px)',
    margin: '0 0 0 -11px',
  },
}));

const attendeeStyles = makeStyles({
  green: {
    color: scss.SUCCESS_PRIMARY,
  },
  orange: {
    color: 'orange',
  },
  red: {
    color: 'red',
  },
  iconButton: {
    margin: '0 -12px 0 0',
    color: 'inherit',
  },
});

const textFieldStyles = makeStyles(() => ({
  root: {
    margin: '6px 0',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(255, 255, 255, .5)',
    },
    '&:hover': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(255, 255, 255, .5)',
      },
    },
    '& .MuiOutlinedInput-root.Mui-focused': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(255, 255, 255, .5)',
      },
    },
    '& .MuiInputBase-root': {
      color: '#fff',
    },
    '& .MuiFormLabel-root': {
      width: 'calc(100% - 28px)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      color: 'rgba(255, 255, 255, .5)',
    },
  },
}));

const WhiteCheckbox = withStyles({
  root: {
    color: 'white',
    '&$checked': {
      color: 'white',
    },
  },
  checked: {},
})(props => <Checkbox color="default" {...props} />);

const searchStyles = makeStyles(theme => ({
  search: {
    alignSelf: 'center',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade('#000', 0.15),
    '&:hover': {
      backgroundColor: fade('#000', 0.25),
    },
    marginLeft: 0,
    width: '100%',
    height: '35px',
  },
  searchIcon: {
    position: 'absolute',
    top: '0px',
    right: '0px',
    display: 'flex',
    padding: theme.spacing(0, 1),
    height: '100%',
    pointerEvents: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgba(255, 255, 255, 0.4)',
  },
  cancelIcon: {
    position: 'absolute',
    top: '0px',
    right: '0px',
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    '& .MuiIconButton-root': {
      padding: '6px',
      color: 'rgba(255, 255, 255, 1)',
    },
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 5, 1, 2),
    width: '100%',
    '&::placeholder': {
      color: 'white',
    },
    transition: theme.transitions.create('width'),
    color: 'white',
  },
}));

const menuItemStyles = makeStyles({
  root: {
    display: 'block',
    padding: '8px',
    textOverflow: 'ellipsis',
  },
});

const SalesCoach = props => {
  const { activeTemplate } = props;

  const outLinedInputClasses = outLinedInputStyles();
  const questionAnswerClasses = questionAnswerStyles();
  const formControlClasses = formControlStyles();
  const addCircleIconClasses = addCircleIconStyles();
  const attendeeClasses = attendeeStyles();
  const textFieldClasses = textFieldStyles();
  const searchClasses = searchStyles();
  const menuItemClasses = menuItemStyles();

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
      b => b.type === 'battle-cards',
    );
    const battleCardsElements = battleCardsBlocks.reduce((state, block) => {
      const battleCard = {};
      battleCard[block.id] = block.elements;
      return { ...state, ...battleCard };
    }, {});

    setBattleCardsState(battleCardsElements);
    setFilteredBattleCards(battleCardsElements);
  }, [activeTemplate]);

  const onChangeAccordion = panel => (e, toggle) => {
    setExpanded({ ...expanded, [panel]: toggle });
  };

  const onChangeSearch = block => e => {
    setSearchValues({
      ...searchValues,
      [block.id]: e.target.value,
    });

    const battleElements = battleCardsState[block.id].filter(ele => {
      return ele.value.toLowerCase().includes(e.target.value.toLowerCase());
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

  const onClickCancelBattleCard = block => () => {
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
          <AccordionWithStyles
            key={block.id}
            square
            expanded={expanded[`panel${i}`] || false}
            onChange={onChangeAccordion(`panel${i}`)}
          >
            <AccordionSummaryWithStyles
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <Typography>{block.label}</Typography>
            </AccordionSummaryWithStyles>
            <AccordionDetailsWithStyles>
              <div className={styles.elements}>
                {block.type === 'battle-cards' && (
                  <div className={styles.battleCards}>
                    <div className={searchClasses.search}>
                      <InputBase
                        placeholder="Search…"
                        classes={{
                          root: searchClasses.inputRoot,
                          input: searchClasses.inputInput,
                        }}
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
                        <div className={searchClasses.searchIcon}>
                          <SearchIcon />
                        </div>
                      )}
                      {selectedCard?.[block.id] && (
                        <div className={searchClasses.cancelIcon}>
                          <IconButton onClick={onClickCancelBattleCard(block)}>
                            <CancelOutlinedIcon />
                          </IconButton>
                        </div>
                      )}
                    </div>
                    <div className={styles.battleCards__list}>
                      {!selectedCard?.[block.id] && (
                        <MenuList>
                          <Divider />
                          {filteredBattleCards?.[block.id]?.map(element => {
                            return (
                              <div key={element?.id}>
                                <MenuItem
                                  className={menuItemClasses.root}
                                  onClick={onClickBattleCard(block, element)}
                                >
                                  {element?.label}
                                </MenuItem>
                                <Divider />
                              </div>
                            );
                          })}
                        </MenuList>
                      )}
                      {selectedCard?.[block.id]?.['talk-tracks'].map(
                        talkTrack => {
                          return (
                            <div
                              key={talkTrack.id}
                              className={styles.talkTrack}
                            >
                              <div className={styles.talkTrack__bullet}>
                                <FiberManualRecordIcon />
                              </div>
                              <div className={styles.talkTrack__text}>
                                {talkTrack.value}
                              </div>
                            </div>
                          );
                        },
                      )}
                    </div>
                  </div>
                )}
                {/* ALL OTHER BLOCKS */}
                <div className={styles.actionItem}>
                  {block.type === 'actions' && (
                    <>
                      <Input
                        key={block.id}
                        value=""
                        placeholder="Enter an action"
                        onChange={() => {}}
                        className={outLinedInputClasses.root}
                        fullWidth
                      />
                      <IconButton
                        className={addCircleIconClasses.root}
                        onClick={() => {}}
                      >
                        <AddCircleIcon className={addCircleIconClasses.icon} />
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
                        className={outLinedInputClasses.root}
                        fullWidth
                      />
                      <IconButton
                        className={addCircleIconClasses.root}
                        onClick={() => {}}
                      >
                        <AddCircleIcon className={addCircleIconClasses.icon} />
                      </IconButton>
                    </>
                  )}
                </div>
                {block.type === 'attendees' && (
                  <div key={block.id} className={styles.attendee}>
                    <AccountCircle />
                    <div className={styles.attendee__text}>First Last</div>
                    <div style={{ flexGrow: 1 }} />
                    <IconButton className={attendeeClasses.iconButton}>
                      <FileCopyOutlinedIcon />
                    </IconButton>
                    <IconButton className={attendeeClasses.iconButton}>
                      <MailOutlineIcon />
                    </IconButton>
                    <IconButton className={attendeeClasses.iconButton}>
                      <DeleteOutlinedIcon />
                    </IconButton>
                  </div>
                )}
                {block?.elements?.map(element => {
                  // if (block.type === 'attendees') {
                  //   return (
                  //     <div key={block.id} className={styles.attendee}>
                  //       <AccountCircle />
                  //       <div className={styles.attendee__text}>First Last</div>
                  //       <div style={{ flexGrow: 1 }} />
                  //       <IconButton className={attendeeClasses.iconButton}>
                  //         <FileCopyOutlinedIcon />
                  //       </IconButton>
                  //       <IconButton className={attendeeClasses.iconButton}>
                  //         <MailOutlineIcon />
                  //       </IconButton>
                  //       <IconButton className={attendeeClasses.iconButton}>
                  //         <DeleteOutlinedIcon />
                  //       </IconButton>
                  //     </div>
                  //   );
                  // }
                  switch (element?.type) {
                    case 'research-field':
                      return (
                        <TextField
                          className={textFieldClasses.root}
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
                        <div
                          key={element.id}
                          className={questionAnswerClasses.container}
                        >
                          <div>{element.label}</div>
                          <Input
                            className={questionAnswerClasses.root}
                            multiline
                            fullWidth
                          />
                        </div>
                      );
                    case 'check-list':
                      return (
                        <FormControlLabel
                          key={element.id}
                          className={formControlClasses.root}
                          control={<WhiteCheckbox id={element.id} />}
                          label={element.label}
                        />
                      );
                    case 'talk-track':
                      return (
                        <div key={element.id} className={styles.talkTrack}>
                          <div className={styles.talkTrack__bullet}>
                            <FiberManualRecordIcon />
                          </div>
                          <div className={styles.talkTrack__text}>
                            {element.value}
                          </div>
                        </div>
                      );
                    default:
                      return null;
                  }
                })}
              </div>
            </AccordionDetailsWithStyles>
          </AccordionWithStyles>
        );
      })}
    </>
  );
};

SalesCoach.propTypes = {
  activeTemplate: object, // eslint-disable-line
};

export default SalesCoach;
