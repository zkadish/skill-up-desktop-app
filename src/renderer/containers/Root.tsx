import React, { useState, useEffect } from 'react';
import { object } from 'prop-types';
import { Provider } from 'react-redux';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import Routes from '../routes/Routes';
import CallEventRoutes from '../routes/CallEventRoutes';
import theme from '../styles/theme';

const cache = createCache({
  key: 'css',
  prepend: true,
});

/**
 * Root: handles routing of new BrowserWindow()s
 * Routes based on the query parameter of the loading html document
 * Search params are used to route a newly opened window to it's set of routes
 */
function Root({ store }: any) {
  const [electronWindow, setElectronWindow] = useState<string | null>(null);

  useEffect(() => {
    if (!global.location) return;
    const { search } = global.location;

    if (search.includes('frameWork')) {
      setElectronWindow('frameWork');
      return;
    }

    setElectronWindow('main');
  }, []);

  return (
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <CacheProvider value={cache}>
          <ThemeProvider theme={theme}>
            {electronWindow === 'main' && <Routes />}
            {electronWindow === 'frameWork' && <CallEventRoutes />}
          </ThemeProvider>
        </CacheProvider>
      </StyledEngineProvider>
    </Provider>
  );
}

Root.propTypes = {
  store: object.isRequired // eslint-disable-line
};

export default Root;
