import React, { useState, useEffect } from 'react';
import { object } from 'prop-types';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
// import { ThemeProvider } from '@material-ui/core/styles';
import Routes from '../routes/Routes';
import CallEventRoutes from '../routes/CallEventRoutes';
import theme from '../styles/theme';

// import './app.global.scss';

const cache = createCache({
  key: 'css',
  prepend: true,
});

/**
 * Root: handles routing of new BrowserWindow()s
 * Routes based on the query parameter of the loading html document
 * Search params are used to route a newly opened window to it's set of routes
 */

const Root = ({ store, history }) => {
  const [window, setWindow] = useState(null);

  useEffect(() => {
    if (!global.location) return;
    const { search } = global.location;

    if (search.includes('frameWork')) {
      setWindow('frameWork');
      return;
    }

    setWindow('main');
  }, []);

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <StyledEngineProvider injectFirst>
          <CacheProvider value={cache}>
            <ThemeProvider theme={theme}>
              {window === 'main' && <Routes />}
              {window === 'frameWork' && <CallEventRoutes />}
            </ThemeProvider>
          </CacheProvider>
        </StyledEngineProvider>
      </ConnectedRouter>
    </Provider>
  );
};

Root.propTypes = {
  history: object.isRequired, // eslint-disable-line
  store: object.isRequired // eslint-disable-line
};

export default Root;
