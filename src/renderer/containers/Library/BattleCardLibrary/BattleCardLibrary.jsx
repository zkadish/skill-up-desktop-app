import React, { useState, useEffect } from 'react';
import { object, func, array } from 'prop-types';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

import Paper from '@mui/material/Paper';
import Input from '@mui/material/OutlinedInput';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import TextField from '@mui/material/TextField';
import InputBase from '@mui/material/InputBase';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import { IconButton, List, ListItem, Box } from '@mui/material';

import Spinner from '../../../components/Spinner';
import { severity, dialog } from '../../../constants/notifications';
import { isEmpty, notUnique } from '../utils/validation';
import { uuid } from '../../../utils/data';

import classes from './BattleCardLibrary.styles';

function BattleCardLibrary(props) {
  const {
    activeLibraryBattleCard,
    setActiveLibraryBattleCard,
    // setLibraryBattleCards,
    removeLibraryBattleCard,
    setFilteredLibraryBattleCards,
    setLibraryBattleCard,
    setLibraryBattleCardName,
    setAlert,
    setAlertDialog,
    battleCards,
    filteredBattleCards,
  } = props;
  const navigate = useNavigate();

  const [newElementName, setNewElementName] = useState('');
  const [customInputValues, setCustomInputValues] = useState({});
  const [addInputError, setAddInputError] = useState(false);
  const [customInputError, setCustomInputError] = useState({});
  const [searchValue, setSearchValue] = useState('');

  // useEffect(() => {
  //   const libraryIds = activeLibraryBattleCard.elements.map(e => e.library_id);
  //   const libBattleCards = battleCards.map(b => {
  //     const battleCard = { ...b };
  //     if (libraryIds.includes(battleCard.library_id)) {
  //       battleCard.selected = true;
  //       return battleCard;
  //     }
  //     battleCard.selected = false;
  //     return battleCard;
  //   });
  //   setLibraryBattleCards(libBattleCards);
  // }, [activeLibraryBattleCard]);

  useEffect(() => {
    if (!filteredBattleCards) return;

    const battleCardsInputValues = filteredBattleCards.reduce((state, ele) => {
      return {
        ...state,
        [ele.id]: ele.label,
      };
    }, {});
    setCustomInputValues(battleCardsInputValues);
  }, [filteredBattleCards]);

  const onClickAddBtn = (type) => () => {
    const cleanValue = newElementName.trim();
    if (isEmpty(cleanValue)) return;

    const id = uuid();
    const battleCard = {
      id,
      container_id: '',
      account_id: '',
      library_id: uuid(),
      label: cleanValue,
      type,
      'talk-tracks': [],
      active: false,
      system: false,
    };
    setLibraryBattleCard(battleCard);
    setCustomInputValues({
      ...customInputValues,
      [id]: cleanValue,
    });
    setNewElementName('');
  };

  const onChangeAddInput = (e) => {
    const { value } = e.target;

    if (notUnique(filteredBattleCards, value)) {
      setAddInputError(false);
    }
    if (!notUnique(filteredBattleCards, value)) {
      setAlert({
        open: true,
        duration: 5000,
        severity: severity.ERROR,
        message: `Battle card names must be unique, "${value}" already exists.`,
      });
      setAddInputError(true);
      setNewElementName(value);
      return; // can't have 2 templates of the same name
    }

    setNewElementName(value);
  };

  const onKeyPressAddInput = (type) => (e) => {
    if (addInputError) return;
    if (e.key === 'Enter') onClickAddBtn(type)();
  };

  const onClickListItem = (element) => () => {
    if (activeLibraryBattleCard?.id === element.id) return;
    setActiveLibraryBattleCard(element);
  };

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

    if (notUnique(filteredBattleCards, value, element)) {
      setCustomInputError({
        ...customInputError,
        [element.id]: false,
      });
    }
    if (!notUnique(filteredBattleCards, value, element)) {
      setAlert({
        open: true,
        duration: 5000,
        severity: severity.ERROR,
        message: `Battle Card names must be unique, "${value}" already exists.`,
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
    if (newValue === activeLibraryBattleCard?.label) return;
    element.label = customInputValues[element.id];
    element.active = true;

    setLibraryBattleCardName(element);
    setActiveLibraryBattleCard(element);
  };

  const onKeyPressCustomInput = (element) => (e) => {
    if (customInputError[element.id]) return;
    if (e.key === 'Enter') {
      onBlurCustomInput(element)();
    }
  };

  const onClickEditBtn = (element) => (e) => {
    e.stopPropagation();

    setActiveLibraryBattleCard(element);
    navigate('/app/library/battle-cards/talk-tracks');
  };

  const onDelete = (element) => {
    setAlertDialog({ open: false });
    removeLibraryBattleCard(element);
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

  // const onAddToLibrary = battleCard => () => {
  //   // TODO: make sure battleCards in the library have a unique name.
  //   setLibraryBattleCard(battleCard);
  // };

  const onChangeSearchInput = (e) => {
    const key = e.target.value.trimStart();
    setSearchValue(key);
    const searchResults = battleCards.filter((battleCard) => {
      return battleCard.label.toLowerCase().includes(key.toLowerCase());
    });

    setFilteredLibraryBattleCards(searchResults);
  };

  const onClickClearSearch = () => {
    setSearchValue('');

    setFilteredLibraryBattleCards(battleCards);
  };

  return (
    <Paper sx={{ ...classes.paper }}>
      <Box sx={{ ...classes.createElements }}>
        <Box sx={{ ...classes.search }}>
          <InputBase
            placeholder="Search Battle Cards..."
            value={searchValue}
            onChange={onChangeSearchInput}
            inputProps={{ 'aria-label': 'search' }}
          />
          {!searchValue && (
            <Box className="searchIcon">
              <SearchIcon />
            </Box>
          )}
          {!!searchValue && (
            <Box className="cancelIcon">
              <IconButton onClick={onClickClearSearch} size="large">
                <CancelOutlinedIcon />
              </IconButton>
            </Box>
          )}
        </Box>
        <Input
          sx={{ ...classes.addInput }}
          placeholder="Create a battle card..."
          value={newElementName}
          onChange={onChangeAddInput}
          onKeyPress={onKeyPressAddInput('battle-card')}
          error={addInputError}
          fullWidth
        />
        <IconButton
          color="primary"
          sx={{ ...classes.iconButton }}
          onClick={onClickAddBtn('battle-card')}
          disabled={addInputError}
          size="large"
        >
          <AddCircleIcon />
        </IconButton>
      </Box>
      <List
        sx={{ ...classes.list }}
        component="nav"
        aria-label="Created templates"
      >
        {filteredBattleCards.length === 0 && <Spinner type="TRIPLE_SPINNER" />}
        {filteredBattleCards.length > 0 &&
          filteredBattleCards.map((element) => {
            return (
              <ListItem
                button
                key={element.id}
                aria-controls="template-menu"
                aria-label="when device is locked"
                onClick={onClickListItem(element)}
                className={clsx(
                  'listItem',
                  { selected: false },
                  { active: element.active }
                )}
              >
                <TextField
                  sx={{ ...classes.textField }}
                  id={element.id}
                  label={element.type.replace('-', ' ')}
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
                  className="display"
                  sx={{ ...classes.iconButton }}
                  color="primary"
                  onClick={onClickEditBtn(element)}
                  disabled={customInputError[element.id]}
                  size="large"
                >
                  <EditOutlinedIcon />
                </IconButton>
                <IconButton
                  className="display"
                  sx={{ ...classes.iconButton }}
                  color="primary"
                  onClick={onClickDeleteBtn(element)}
                  disabled={element.system}
                  size="large"
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            );
          })}
      </List>
    </Paper>
  );
}

BattleCardLibrary.propTypes = {
  setLibraryBattleCard: func.isRequired,
  setActiveLibraryBattleCard: func.isRequired,
  activeTemplate: object, // eslint-disable-line
  activeLibraryBattleCard: object, // eslint-disable-line
  setFilteredLibraryBattleCards: func.isRequired, // eslint-disable-line
  setLibraryBattleCardName: func.isRequired,
  // setLibraryBattleCards: func.isRequired,
  removeLibraryBattleCard: func.isRequired,
  setAlert: func.isRequired,
  setAlertDialog: func.isRequired,
  filteredBattleCards: array, // eslint-disable-line
  battleCards: array, // eslint-disable-line
};

export default BattleCardLibrary;
