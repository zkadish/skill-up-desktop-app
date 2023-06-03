// import axios from 'axios';

// getElements is currently not being used
const getElements = (accountId) => {
  const promise = new Promise((resolve) => {
    window.electron.ipcRenderer.sendMessage('framework-request', {
      replyEvent: 'get-elements',
      method: 'get',
      url: '/api/v1/frameworks/element',
      headers: {
        'Content-Type': 'application/json',
        'user-account-id': accountId,
        // Authorization: auth.accessToken,
      },
    });
    window.electron.ipcRenderer.on('get-elements', (response) => {
      resolve(response);
      // callback(response.data);
    });
  });
  return promise;
};

const createElement = (body = {}, auth = {}) => {
  const promise = new Promise((resolve) => {
    window.electron.ipcRenderer.sendMessage('framework-request', {
      replyEvent: 'create-element',
      method: 'post',
      url: '/api/v1/frameworks/element',
      data: body,
      headers: {
        'Content-Type': 'application/json',
        'user-account-id': auth.user.account_id,
        // Authorization: auth.accessToken,
      },
    });
    window.electron.ipcRenderer.on('create-element', (response) => {
      resolve(response);
      // console.log('auth-authn', response);
    });
  });
  return promise;
};

const updateElement = (body = {}, auth = {}) => {
  const promise = new Promise((resolve) => {
    window.electron.ipcRenderer.sendMessage('framework-request', {
      replyEvent: 'update-element',
      method: 'put',
      url: '/api/v1/frameworks/element',
      data: body,
      headers: {
        'Content-Type': 'application/json',
        'user-account-id': auth.user.account_id,
        // Authorization: auth.accessToken,
      },
    });
    window.electron.ipcRenderer.on('update-element', (response) => {
      resolve(response);
      // console.log('auth-authn', response);
    });
  });
  return promise;
};

const updateElementOrder = (body = {}, auth = {}) => {
  const promise = new Promise((resolve) => {
    window.electron.ipcRenderer.sendMessage('framework-request', {
      replyEvent: 'update-element-order',
      method: 'put',
      url: '/api/v1/frameworks/element-order',
      data: body,
      headers: {
        'Content-Type': 'application/json',
        'user-account-id': auth.user.account_id,
        // Authorization: auth.accessToken,
      },
    });
    window.electron.ipcRenderer.on('update-element-order', (response) => {
      resolve(response);
      // console.log('auth-authn', response);
    });
  });
  return promise;
};

const deleteElement = (body = {}, auth = {}) => {
  const promise = new Promise((resolve) => {
    window.electron.ipcRenderer.sendMessage('framework-request', {
      replyEvent: 'delete-element',
      method: 'delete',
      url: '/api/v1/frameworks/element',
      data: body,
      headers: {
        'Content-Type': 'application/json',
        'user-account-id': auth.user.account_id,
        // Authorization: auth.accessToken,
      },
    });
    window.electron.ipcRenderer.on('delete-element', (response) => {
      resolve(response);
      // console.log('auth-authn', response);
    });
  });
  return promise;
};

export {
  getElements,
  createElement,
  updateElement,
  updateElementOrder,
  deleteElement,
};
