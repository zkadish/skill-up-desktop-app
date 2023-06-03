import React, { useState, useEffect } from 'react';
import { object, func, array } from 'prop-types';
import clsx from 'clsx';
import Paper from '@mui/material/Paper';
import Input from '@mui/material/OutlinedInput';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import TextField from '@mui/material/TextField';
import InputBase from '@mui/material/InputBase';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { Box, IconButton, List, ListItem } from '@mui/material';

import Spinner from '../../../components/Spinner';
import { severity, dialog } from '../../../constants/notifications';
import { isEmpty, notUnique } from '../utils/validation';
import { uuid } from '../../../utils/data';

import classes from './BattleCardLibrary.styles';

const BattleCardLibrary = (props) => {
  const {
    activeBlock,
    // activeBattleCard,
    activeLibraryBattleCard,
    setActiveLibraryBattleCard,
    setLibraryBattleCards,
    removeLibraryBattleCard,
    removeBattleCard,
    setFilteredLibraryBattleCards,
    setLibraryBattleCard,
    setLibraryBattleCardName,
    addLibraryBattleCard,
    setAlert,
    setAlertDialog,
    battleCards,
    filteredBattleCards,
    history,
  } = props;

  const [newElementName, setNewElementName] = useState('');
  const [customInputValues, setCustomInputValues] = useState({});
  const [addInputError, setAddInputError] = useState(false);
  const [customInputError, setCustomInputError] = useState({});
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const libraryIds = activeBlock.elements.map((e) => e.library_id);
    const libBattleCards = battleCards.map((b) => {
      const battleCard = { ...b };
      if (libraryIds.includes(battleCard.library_id)) {
        battleCard.selected = true;
        return battleCard;
      }
      battleCard.selected = false;
      return battleCard;
    });
    setLibraryBattleCards(libBattleCards);
  }, [activeBlock]);

  useEffect(() => {
    if (!battleCards) return;

    const battleCardsInputValues = battleCards.reduce((state, ele) => {
      return {
        ...state,
        [ele.id]: ele.label,
      };
    }, {});
    setCustomInputValues(battleCardsInputValues);
  }, [battleCards]);

  const onClickAddBtn = (type) => () => {
    const cleanValue = newElementName.trim();
    if (isEmpty(cleanValue)) return;

    const id = uuid();
    const battleCard = {
      id,
      corporate_id: null,
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

  const onClickListItem = (battleCard) => () => {
    if (activeLibraryBattleCard?.id === battleCard.id) return;
    setActiveLibraryBattleCard(battleCard);
  };

  const onChangeCustomInput = (element) => (e) => {
    // TODO: this function needs to be refactored and doesn't make sense
    // in the battle card library context
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

  const onBlurCustomInput = (bc) => () => {
    const battleCard = { ...bc };
    if (customInputError[battleCard.id]) {
      setCustomInputValues({
        ...customInputValues,
        [battleCard.id]: battleCard.label,
      });
      setCustomInputError({
        ...customInputError,
        [battleCard.id]: false,
      });
      return;
    }

    const newValue = customInputValues[battleCard.id].trim();
    if (newValue === activeLibraryBattleCard?.label) return;
    battleCard.label = customInputValues[battleCard.id];
    battleCard.active = true;

    setLibraryBattleCardName(battleCard);
    setActiveLibraryBattleCard(battleCard);
  };

  const onKeyPressCustomInput = (battleCard) => (e) => {
    if (customInputError[battleCard.id]) return;
    if (e.key === 'Enter') {
      onBlurCustomInput(battleCard)();
    }
  };

  const onClickEditBtn = (battleCard) => (e) => {
    e.stopPropagation();

    setActiveLibraryBattleCard(battleCard);
    history.push('/app/library/battle-cards/talk-tracks');
  };

  const onDelete = (battleCard) => {
    setAlertDialog({ open: false });
    removeBattleCard(battleCard, activeBlock);
    removeLibraryBattleCard(battleCard);
  };

  const onClickDeleteBtn = (battleCard) => (e) => {
    e.stopPropagation();

    setAlertDialog({
      open: true,
      title: dialog.title.DELETE_CONFIRMATION,
      message: `Are you sure you want to delete the "${battleCard.label}" battle card from the library? This will delete all instances of the battle card.`,
      type: dialog.type.DELETE,
      action: () => onDelete(battleCard),
    });
  };

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

  const onAddLibraryBattleCard = (b) => () => {
    const battleCard = { ...b };
    battleCard.container_id = activeBlock.id;
    addLibraryBattleCard(battleCard, activeBlock);
  };

  return (
    <Paper sx={{ ...classes.paper }}>
      <Box sx={{ ...classes.createElements }}>
        <Box sx={{ ...classes.search }}>
          <InputBase
            placeholder="Search..."
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
          filteredBattleCards.map((battleCard) => {
            return (
              <ListItem
                key={battleCard.id}
                button
                aria-controls="template-menu"
                aria-label="when device is locked"
                onClick={onClickListItem(battleCard)}
                className={clsx(
                  'listItem',
                  { selected: battleCard.selected },
                  { active: battleCard.active }
                )}
              >
                <IconButton
                  className={clsx(
                    'display',
                    { selectedDisplay: battleCard.selected },
                    'addBtn'
                  )}
                  color="primary"
                  onClick={onAddLibraryBattleCard(battleCard)}
                  disabled={
                    customInputError[battleCard.id] || activeBlock.system
                  }
                  size="large"
                >
                  <AddCircleOutlineIcon />
                </IconButton>
                <TextField
                  sx={{ ...classes.textField }}
                  id={battleCard.id}
                  label={battleCard.type.replace('-', ' ')}
                  value={customInputValues[battleCard.id] || ''}
                  onChange={onChangeCustomInput(battleCard)}
                  onBlur={onBlurCustomInput(battleCard)}
                  onKeyPress={onKeyPressCustomInput(battleCard)}
                  error={customInputError[battleCard.id]}
                  variant="outlined"
                  multiline
                  disabled={battleCard.system}
                />
                <IconButton
                  className="display"
                  sx={{ ...classes.iconButton }}
                  color="primary"
                  onClick={onClickEditBtn(battleCard)}
                  disabled={customInputError[battleCard.id]}
                  size="large"
                >
                  <EditOutlinedIcon />
                </IconButton>
                <IconButton
                  className="display"
                  sx={{ ...classes.iconButton }}
                  color="primary"
                  onClick={onClickDeleteBtn(battleCard)}
                  disabled={battleCard.system}
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
};

BattleCardLibrary.propTypes = {
  activeBlock: object.isRequired, // eslint-disable-line
  removeBattleCard: func.isRequired,
  addLibraryBattleCard: func.isRequired,
  setLibraryBattleCard: func.isRequired,
  setActiveLibraryBattleCard: func.isRequired,
  activeTemplate: object, // eslint-disable-line
  activeLibraryBattleCard: object, // eslint-disable-line
  setFilteredLibraryBattleCards: func.isRequired, // eslint-disable-line
  setLibraryBattleCardName: func.isRequired,
  setLibraryBattleCards: func.isRequired,
  removeLibraryBattleCard: func.isRequired,
  setAlert: func.isRequired,
  setAlertDialog: func.isRequired,
  history: object.isRequired, // eslint-disable-line
  filteredBattleCards: array, // eslint-disable-line
  battleCards: array // eslint-disable-line
};

export default BattleCardLibrary;
