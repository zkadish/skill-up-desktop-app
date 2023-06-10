import React, { useState, useEffect } from 'react';
import { object, func, array } from 'prop-types';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';

// import MenuIcon from '@mui/icons-material/Menu';
import { Chat } from '@mui/icons-material';
// import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
// import BusinessIcon from '@mui/icons-material/Business';
import PhoneIcon from '@mui/icons-material/Phone';
// import MultilineChartIcon from '@mui/icons-material/MultilineChart';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';

import NotificationBtn from '../NotificationBtn';
import { signOut } from '../../api/services/authn';
import routes from '../../constants/routes';

import classes from './MainMenu.styles';

function MainMenu(props) {
  const { user, toggleNotifyDrawer, eventNotifications } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [notificationNum, setNotificationNum] = useState(0);
  const [activeBtn, setActiveBtn] = useState('calls');

  useEffect(() => {
    // debugger
    const path = location.pathname.split('/')[2] || 'calls';
    setActiveBtn(path);
  }, [location]);

  useEffect(() => {
    const eventNum = eventNotifications.length;
    setNotificationNum(eventNum);
  }, [eventNotifications]);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const onClickCalls = () => {
    if (
      location.pathname.includes('/app/calls') ||
      location.pathname === '/app'
    ) {
      return;
    }
    navigate('/app/calls');
    setActiveBtn('calls');
  };

  // const onClickReportsHandler = () => {
  //   if (location.pathname.includes(routes.REPORTS)) return;
  //   navigate(`${routes.REPORTS}`);
  // };

  const onClickFrameworks = () => {
    // if (location.pathname.includes(routes.FRAMEWORKS)) return;
    // navigate(`${routes.FRAMEWORKS}`);
    navigate('/app/frameworks');
    // navigate('frameworks');
    setActiveBtn('frameworks');
  };

  // const onClickCompaniesHandler = () => {
  //   if (location.includes(routes.REPORTS)) return;
  //   navigate(`${routes.REPORTS}`);
  // };

  const onClickLibrary = () => {
    if (location.pathname.includes(routes.LIBRARY)) return;
    navigate(`${routes.LIBRARY}`);
    setActiveBtn('library');
  };

  const onNotificationsClick = () => {
    toggleNotifyDrawer();
  };

  const onSignOut = () => {
    const { email } = user;
    signOut({ email })
      .then((data) => {
        // const { status, res } = data;
        // get user from back end and update user and wipe access token
        // Do stuff on sign out...
        return data;
      })
      .catch((err) => {
        console.log(err);
        debugger;
      });
  };

  const menuId = 'primary-search-account-menu';
  const ProfileMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {/* <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>Account</MenuItem> */}
      <Link to={`${routes.APP_SETTINGS}`}>
        <MenuItem onClick={handleMenuClose} sx={{ ...classes.profileMenuItem }}>
          Settings
        </MenuItem>
      </Link>
      {/* <Link to={`${routes.CALL_EVENT_SETTINGS}`}>
        <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
      </Link> */}
      <Link to="/">
        <MenuItem onClick={onSignOut} sx={{ ...classes.profileMenuItem }}>
          Log out
        </MenuItem>
      </Link>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const ProfileMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <NotificationBtn number={4} onClick={onNotificationsClick} />
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          size="large"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ ...classes.grow }}>
      <AppBar position="static" sx={{ ...classes.appBar }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            size="large"
            sx={{ ...classes.menuButton }}
          >
            {/* <MenuIcon /> */}
            <Chat sx={{ ...classes.menuIcon }} />
          </IconButton>
          <Box>
            <Button
              onClick={onClickCalls}
              startIcon={<PhoneIcon />}
              sx={{ ...classes.callsButton }}
            >
              Calls
            </Button>
            {/* <Button
              onClick={onClickReportsHandler}
              className={classes.menuButton}
              startIcon={<MultilineChartIcon />}
            >
              reports
            </Button> */}
            <Button
              onClick={onClickFrameworks}
              startIcon={<AccountTreeOutlinedIcon />}
              sx={{ ...classes.frameWorksButton }}
            >
              Frameworks
            </Button>
            {/* <Button
              className={clsx(classes.frameworksBtn, classes.menuButton, {
                [classes.active]: activeBtn === 'library',
              })}
              onClick={onClickLibrary}
              startIcon={<FolderOutlinedIcon />}
            >
              Library
            </Button> */}
            {/* <Button
              onClick={onClickCompaniesHandler}
              className={classes.menuButton}
              startIcon={<BusinessIcon />}
            >
              companies
            </Button> */}
          </Box>
          <Box sx={{ ...classes.grow }} />
          <Box sx={{ ...classes.sectionDesktop }}>
            <NotificationBtn
              number={3}
              color="mainMenu"
              onClick={onNotificationsClick}
              sx={{ ...classes.notificationBtn }}
            />
            {/* <Button>test</Button> */}
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              size="large"
              sx={{ ...classes.profileBtn }}
            >
              <AccountCircle sx={{ ...classes.profileIcon }} />
            </IconButton>
          </Box>
          <Box sx={{ ...classes.sectionMobile }}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
              size="large"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {ProfileMobileMenu}
      {ProfileMenu}
    </Box>
  );
}

MainMenu.propTypes = {
  eventNotifications: array, // eslint-disable-line react/forbid-prop-types
  user: object, // eslint-disable-line react/forbid-prop-types
  toggleNotifyDrawer: func,
};

MainMenu.defaultProps = {
  eventNotifications: [],
  toggleNotifyDrawer: () => {},
  user: {},
};

export default MainMenu;
