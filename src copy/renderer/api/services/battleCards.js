// import axios from 'axios';

const getBattleCards = (accountId) => {
  const promise = new Promise((resolve) => {
    window.electron.ipcRenderer.sendMessage('framework-request', {
      replyEvent: 'get-battle-cards',
      method: 'get',
      url: '/api/v1/frameworks/battle-cards',
      headers: {
        'Content-Type': 'application/json',
        'user-account-id': accountId,
        // Authorization: auth.accessToken,
      },
    });
    window.electron.ipcRenderer.on('get-battle-cards', (response) => {
      resolve(response);
      // callback(response.data);
    });
  });
  return promise;
};

const updateBattleCard = (body = {}, auth = {}) => {
  const promise = new Promise((resolve) => {
    window.electron.ipcRenderer.sendMessage('framework-request', {
      replyEvent: 'update-battle-card',
      method: 'put',
      url: '/api/v1/frameworks/battle-card',
      data: body,
      headers: {
        'Content-Type': 'application/json',
        'user-account-id': auth.user.account_id,
        // Authorization: auth.accessToken,
      },
    });
    window.electron.ipcRenderer.on('update-battle-card', (response) => {
      resolve(response);
      // console.log('auth-authn', response);
    });
  });
  return promise;
};

const updateBattleCardTalkTrackOrder = (body = {}, auth = {}) => {
  const promise = new Promise((resolve) => {
    window.electron.ipcRenderer.sendMessage('framework-request', {
      replyEvent: 'update-battle-card-order',
      method: 'put',
      url: '/api/v1/frameworks/battle-card-talk-track-order',
      data: body,
      headers: {
        'Content-Type': 'application/json',
        'user-account-id': auth.user.account_id,
        // Authorization: auth.accessToken,
      },
    });
    window.electron.ipcRenderer.on('update-battle-card-order', (response) => {
      resolve(response);
      // console.log('auth-authn', response);
    });
  });
  return promise;
};

const createBattleCard = (body = {}, auth = {}) => {
  const promise = new Promise((resolve) => {
    window.electron.ipcRenderer.sendMessage('framework-request', {
      replyEvent: 'create-battle-card',
      method: 'post',
      url: '/api/v1/frameworks/battle-card',
      data: body,
      headers: {
        'Content-Type': 'application/json',
        'user-account-id': auth.user.account_id,
        // Authorization: auth.accessToken,
      },
    });
    window.electron.ipcRenderer.on('create-battle-card', (response) => {
      resolve(response);
      // console.log('auth-authn', response);
    });
  });
  return promise;
};

const addBattleCard = (body = {}, auth = {}) => {
  const promise = new Promise((resolve) => {
    window.electron.ipcRenderer.sendMessage('framework-request', {
      replyEvent: 'add-battle-card',
      method: 'post',
      url: '/api/v1/frameworks/add-battle-card',
      data: body,
      headers: {
        'Content-Type': 'application/json',
        'user-account-id': auth.user.account_id,
        // Authorization: auth.accessToken,
      },
    });
    window.electron.ipcRenderer.on('add-battle-card', (response) => {
      resolve(response);
      // console.log('auth-authn', response);
    });
  });
  return promise;
};

const deleteBattleCard = (body = {}, auth = {}) => {
  const promise = new Promise((resolve) => {
    window.electron.ipcRenderer.sendMessage('framework-request', {
      replyEvent: 'delete-battle-card',
      method: 'delete',
      url: '/api/v1/frameworks/battle-card',
      data: body,
      headers: {
        'Content-Type': 'application/json',
        'user-account-id': auth.user.account_id,
        // Authorization: auth.accessToken,
      },
    });
    window.electron.ipcRenderer.on('delete-battle-card', (response) => {
      resolve(response);
      // console.log('auth-authn', response);
    });
  });
  return promise;
};

const deleteLibraryBattleCard = (body = {}, auth = {}) => {
  const promise = new Promise((resolve) => {
    window.electron.ipcRenderer.sendMessage('framework-request', {
      replyEvent: 'delete-library-battle-card',
      method: 'delete',
      url: '/api/v1/frameworks/library-battle-card',
      data: body,
      headers: {
        'Content-Type': 'application/json',
        'user-account-id': auth.user.account_id,
        // Authorization: auth.accessToken,
      },
    });
    window.electron.ipcRenderer.on('delete-library-battle-card', (response) => {
      resolve(response);
      // console.log('auth-authn', response);
    });
  });
  return promise;
};

export {
  getBattleCards,
  updateBattleCard,
  updateBattleCardTalkTrackOrder,
  createBattleCard,
  addBattleCard,
  deleteBattleCard,
  deleteLibraryBattleCard,
};
