const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    // openCallEventWin() {
    //   ipcRenderer.send('open-call-event-win');
    // },
    authRequest(axios) {
      ipcRenderer.send('auth-request', axios);
    },
    // Create Account button in LogIn component
    // createAccount() {
    //   ipcRenderer.send('create-account', 'open-browser');
    // },
    // Example connected to script tag js in ejs template
    myPing() {
      ipcRenderer.send('ipc-example', 'ping');
    },
    on(channel, func) {
      const validChannels = ['ipc-example'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
    },
    once(channel, func) {
      const validChannels = [
        'ipc-example',
        // 'create-account',
        'auth-request',
        // 'auth-login',
        'auth-authn',
        'init-call-event-win',
        'close-call-event-win',
      ];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.once(channel, (event, ...args) => func(...args));
      }
    },
  },
});
