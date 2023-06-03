// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels =
  | 'ipc-example'
  | 'ipc-example-2'
  | 'auth-request'
  | 'auth-login'
  | 'framework-request'
  | 'get-battle-cards'
  | 'update-battle-card'
  | 'update-battle-card-order'
  | 'create-battle-card'
  | 'add-battle-card'
  | 'delete-battle-card'
  | 'delete-library-battle-card'
  | 'get-blocks'
  | 'create-block'
  | 'update-block'
  | 'block-order'
  | 'delete-block'
  | 'get-elements'
  | 'create-element'
  | 'update-element'
  | 'update-element-order'
  | 'delete-element'
  | 'get-past-events'
  | 'create-event'
  | 'update-event'
  | 'set-call-event-template'
  | 'get-talk-tracks'
  | 'update-talk-track'
  | 'create-talk-track'
  | 'add-talk-track'
  | 'delete-talk-track'
  | 'delete-library-talk-track'
  | 'get-template-order'
  | 'update-template-order'
  | 'get-build-templates'
  | 'create-template'
  | 'update-template'
  | 'delete-template'
  | 'open-call-event-win'
  | 'init-call-event-win'
  | 'create-account'
  | 'update-main-window';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
