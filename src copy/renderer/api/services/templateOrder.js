// import axios from 'axios';

const getTemplateOrder = (accountId) => {
  const promise = new Promise((resolve) => {
    window.electron.ipcRenderer.sendMessage('framework-request', {
      replyEvent: 'get-template-order',
      method: 'get',
      url: '/api/v1/frameworks/template-order',
      headers: {
        'Content-Type': 'application/json',
        'user-account-id': accountId,
        // Authorization: auth.accessToken,
      },
    });
    window.electron.ipcRenderer.on('get-template-order', (response) => {
      debugger;
      resolve(response);
      // callback(response.data);
    });
  });
  return promise;
};

const updateTemplateOrder = (body = {}, auth = {}) => {
  const promise = new Promise((resolve) => {
    window.electron.ipcRenderer.sendMessage('framework-request', {
      replyEvent: 'update-template-order',
      method: 'put',
      url: '/api/v1/frameworks/template-order',
      headers: {
        'Content-Type': 'application/json',
        'user-account-id': auth.user.account_id,
        // Authorization: auth.accessToken,
      },
      data: body,
    });
    window.electron.ipcRenderer.on('update-template-order', (response) => {
      resolve(response);
      // callback(response.data);
    });
  });
  return promise;
};

export { getTemplateOrder, updateTemplateOrder };
