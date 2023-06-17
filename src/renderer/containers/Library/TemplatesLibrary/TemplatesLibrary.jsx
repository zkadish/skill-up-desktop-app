import React, { useEffect, useState } from 'react';
import { object, func, array } from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

import { Box, IconButton, TextField } from '@mui/material';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
// import Input from '@mui/material/OutlinedInput';
import InputBase from '@mui/material/InputBase';

import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SearchIcon from '@mui/icons-material/Search';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import Spinner from '../../../components/Spinner';
import { severity, dialog } from '../../../constants/notifications';

import { isEmpty, notUnique, isAllowedChar } from '../utils/validation';

import classes from './TemplatesLibrary.styles';

function TemplatesLibrary(props) {
  const {
    activeTemplate,
    setActiveTemplate,
    templates,
    // setTemplates,
    setTemplate,
    removeTemplate,
    setTemplateName,
    setAlert,
    setAlertDialog,
  } = props;
  const navigate = useNavigate();

  const [newTemplateName, setNewTemplateName] = useState('');
  const [customInputValues, setCustomInputValues] = useState({});
  const [addInputError, setAddInputError] = useState(false);
  const [customInputError, setCustomInputError] = useState({});
  const [searchValue, setSearchValue] = useState('');
  const [filteredTemplates, setFilteredTemplates] = useState([]);

  useEffect(() => {
    // set the library
    setFilteredTemplates(templates);
  }, [templates]);

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
    // TODO: introduce yup?
    if (isEmpty(templateName)) return;

    const id = uuidv4();
    setTemplate({
      id,
      label: templateName,
      blocks: [],
      active: false,
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
    // TODO: create a modular way to handle validation
    // TODO: move validation out of this file
    // TODO: introduce yup???
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
      message: `Are you sure you want to delete the "${template.label}" template?`,
      type: dialog.type.DELETE,
      action: () => onDelete(template),
    });
  };

  const onClickEditBtn = (template) => (e) => {
    e.stopPropagation();

    setActiveTemplate(template);
    navigate('/app/frameworks/templates/blocks');
  };

  const onChangeSearchInput = (e) => {
    const key = e.target.value.trimStart();
    setSearchValue(key);
    const searchResults = templates.filter((template) => {
      return template.label.toLowerCase().includes(key.toLowerCase());
    });

    setFilteredTemplates(searchResults);
  };

  const onClickClearSearch = () => {
    setSearchValue('');

    setFilteredTemplates(templates);
  };

  return (
    <Paper sx={{ ...classes.paper }}>
      <Box sx={{ ...classes.createElements }}>
        <Box sx={{ ...classes.search }}>
          <InputBase
            placeholder="Search the template library…"
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
      </Box>
      <List
        sx={{ ...classes.list }}
        component="nav"
        aria-label="Created templates"
      >
        {filteredTemplates.length === 0 && <Spinner type="TRIPLE_SPINNER" />}
        {filteredTemplates.length > 0 &&
          filteredTemplates.map((template) => {
            return (
              <ListItem
                key={template.id}
                button
                aria-controls="builder-template"
                aria-label="parent node of builder template"
                onClick={onClickListItem(template)}
                className={clsx(
                  'listItem',
                  { selected: template.selected },
                  { active: template.active }
                )}
              >
                <TextField
                  id={template.id}
                  sx={{ ...classes.textField }}
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
                  className="display"
                  sx={{ ...classes.iconButton }}
                  color="primary"
                  onClick={onClickEditBtn(template)}
                  disabled={customInputError[template.id]}
                  size="large"
                >
                  <EditOutlinedIcon />
                </IconButton>
                <IconButton
                  className="display"
                  sx={{ ...classes.iconButton }}
                  color="primary"
                  onClick={onClickDeleteBtn(template)}
                  disabled={template.system}
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

TemplatesLibrary.propTypes = {
  activeTemplate: object, // eslint-disable-line
  setActiveTemplate: func.isRequired,
  // setTemplates: func.isRequired,
  setTemplate: func.isRequired,
  removeTemplate: func.isRequired,
  setTemplateName: func.isRequired,
  setAlert: func.isRequired,
  setAlertDialog: func.isRequired,
  templates: array, // eslint-disable-line
};

export default TemplatesLibrary;
