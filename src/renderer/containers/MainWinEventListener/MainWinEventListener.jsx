/**
 * MainWinEventListener
 * @param {*} props
 * Listening for events sent from ipcMain in main.dev.js
 */
const MainWinEventListener = (props) => {
  const {
    children,
    removeCallEventAttendee,
    updateCallEventElement,
    updateCallEventAction,
    updateCallEventNote,
  } = props;

  window.electron.ipcRenderer.on('remove-attendee', (data) => {
    removeCallEventAttendee(data);
  });

  window.electron.ipcRenderer.on('update-elements', (data) => {
    updateCallEventElement(data);
  });

  window.electron.ipcRenderer.on('update-actions', (data) => {
    updateCallEventAction(data);
  });

  window.electron.ipcRenderer.on('update-notes', (data) => {
    updateCallEventNote(data);
  });

  return children;
};

export default MainWinEventListener;
