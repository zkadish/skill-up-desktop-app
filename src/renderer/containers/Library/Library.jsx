import React, { useRef, useState, useEffect } from 'react';
import { object, string, func, array } from 'prop-types';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import SalesCoach from '../Frameworks/SalesCoach';
import TemplatesLibrary from './TemplatesLibrary';
import TalkTracks from './TalkTracks';
import BattleCardLibrary from './BattleCardLibrary';
import TalkTrackLibrary from './TalkTrackLibrary';
// import routes from '../../constants/routes';

import classes from './Library.styles';

function Library(props) {
  const {
    // getFrameworks,
    // filteredTalkTracks,
    // setLibraryActiveTalkTrack,
    // setLibraryTalkTracks,
    // activeLibraryTalkTrack,
    // setTemplates,
    // setActiveTemplate,
    // setBlocks,
    // setElements,
    activeTemplate,
    // templates,
  } = props;

  const sec = useRef(0); // 59
  const min = useRef(30); // 59
  const hour = useRef(0); // 24

  const location = useLocation();
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [hours, setHours] = useState('00');
  const [value, setValue] = useState(0);

  const countDown = () => {
    const counter = setInterval(() => {
      sec.current -= 1;

      if (sec.current === 0 && min.current === 0 && hour.current === 0) {
        clearInterval(counter);
      }

      if (sec.current < 0) {
        sec.current = 59; // reset seconds to init val 59
        min.current -= 1; // increment minutes
      }

      if (min.current < 0) {
        min.current = 59;
        hour.current -= 1; // increment hours
      }

      if (hour.current < 0) {
        hour.current = 0;
      }

      const s = sec.current < 10 ? `0${sec.current}` : `${sec.current}`;
      const m = min.current < 10 ? `0${min.current}` : `${min.current}`;
      const h = hour.current < 10 ? `0${hour.current}` : `${hour.current}`;

      setSeconds(s);
      setMinutes(m);
      setHours(h);
    }, 1000);

    return counter;
  };

  useEffect(() => {
    const slug = location.pathname.split('/')[3];
    switch (slug) {
      case 'battle-cards':
        setValue(1);
        break;
      case 'talk-tracks':
        setValue(2);
        break;
      default:
        setValue(0);
    }
  }, [location]);

  // TODO: add paths to the constants routes file
  const onTabsChange = (e, tabIndex) => {
    setValue(tabIndex);
    switch (tabIndex) {
      case 1:
        navigate('/app/library/battle-cards');
        break;
      case 2:
        navigate('/app/library/talk-tracks');
        break;
      default:
        navigate('/app/library/templates');
    }
  };

  return (
    <Box sx={{ ...classes.container }}>
      <Box className="leftCol">
        <Box className="salesCoach">
          {/* TODO: move this counter and header into <SalesCoach /> */}
          <Box className="titleBar">
            Sales Coach
            {activeTemplate && ` - ${activeTemplate.label}`}
          </Box>
          <Box className="duration">{`${hours}:${minutes}:${seconds}`}</Box>
          <Box className="callFramework">
            <SalesCoach />
          </Box>
        </Box>
      </Box>
      <Box className="rightCol">
        <AppBar sx={{ ...classes.appBar }} position="static">
          <Tabs
            value={value}
            onChange={onTabsChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Templates" />
            <Tab label="Battle Cards" />
            <Tab label="Talk Tracks" />
          </Tabs>
        </AppBar>
        <Paper sx={{ ...classes.paper }}>
          <Routes>
            <Route path="templates" element={<TemplatesLibrary />} />
            <Route path="battle-cards" element={<BattleCardLibrary />} />
            <Route path="talk-tracks" element={<TalkTrackLibrary />} />
            <Route path="battle-cards/talk-tracks" element={<TalkTracks />} />
            {/* <Route path="/app/frameworks/templates/blocks" element={<Blocks />} /> */}
            {/* <Route exact path="/app/library" element={<TemplatesLibrary />} /> */}
          </Routes>
        </Paper>
      </Box>
    </Box>
  );
}

Library.propTypes = {
  // filteredTalkTracks: array.isRequired, // eslint-disable-line
  // activeLibraryTalkTrack: object, // eslint-disable-line
  // setLibraryTalkTracks: func.isRequired,
  // setLibraryActiveTalkTrack: func.isRequired,
  activeTemplate: object, // eslint-disable-line
  // getFrameworks: func.isRequired,
  // setActiveTemplate: func.isRequired,
  // setBlocks: func.isRequired,
  // setElements: func.isRequired,
  // setTemplates: func.isRequired,
  // templates: array.isRequired, // eslint-disable-line
};

export default Library;
