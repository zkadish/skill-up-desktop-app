import React, { useState, useEffect } from 'react';
import { object, func, array, bool } from 'prop-types';
import clsx from 'clsx';
import Paper from '@mui/material/Paper';
import Input from '@mui/material/OutlinedInput';
// import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import TextField from '@mui/material/TextField';
import InputBase from '@mui/material/InputBase';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { IconButton, List, ListItem, Box } from '@mui/material';

import Spinner from '../../../components/Spinner';
import { severity, dialog } from '../../../constants/notifications';
import { isEmpty, notUnique } from '../utils/validation';
import { uuid } from '../../../utils/data';

import classes from './TalkTrackLibrary.styles';

function TalkTrackLibrary(props) {
  const {
    activeLibraryBattleCard,
    activeLibraryTalkTrack,
    setActiveLibraryTalkTrack,
    setLibraryTalkTracks,
    removeLibraryTalkTrack,
    setFilteredLibraryTalkTracks,
    setLibraryTalkTrack,
    addLibraryTalkTrack,
    setLibraryTalkTrackName,
    setAlert,
    setAlertDialog,
    talkTracks,
    filteredTalkTracks,
    libraryOnly = true,
  } = props;

  const [newElementName, setNewElementName] = useState('');
  const [customInputValues, setCustomInputValues] = useState({});
  const [addInputError, setAddInputError] = useState(false);
  const [customInputError, setCustomInputError] = useState({});
  const [searchValue, setSearchValue] = useState('');
  const [hideAddBtn, setHideAddBtn] = useState(false);

  useEffect(() => {
    if (window.location.hash === '#/app/library/talk-tracks') {
      setHideAddBtn(true);
    }
  }, []);

  useEffect(() => {
    // if (libraryOnly) {
    //   const libTalkTracks = talkTracks.map(b => {
    //     const talkTrack = { ...b };
    //     talkTrack.selected = false;
    //     return talkTrack;
    //   });
    //   setLibraryTalkTracks(libTalkTracks);
    //   return;
    // }
    // if (!activeLibraryBattleCard) return;
    if (activeLibraryBattleCard) {
      const libraryIds = activeLibraryBattleCard['talk-tracks'].map(
        (e) => e.library_id
      );
      const libTalkTracks = talkTracks.map((b) => {
        const talkTrack = { ...b };
        if (libraryIds.includes(talkTrack.library_id)) {
          talkTrack.selected = true;
          return talkTrack;
        }
        talkTrack.selected = false;
        return talkTrack;
      });
      setLibraryTalkTracks(libTalkTracks);
    }
  }, [activeLibraryBattleCard, libraryOnly]);

  useEffect(() => {
    if (!filteredTalkTracks) return;

    const talkTracksInputValues = filteredTalkTracks.reduce((state, ele) => {
      return {
        ...state,
        [ele.id]: ele.value,
      };
    }, {});
    setCustomInputValues(talkTracksInputValues);
  }, [filteredTalkTracks]);

  const onClickAddBtn = (type) => () => {
    const cleanValue = newElementName.trim();
    if (isEmpty(cleanValue)) return;

    const id = uuid();
    const talkTrack = {
      id,
      corporate_id: null,
      account_id: '',
      library_id: uuid(),
      label: cleanValue,
      value: cleanValue,
      type,
      active: false,
      system: false,
    };
    setLibraryTalkTrack(talkTrack);
    setCustomInputValues({
      ...customInputValues,
      [id]: cleanValue,
    });
    setNewElementName('');
  };

  const onChangeAddInput = (e) => {
    const { value } = e.target;

    if (notUnique(filteredTalkTracks, value)) {
      setAddInputError(false);
    }
    if (!notUnique(filteredTalkTracks, value)) {
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

  const onClickListItem = (talkTrack) => () => {
    if (activeLibraryTalkTrack?.id === talkTrack.id) return;
    setActiveLibraryTalkTrack(talkTrack);
  };

  const onChangeCustomInput = (talkTrack) => (e) => {
    const { value } = e.target;

    if (value) {
      setCustomInputError({
        ...customInputError,
        [talkTrack.id]: false,
      });
    }
    if (value === '') {
      let message = '';
      switch (talkTrack.type) {
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
      if (talkTrack.type === 'question-answer') {
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
        [talkTrack.id]: true,
      });
      setCustomInputValues({
        ...customInputValues,
        [talkTrack.id]: value,
      });
      return;
    }

    // if (isAllowedChar(value)) {
    //   setCustomInputError({
    //     ...customInputError,
    //     [talkTrack.id]: false
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
    //     [talkTrack.id]: true
    //   });
    //   setCustomInputValues({
    //     ...customInputValues,
    //     [talkTrack.id]: value
    //   });
    //   return;
    // }

    if (notUnique(filteredTalkTracks, value, talkTrack)) {
      setCustomInputError({
        ...customInputError,
        [talkTrack.id]: false,
      });
    }
    if (!notUnique(filteredTalkTracks, value, talkTrack)) {
      setAlert({
        open: true,
        duration: 5000,
        severity: severity.ERROR,
        message: `Battle Card names must be unique, "${value}" already exists.`,
      });
      setCustomInputError({
        ...customInputError,
        [talkTrack.id]: true,
      });
    }

    setCustomInputValues({
      ...customInputValues,
      [talkTrack.id]: e.target.value,
    });
  };

  const onBlurCustomInput = (ele) => () => {
    const talkTrack = { ...ele };
    if (customInputError[talkTrack.id]) {
      setCustomInputValues({
        ...customInputValues,
        [talkTrack.id]: talkTrack.value,
      });
      setCustomInputError({
        ...customInputError,
        [talkTrack.id]: false,
      });
      return;
    }

    // prevent update if value is the same
    const newValue = customInputValues[talkTrack.id].trim();
    if (newValue === activeLibraryTalkTrack?.value) return;
    // TODO: validate that the value is unique
    talkTrack.label = newValue;
    talkTrack.value = newValue;
    talkTrack.active = true;

    setLibraryTalkTrackName(talkTrack);
    setActiveLibraryTalkTrack(talkTrack);
  };

  const onKeyPressCustomInput = (talkTrack) => (e) => {
    if (customInputError[talkTrack.id]) return;
    if (e.key === 'Enter') {
      onBlurCustomInput(talkTrack)();
    }
  };

  const onDelete = (talkTrack) => {
    setAlertDialog({ open: false });
    removeLibraryTalkTrack(talkTrack);
  };

  const onClickDeleteBtn = (talkTrack) => (e) => {
    e.stopPropagation();

    setAlertDialog({
      open: true,
      title: dialog.title.DELETE_CONFIRMATION,
      message: `Are you sure you want to delete the "${talkTrack.label}" talkTrack?`,
      type: dialog.type.DELETE,
      action: () => onDelete(talkTrack),
    });
  };

  const onChangeSearchInput = (e) => {
    const key = e.target.value.trimStart();
    setSearchValue(key);
    const searchResults = talkTracks.filter((talkTrack) => {
      return talkTrack.value.toLowerCase().includes(key.toLowerCase());
    });

    setFilteredLibraryTalkTracks(searchResults);
  };

  const onClickClearSearch = () => {
    setSearchValue('');

    setFilteredLibraryTalkTracks(talkTracks);
  };

  const onAddLibraryTalkTrack = (t) => () => {
    const talkTrack = { ...t };
    talkTrack.container_id = activeLibraryBattleCard.id;
    addLibraryTalkTrack(talkTrack, activeLibraryBattleCard);
  };

  return (
    <Paper sx={{ ...classes.paper }}>
      <Box sx={{ ...classes.createElements }}>
        <Box sx={{ ...classes.search }}>
          <InputBase
            placeholder="Search Talk Tracks..."
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
          placeholder="Create a Talk Track..."
          value={newElementName}
          onChange={onChangeAddInput}
          onKeyPress={onKeyPressAddInput('talk-track')}
          error={addInputError}
          fullWidth
        />
        <IconButton
          color="primary"
          sx={{ ...classes.iconButton }}
          onClick={onClickAddBtn('talk-track')}
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
        {filteredTalkTracks.length === 0 && <Spinner type="TRIPLE_SPINNER" />}
        {filteredTalkTracks.length > 0 &&
          filteredTalkTracks.map((talkTrack) => {
            return (
              <ListItem
                button
                key={talkTrack.id}
                aria-controls="template-menu"
                aria-label="when device is locked"
                onClick={onClickListItem(talkTrack)}
                className={clsx(
                  'listItem',
                  { selected: talkTrack.active },
                  { active: talkTrack.active }
                )}
              >
                {!hideAddBtn && (
                  <IconButton
                    className={clsx(
                      'display',
                      { selectedDisplay: talkTrack.selected },
                      'addBtn'
                    )}
                    color="primary"
                    onClick={onAddLibraryTalkTrack(talkTrack)}
                    disabled={customInputError[talkTrack.id]}
                    size="large"
                  >
                    <AddCircleOutlineIcon />
                  </IconButton>
                )}
                <TextField
                  sx={{ ...classes.textField }}
                  id={talkTrack.id}
                  label={talkTrack.type.replace('-', ' ')}
                  value={customInputValues[talkTrack.id] || ''}
                  onChange={onChangeCustomInput(talkTrack)}
                  onBlur={onBlurCustomInput(talkTrack)}
                  onKeyPress={onKeyPressCustomInput(talkTrack)}
                  error={customInputError[talkTrack.id]}
                  variant="outlined"
                  disabled={talkTrack.system}
                  multiline
                />
                <IconButton
                  className="display"
                  sx={{ ...classes.iconButton }}
                  color="primary"
                  onClick={onClickDeleteBtn(talkTrack)}
                  disabled={talkTrack.system}
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

TalkTrackLibrary.propTypes = {
  libraryOnly: bool,
  activeLibraryBattleCard: object, // eslint-disable-line
  activeLibraryTalkTrack: object, // eslint-disable-line
  setLibraryTalkTrack: func.isRequired,
  addLibraryTalkTrack: func.isRequired,
  setActiveLibraryTalkTrack: func.isRequired,
  setFilteredLibraryTalkTracks: func.isRequired, // eslint-disable-line
  setLibraryTalkTrackName: func.isRequired,
  setLibraryTalkTracks: func.isRequired,
  removeLibraryTalkTrack: func.isRequired,
  setAlert: func.isRequired,
  setAlertDialog: func.isRequired,
  filteredTalkTracks: array, // eslint-disable-line
  talkTracks: array, // eslint-disable-line
};

TalkTrackLibrary.defaultProps = {
  libraryOnly: true,
};

export default TalkTrackLibrary;
