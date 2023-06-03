import React, { useState, useEffect } from 'react';
import { object, func, array } from 'prop-types';
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
import { Box, IconButton, List, ListItem } from '@mui/material';

import Spinner from '../../../components/Spinner';
import { severity, dialog } from '../../../constants/notifications';
import { isEmpty, notUnique } from '../utils/validation';
import { uuid } from '../../../utils/data';

import classes from './TalkTrackLibrary.styles';

const TalkTrackLibrary = (props) => {
  const {
    addLibraryTalkTrack,
    activeBattleCard,
    setActiveLibraryTalkTrack,
    activeLibraryTalkTrack,
    setLibraryTalkTracks,
    // alphabetizeLibraryTalkTracks,
    removeLibraryTalkTrack,
    // removeBattleCardTalkTrack,
    setFilteredLibraryTalkTracks,
    setLibraryTalkTrack,
    setLibraryTalkTrackName,
    setAlert,
    setAlertDialog,
    talkTracks,
    filteredTalkTracks,
    // history,
  } = props;

  const [newElementName, setNewElementName] = useState('');
  const [customInputValues, setCustomInputValues] = useState({});
  const [addInputError, setAddInputError] = useState(false);
  const [customInputError, setCustomInputError] = useState({});
  const [searchValue, setSearchValue] = useState('');
  // const [talkTrackState, setBattleCardState] = useState([]);

  useEffect(() => {
    const libraryIds = activeBattleCard['talk-tracks'].map(e => e.library_id);
    const libTalkTracks = talkTracks.map(b => {
      const talkTrack = { ...b };
      if (libraryIds.includes(talkTrack.library_id)) {
        talkTrack.selected = true;
        return talkTrack;
      }
      talkTrack.selected = false;
      return talkTrack;
    });
    setLibraryTalkTracks(libTalkTracks);
  }, [activeBattleCard]);

  useEffect(() => {
    if (!talkTracks) return;

    const talkTracksInputValues = talkTracks.reduce((state, ele) => {
      return {
        ...state,
        [ele.id]: ele.value,
      };
    }, {});
    setCustomInputValues(talkTracksInputValues);
  }, [talkTracks]);

  const onClickAddBtn = type => () => {
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

  const onChangeAddInput = e => {
    const { value } = e.target;

    if (notUnique(filteredTalkTracks, value)) {
      setAddInputError(false);
    }
    if (!notUnique(filteredTalkTracks, value)) {
      setAlert({
        open: true,
        duration: 5000,
        severity: severity.ERROR,
        message: `Talk Tracks must be unique, "${value}" already exists.`,
      });
      setAddInputError(true);
      setNewElementName(value);
      return; // can't have 2 templates of the same name
    }

    setNewElementName(value);
  };

  const onKeyPressAddInput = type => e => {
    if (addInputError) return;
    if (e.key === 'Enter') onClickAddBtn(type)();
  };

  const onClickListItem = talkTrack => () => {
    if (activeLibraryTalkTrack?.id === talkTrack.id) return;
    setActiveLibraryTalkTrack(talkTrack);
  };

  const onChangeCustomInput = talkTrack => e => {
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
        message: `Talk Tracks must be unique, "${value}" already exists.`,
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

  const onBlurCustomInput = ele => () => {
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

    const newValue = customInputValues[talkTrack.id].trim();
    if (newValue === activeLibraryTalkTrack.label) return;
    // TODO: validate that the value is unique
    talkTrack.label = newValue;
    talkTrack.value = newValue;
    talkTrack.active = true;

    setLibraryTalkTrackName(talkTrack);
    setActiveLibraryTalkTrack(talkTrack);
  };

  const onKeyPressCustomInput = talkTrack => e => {
    if (customInputError[talkTrack.id]) return;
    if (e.key === 'Enter') {
      onBlurCustomInput(talkTrack)();
    }
  };

  // const onClickEditBtn = talkTrack => e => {
  //   e.stopPropagation();

  //   // setActiveLibraryTalkTrack(talkTrack);
  //   history.push('/app/library/battle-cards/talk-tracks');
  // };

  const onDelete = talkTrack => {
    setAlertDialog({ open: false });
    // TODO: handle removing from an element
    // removeBattleCardTalkTrack(talkTrack, activeBattleCard);
    removeLibraryTalkTrack(talkTrack);
  };

  const onClickDeleteBtn = talkTrack => e => {
    e.stopPropagation();

    setAlertDialog({
      open: true,
      title: dialog.title.DELETE_CONFIRMATION,
      message: `Are you sure you want to delete the "${talkTrack.label}" Talk Track from the library? This will delete all instances of the Talk Track.`,
      type: dialog.type.DELETE,
      action: () => onDelete(talkTrack),
    });
  };

  // const onAddToLibrary = talkTrack => () => {
  //   // TODO: make sure talkTracks in the library have a unique name.
  //   setLibraryTalkTrack(talkTrack);
  // };

  const onChangeSearchInput = e => {
    const key = e.target.value.trimStart();
    setSearchValue(key);
    const searchResults = talkTracks.filter(talkTrack => {
      return talkTrack.value.toLowerCase().includes(key.toLowerCase());
    });

    setFilteredLibraryTalkTracks(searchResults);
  };

  const onClickClearSearch = () => {
    setSearchValue('');

    setFilteredLibraryTalkTracks(talkTracks);
  };

  const onAddLibraryTalkTrack = t => () => {
    const talkTrack = { ...t };
    talkTrack.container_id = activeBattleCard.id;
    addLibraryTalkTrack(talkTrack, activeBattleCard);
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
          placeholder="Create a talk track..."
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
                key={talkTrack.id}
                button
                aria-controls="template-menu"
                aria-label="when device is locked"
                onClick={onClickListItem(talkTrack)}
                className={clsx(
                  'listItem',
                  { selected: talkTrack.selected },
                  { active: talkTrack.active }
                )}
              >
                <IconButton
                  className={clsx(
                    'display',
                    { selectedDisplay: talkTrack.selected },
                    'addBtn'
                  )}
                  color="primary"
                  onClick={onAddLibraryTalkTrack(talkTrack)}
                  disabled={
                    customInputError[talkTrack.id] || activeBattleCard.system
                  }
                  size="large"
                >
                  <AddCircleOutlineIcon />
                </IconButton>
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
                {/* <IconButton
                  className={clsx(
                    styles.display,
                    // { [styles.display]: !snapshot.isDragging },
                    iconButtonClasses.root,
                  )}
                  color="primary"
                  onClick={onClickEditBtn(talkTrack)}
                  disabled={customInputError[talkTrack.id]}
                >
                  <EditOutlinedIcon />
                </IconButton> */}
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
                {/* <IconButton
                  {...provided.dragHandleProps}
                  className={clsx(
                    {
                      [styles.display]: !snapshot.isDragging,
                    },
                    iconButtonClasses.root,
                  )}
                  color="primary"
                  onMouseDown={onMouseDownDragBtn(talkTrack)}
                >
                  <DragIndicatorIcon />
                </IconButton> */}
                {/* <IconButton
                  className={clsx(
                    { [styles.display]: !snapshot.isDragging },
                    iconButtonClasses.root,
                  )}
                  color="primary"
                  onClick={onAddToLibrary(talkTrack)}
                >
                  <AddCircleOutlineIcon />
                </IconButton> */}
              </ListItem>
            );
          })}
      </List>
    </Paper>
  );
};

TalkTrackLibrary.propTypes = {
  addLibraryTalkTrack: func.isRequired,
  removeBattleCardTalkTrack: func.isRequired,
  activeBattleCard: object.isRequired, // eslint-disable-line
  setLibraryTalkTrack: func.isRequired,
  setActiveLibraryTalkTrack: func.isRequired,
  activeLibraryTalkTrack: object,  // eslint-disable-line
  activeTemplate: object, // eslint-disable-line
  setFilteredLibraryTalkTracks: func.isRequired, // eslint-disable-line
  setLibraryTalkTrackName: func.isRequired,
  setLibraryTalkTracks: func.isRequired,
  removeLibraryTalkTrack: func.isRequired,
  setAlert: func.isRequired,
  setAlertDialog: func.isRequired,
  history: object.isRequired, // eslint-disable-line
  filteredTalkTracks: array, // eslint-disable-line
  talkTracks: array // eslint-disable-line
};

export default TalkTrackLibrary;
