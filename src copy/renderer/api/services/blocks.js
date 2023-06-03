// getBlocks is currently not being used
const getBlocks = (accountId) => {
  const promise = new Promise((resolve) => {
    window.electron.ipcRenderer.sendMessage('framework-request', {
      replyEvent: 'get-blocks',
      method: 'get',
      url: '/api/v1/frameworks/blocks',
      headers: {
        'Content-Type': 'application/json',
        'user-account-id': accountId,
        // Authorization: auth.accessToken,
      },
    });
    window.electron.ipcRenderer.on('get-blocks', (response) => {
      resolve(response);
      // callback(response.data);
    });
  });
  return promise;
};

const createBlock = (body = {}, auth = {}) => {
  const promise = new Promise((resolve) => {
    window.electron.ipcRenderer.sendMessage('framework-request', {
      replyEvent: 'create-block',
      method: 'post',
      url: '/api/v1/frameworks/block',
      data: body,
      headers: {
        'Content-Type': 'application/json',
        'user-account-id': auth.user.account_id,
        // Authorization: auth.accessToken,
      },
    });
    window.electron.ipcRenderer.on('create-block', (response) => {
      resolve(response);
      // console.log('auth-authn', response);
    });
  });
  return promise;
};

const updateBlock = (body = {}, auth = {}) => {
  const promise = new Promise((resolve) => {
    window.electron.ipcRenderer.sendMessage('framework-request', {
      replyEvent: 'update-block',
      method: 'put',
      url: '/api/v1/frameworks/block',
      data: body,
      headers: {
        'Content-Type': 'application/json',
        'user-account-id': auth.user.account_id,
        // Authorization: auth.accessToken,
      },
    });
    window.electron.ipcRenderer.on('update-block', (response) => {
      resolve(response);
      // console.log('auth-authn', response);
    });
  });
  return promise;
};

const updateBlockOrder = (body = {}, auth = {}) => {
  const promise = new Promise((resolve) => {
    window.electron.ipcRenderer.sendMessage('framework-request', {
      replyEvent: 'block-order',
      method: 'put',
      url: '/api/v1/frameworks/block-order',
      data: body,
      headers: {
        'Content-Type': 'application/json',
        'user-account-id': auth.user.account_id,
        // Authorization: auth.accessToken,
      },
    });
    window.electron.ipcRenderer.on('block-order', (response) => {
      resolve(response);
      // console.log('auth-authn', response);
    });
  });
  return promise;
};

const deleteBlock = (body = {}, auth = {}) => {
  const promise = new Promise((resolve) => {
    window.electron.ipcRenderer.sendMessage('framework-request', {
      replyEvent: 'delete-block',
      method: 'delete',
      url: '/api/v1/frameworks/block',
      data: body,
      headers: {
        'Content-Type': 'application/json',
        'user-account-id': auth.user.account_id,
        // Authorization: auth.accessToken,
      },
    });
    window.electron.ipcRenderer.on('delete-block', (response) => {
      resolve(response);
      // console.log('auth-authn', response);
    });
  });
  return promise;
};

export { getBlocks, createBlock, updateBlock, updateBlockOrder, deleteBlock };
