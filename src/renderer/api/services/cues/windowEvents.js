/* eslint-disable */
import { ipcRenderer } from 'electron';
/**
 *
 * @param {*} data
 * Listens for events on CallEventWindow.js being passed
 * to Main.dev.js
 */
const updateMainWindow = data => {
  ipcRenderer.send('update', data);
};

export { updateMainWindow };
