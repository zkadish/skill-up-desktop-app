import React, { useState, useEffect } from 'react';
import { object, func } from 'prop-types';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CheckIcon from '@mui/icons-material/Check';

import classes from './MoreMenu.styles';

const MoreMenu = (props) => {
  const { activeElement, setElementType, onCloseMoreMenu, anchorEl } = props;

  const [moreMenuItem, setMoreMenuElement] = useState({});

  useEffect(() => {
    if (!activeElement) return;
    setMoreMenuElement(activeElement);
  }, [activeElement]);

  const onClickEleMenuItem = (type) => () => {
    activeElement.type = type;
    if (type === 'talk-track') activeElement.value = activeElement.label;

    setMoreMenuElement(activeElement);
    setElementType(activeElement);
  };

  return (
    <Menu
      elevation={0}
      id="customized-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={onCloseMoreMenu}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'center',
        horizontal: 'center',
      }}
      sx={{
        '& .MuiList-root.MuiMenu-list': {
          border: '1px solid #d3d4d5',
          borderRadius: '4px',
        },
      }}
    >
      <MenuItem
        sx={{
          paddingRight: '40px',
          ...(moreMenuItem.type === 'question-answer' && classes.active),
        }}
        onClick={onClickEleMenuItem('question-answer')}
      >
        <ListItemIcon sx={{ minWidth: '32px' }}>
          {moreMenuItem.type === 'question-answer' && (
            <CheckIcon sx={{ color: '#fff' }} fontSize="small" />
          )}
        </ListItemIcon>
        <ListItemText primary="Question & Answer" />
      </MenuItem>
      <MenuItem
        sx={{
          paddingRight: '40px',
          ...(moreMenuItem.type === 'research-field' && classes.active),
        }}
        onClick={onClickEleMenuItem('research-field')}
      >
        <ListItemIcon sx={{ minWidth: '32px' }}>
          {moreMenuItem.type === 'research-field' && (
            <CheckIcon sx={{ color: '#fff' }} fontSize="small" />
          )}
        </ListItemIcon>
        <ListItemText primary="Research Field" />
      </MenuItem>
      <MenuItem
        sx={{
          paddingRight: '40px',
          ...(moreMenuItem.type === 'check-list' && classes.active),
        }}
        onClick={onClickEleMenuItem('check-list')}
      >
        <ListItemIcon sx={{ minWidth: '32px' }}>
          {moreMenuItem.type === 'check-list' && (
            <CheckIcon sx={{ color: '#fff' }} fontSize="small" />
          )}
        </ListItemIcon>
        <ListItemText primary="Check List" />
      </MenuItem>
      <MenuItem
        sx={{
          paddingRight: '40px',
          ...(moreMenuItem.type === 'talk-track' && classes.active),
        }}
        onClick={onClickEleMenuItem('talk-track')}
      >
        <ListItemIcon sx={{ minWidth: '32px' }}>
          {moreMenuItem.type === 'talk-track' && (
            <CheckIcon sx={{ color: '#fff' }} fontSize="small" />
          )}
        </ListItemIcon>
        <ListItemText primary="Talk Track" />
      </MenuItem>
    </Menu>
  );
};

MoreMenu.propTypes = {
  activeElement: object, // eslint-disable-line
  setElementType: func.isRequired,
  onCloseMoreMenu: func.isRequired,
  anchorEl: object // eslint-disable-line
};

export default MoreMenu;
