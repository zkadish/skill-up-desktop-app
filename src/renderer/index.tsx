import { createRoot } from 'react-dom/client';
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';

const store = configureStore();

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<Root store={store} history={history} />);

// calling IPC exposed from preload script
// window.electron.ipcRenderer.once('ipc-example', (arg) => {
//   // eslint-disable-next-line no-console
//   console.log('ipcRenderer.once', arg);
// });
// window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);
// window.electron.ipcRenderer.sendMessage('ipc-example-2', ['ping-2-test']);
