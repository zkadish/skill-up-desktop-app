import React, { useState, useEffect } from 'react';
import { object, func } from 'prop-types';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CheckIcon from '@mui/icons-material/Check';

import classes from './MoreMenu.styles';

const MoreMenu = (props) => {
  const { activeBlock, setBlockType, onCloseMoreMenu, anchorEl } = props;

  const [moreMenuBlock, setMoreMenuBlock] = useState({});

  useEffect(() => {
    if (!activeBlock) return;
    setMoreMenuBlock(activeBlock);
  }, [activeBlock]);

  const onClickMenuItem = (type) => () => {
    activeBlock.type = type;
    setMoreMenuBlock(activeBlock);
    setBlockType(activeBlock);
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
          ...(moreMenuBlock.type === 'default' && classes.active),
        }}
        onClick={onClickMenuItem('default')}
      >
        <ListItemIcon sx={{ minWidth: '32px' }}>
          {moreMenuBlock.type === 'default' && (
            <CheckIcon sx={{ color: '#fff' }} fontSize="small" />
          )}
        </ListItemIcon>
        <ListItemText primary="Default" />
      </MenuItem>
      <MenuItem
        sx={{
          paddingRight: '40px',
          ...(moreMenuBlock.type === 'talk-tracks' && classes.active),
        }}
        onClick={onClickMenuItem('talk-tracks')}
      >
        <ListItemIcon sx={{ minWidth: '32px' }}>
          {moreMenuBlock.type === 'talk-tracks' && (
            <CheckIcon sx={{ color: '#fff' }} fontSize="small" />
          )}
        </ListItemIcon>
        <ListItemText primary="Talk Tracks" />
      </MenuItem>
      <MenuItem
        sx={{
          paddingRight: '40px',
          ...(moreMenuBlock.type === 'battle-cards' && classes.active),
        }}
        onClick={onClickMenuItem('battle-cards')}
      >
        <ListItemIcon sx={{ minWidth: '32px' }}>
          {moreMenuBlock.type === 'battle-cards' && (
            <CheckIcon sx={{ color: '#fff' }} fontSize="small" />
          )}
        </ListItemIcon>
        <ListItemText primary="Battle Cards" />
      </MenuItem>
      <MenuItem
        sx={{
          paddingRight: '40px',
          ...(moreMenuBlock.type === 'actions' && classes.active),
        }}
        onClick={onClickMenuItem('actions')}
      >
        <ListItemIcon sx={{ minWidth: '32px' }}>
          {moreMenuBlock.type === 'actions' && (
            <CheckIcon sx={{ color: '#fff' }} fontSize="small" />
          )}
        </ListItemIcon>
        <ListItemText primary="Actions" />
      </MenuItem>
      <MenuItem
        sx={{
          paddingRight: '40px',
          ...(moreMenuBlock.type === 'notes' && classes.active),
        }}
        onClick={onClickMenuItem('notes')}
      >
        <ListItemIcon sx={{ minWidth: '32px' }}>
          {moreMenuBlock.type === 'notes' && (
            <CheckIcon sx={{ color: '#fff' }} fontSize="small" />
          )}
        </ListItemIcon>
        <ListItemText primary="Notes" />
      </MenuItem>
      <MenuItem
        sx={{
          paddingRight: '40px',
          ...(moreMenuBlock.type === 'attendees' && classes.active),
        }}
        onClick={onClickMenuItem('attendees')}
      >
        <ListItemIcon sx={{ minWidth: '32px' }}>
          {moreMenuBlock.type === 'attendees' && (
            <CheckIcon sx={{ color: '#fff' }} fontSize="small" />
          )}
        </ListItemIcon>
        <ListItemText primary="Attendees" />
      </MenuItem>
      <MenuItem
        sx={{
          paddingRight: '40px',
          ...(moreMenuBlock.type === 'pre-call' && classes.active),
        }}
        onClick={onClickMenuItem('pre-call')}
      >
        <ListItemIcon sx={{ minWidth: '32px' }}>
          {moreMenuBlock.type === 'pre-call' && (
            <CheckIcon sx={{ color: '#fff' }} fontSize="small" />
          )}
        </ListItemIcon>
        <ListItemText primary="Pre Call Actions" />
      </MenuItem>
      <MenuItem
        sx={{
          paddingRight: '40px',
          ...(moreMenuBlock.type === 'post-call' && classes.active),
        }}
        onClick={onClickMenuItem('post-call')}
      >
        <ListItemIcon sx={{ minWidth: '32px' }}>
          {moreMenuBlock.type === 'post-call' && (
            <CheckIcon sx={{ color: '#fff' }} fontSize="small" />
          )}
        </ListItemIcon>
        <ListItemText primary="Post Call Actions" />
      </MenuItem>
    </Menu>
  );
};

MoreMenu.propTypes = {
  activeBlock: object, // eslint-disable-line
  setBlockType: func.isRequired,
  onCloseMoreMenu: func.isRequired,
  anchorEl: object // eslint-disable-line
};

export default MoreMenu;
