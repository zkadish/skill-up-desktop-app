/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
/**
 * added imports
 */
import axios, { AxiosResponse } from 'axios';
import cookie from 'cookie';
import './callEventWin';

import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';

interface CookieType {
  'connect.sid': string;
  Path: string;
  Expires: string;
}

let frameworksOrigin = 'http://localhost:9999';
if (process.env.NODE_ENV === 'production') {
  frameworksOrigin = 'https://dev.frameworks.service.viewportmedia.org';
}

let authOrigin = 'http://localhost:7777';
if (process.env.NODE_ENV === 'production') {
  authOrigin = 'https://dev.auth.service.viewportmedia.org';
}

let spaOrigin = 'http://localhost:3000';
if (process.env.NODE_ENV === 'production') {
  spaOrigin = 'https://dev.auth.spa.viewportmedia.org';
}

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

ipcMain.on('ipc-example', async (event, arg) => {
  console.log('main:on:ipc-example', arg);
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log('ipc-example:', msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

ipcMain.on('ipc-example-2', async (event, arg) => {
  console.log('main:on:ipc-example-2', arg);
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log('ipc-example:', msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

ipcMain.on('framework-request', async (event, options) => {
  console.log('main:on:framework-request', options);
  try {
    const reply = options.replyEvent;
    delete options.replyEvent;
    const config = { ...options, url: `${frameworksOrigin}${options.url}` };

    const result = await axios(config);
    // if (reply === 'update-element') {
    //   console.log('TEST', result);
    // }

    event.reply(reply, {
      status: result.status,
      data: result.data,
    });
  } catch (err) {
    console.log('ERROR - framework-request:', err);
  }
});

ipcMain.on('auth-request', async (event, options) => {
  // console.log('main:on:auth-request', options);
  const reply = options.replyEvent;
  delete options.replyEvent;
  try {
    // console.log('ipcMain auth-request options:', options);
    const config = { ...options, url: `${authOrigin}${options.url}` };
    console.log('ipcMain auth-request config:', config);

    // If authenticated send session cookie
    if (reply === 'auth-authn') {
      await mainWindow?.webContents.session.cookies
        .get({ url: authOrigin })
        .then((cookies) => {
          console.log('getCookies:', cookies);
          const setCookie = cookie.serialize(
            cookies[cookies.length - 1].name,
            cookies[cookies.length - 1].value,
            {
              domain: 'localhost',
              path: cookies[cookies.length - 1].path,
              expirationDate: cookies[cookies.length - 1].expirationDate,
              hostOnly: cookies[cookies.length - 1].hostOnly,
            }
          );
          config.headers.Cookie = setCookie;
        })
        .catch((err) => {
          console.log('ERROR:', 'auth-authn');
          console.log('NOT AUTHORIZED:', err);
          event.reply(reply, {
            status: '403',
            data: err,
          });
        });
    }

    let result: AxiosResponse | null = null;
    try {
      result = await axios(config);
      console.log('AxiosResponse: ', result?.data);
    } catch (err: any) {
      console.log('Error: axios', err);
      event.reply(reply, {
        status: err?.response?.status || err.code,
        data:
          err?.response?.data ||
          `${err.syscall} ${err.code} ${err.address}:${err.port}`,
      });
      return;
    }

    // If authenticated set session cookie
    if (reply === 'auth-login') {
      const setCookie: CookieType = cookie.parse(
        result?.headers['set-cookie']?.[0]
      );
      const dateExpires = new Date(setCookie.Expires);
      const millisecondsExpires = dateExpires.getTime();
      console.log('setCookie', setCookie);
      // console.log('result.headers', result.headers);

      await mainWindow?.webContents.session.cookies
        .set({
          url: authOrigin,
          name: 'connect.sid',
          value: setCookie['connect.sid'],
          path: setCookie.Path,
          secure: false,
          httpOnly: true,
          expirationDate: millisecondsExpires,
        })
        .then(() => {
          return console.log('cookie success');
        })
        .catch(() => {
          console.log('ERROR:', 'auth-login');
        });
    }

    event.reply(reply, {
      status: result?.status,
      data: result?.data,
    });
  } catch (err) {
    console.log('ERROR -', 'auth-request:', err);
    event.reply(reply, {
      // status: err.status,
      err,
    });
  }
});

// Create Account button in LogIn component
ipcMain.on('create-account', async (event) => {
  // Open url in the user's browser
  shell.openExternal(`${spaOrigin}/register-user`);
  event.reply('create-account', 'browser opened');
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */
ipcMain.on('update-main-win', (_event, data) => {
  // console.log(data.winEvent, data);
  mainWindow?.webContents.send(data.winEvent, data);
});

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
