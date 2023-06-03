/* eslint global-require: off, no-console: off, promise/always-return: off */
import path from 'path';
import { app, BrowserWindow, ipcMain } from 'electron';
import { resolveHtmlPath } from './util';

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDevelopment =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDevelopment) {
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

let callEventWindow: BrowserWindow | null = null;
let callEventData: CallEventType | null = null;

const createCallEventWin = async (event: Electron.IpcMainEvent) => {
  if (isDevelopment) {
    await installExtensions();
  }

  console.log('OPEN CALL EVENT WINDOW');
  console.log('preLoad.ts:', path.join(__dirname, 'preload.ts'));
  callEventWindow = new BrowserWindow({
    // frame: false,
    show: false,
    titleBarStyle: 'hidden',
    transparent: true,
    width: 400,
    height: 800,
    webPreferences: {
      contextIsolation: true,
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  callEventWindow.loadURL(`${resolveHtmlPath('index.html')}?win=frameWork`);

  callEventWindow.on('ready-to-show', () => {
    // console.log('ready-to-show: callEventWindow');
    if (!callEventWindow) {
      throw new Error('"callEventWindow" is not defined');
    }
    callEventWindow.show();
  });

  // callEventWindow.webContents.on('did-stop-loading', () => {
  //   event.reply('init-call-event-win', callEventData);
  // });

  callEventWindow.on('closed', () => {
    // console.log('callEventWindow closed');
    event.reply('close-call-event-win');
    callEventWindow = null;
  });
};

/**
 * Add event listeners...
 */
ipcMain.on('open-call-event-win', async (event, callEvent) => {
  console.log('open-call-event-win:', event);
  callEventData = callEvent;
  createCallEventWin(event);
});

ipcMain.on('init-call-event-win', async (event) => {
  // console.log('ipcMain: init-call-event-win');
  event.reply('init-call-event-win', callEventData);
});

export default createCallEventWin;
