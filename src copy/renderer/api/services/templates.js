// import axios from 'axios';

const getBuildTemplates = (accountId) => {
  const promise = new Promise((resolve) => {
    window.electron.ipcRenderer.sendMessage('framework-request', {
      replyEvent: 'get-build-templates',
      method: 'get',
      url: '/api/v1/frameworks/build-templates',
      headers: {
        'Content-Type': 'application/json',
        'user-account-id': accountId,
        // Authorization: auth.accessToken,
      },
    });
    window.electron.ipcRenderer.on('get-build-templates', (response) => {
      resolve(response);
      // callback(response.data);
    });
  });
  return promise;
};

const createTemplate = (body = {}, auth = {}) => {
  const promise = new Promise((resolve) => {
    window.electron.ipcRenderer.sendMessage('framework-request', {
      replyEvent: 'create-template',
      method: 'post',
      url: '/api/v1/frameworks/template',
      data: body,
      headers: {
        'Content-Type': 'application/json',
        'user-account-id': auth.user.account_id,
        // Authorization: auth.accessToken,
      },
    });
    window.electron.ipcRenderer.on('create-template', (response) => {
      resolve(response);
      // console.log('auth-authn', response);
    });
  });
  return promise;
};

const updateTemplate = (body = {}, auth = {}) => {
  const promise = new Promise((resolve) => {
    window.electron.ipcRenderer.sendMessage('framework-request', {
      replyEvent: 'update-template',
      method: 'put',
      url: '/api/v1/frameworks/template',
      data: body,
      headers: {
        'Content-Type': 'application/json',
        'user-account-id': auth.user.account_id,
        // Authorization: auth.accessToken,
      },
    });
    window.electron.ipcRenderer.on('update-template', (response) => {
      resolve(response);
      // console.log('auth-authn', response);
    });
  });
  return promise;
};

const deleteTemplate = (body = {}, auth = {}) => {
  const promise = new Promise((resolve) => {
    window.electron.ipcRenderer.sendMessage('framework-request', {
      replyEvent: 'delete-template',
      method: 'delete',
      url: '/api/v1/frameworks/template',
      data: body,
      headers: {
        'Content-Type': 'application/json',
        'user-account-id': auth.user.account_id,
        // Authorization: auth.accessToken,
      },
    });
    window.electron.ipcRenderer.on('delete-template', (response) => {
      resolve(response);
      // console.log('auth-authn', response);
    });
  });
  return promise;
};

export { getBuildTemplates, createTemplate, updateTemplate, deleteTemplate };
