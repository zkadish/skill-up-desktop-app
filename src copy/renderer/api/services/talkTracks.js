// import axios from 'axios';

const getTalkTracks = (accountId) => {
  const promise = new Promise((resolve) => {
    window.electron.ipcRenderer.sendMessage('framework-request', {
      replyEvent: 'get-talk-tracks',
      method: 'get',
      url: '/api/v1/frameworks/talk-tracks',
      headers: {
        'Content-Type': 'application/json',
        'user-account-id': accountId,
        // Authorization: auth.accessToken,
      },
    });
    window.electron.ipcRenderer.on('get-talk-tracks', (response) => {
      resolve(response);
      // callback(response.data);
    });
  });
  return promise;
};

const createTalkTrack = (body = {}, auth = {}) => {
  const promise = new Promise((resolve) => {
    window.electron.ipcRenderer.sendMessage('framework-request', {
      replyEvent: 'create-talk-track',
      method: 'post',
      url: '/api/v1/frameworks/talk-track',
      data: body,
      headers: {
        'Content-Type': 'application/json',
        'user-account-id': auth.user.account_id,
        // Authorization: auth.accessToken,
      },
    });
    window.electron.ipcRenderer.on('create-talk-track', (response) => {
      resolve(response);
      // console.log('auth-authn', response);
    });
  });
  return promise;
};

const updateTalkTrack = (body = {}, auth = {}) => {
  const promise = new Promise((resolve) => {
    window.electron.ipcRenderer.sendMessage('framework-request', {
      replyEvent: 'update-talk-track',
      method: 'put',
      url: '/api/v1/frameworks/talk-track',
      data: body,
      headers: {
        'Content-Type': 'application/json',
        'user-account-id': auth.user.account_id,
        // Authorization: auth.accessToken,
      },
    });
    window.electron.ipcRenderer.on('update-talk-track', (response) => {
      resolve(response);
      // console.log('auth-authn', response);
    });
  });
  return promise;
};

const addTalkTrack = (body = {}, auth = {}) => {
  const promise = new Promise((resolve) => {
    window.electron.ipcRenderer.sendMessage('framework-request', {
      replyEvent: 'add-talk-track',
      method: 'post',
      url: '/api/v1/frameworks/add-talk-track',
      data: body,
      headers: {
        'Content-Type': 'application/json',
        'user-account-id': auth.user.account_id,
        // Authorization: auth.accessToken,
      },
    });
    window.electron.ipcRenderer.on('add-talk-track', (response) => {
      resolve(response);
      // console.log('auth-authn', response);
    });
  });
  return promise;
};

const deleteTalkTrack = (body = {}, auth = {}) => {
  const promise = new Promise((resolve) => {
    window.electron.ipcRenderer.sendMessage('framework-request', {
      replyEvent: 'delete-talk-track',
      method: 'delete',
      url: '/api/v1/frameworks/talk-track',
      data: body,
      headers: {
        'Content-Type': 'application/json',
        'user-account-id': auth.user.account_id,
        // Authorization: auth.accessToken,
      },
    });
    window.electron.ipcRenderer.on('delete-talk-track', (response) => {
      resolve(response);
      // console.log('auth-authn', response);
    });
  });
  return promise;
};

const deleteLibraryTalkTrack = (body = {}, auth = {}) => {
  const promise = new Promise((resolve) => {
    window.electron.ipcRenderer.sendMessage('framework-request', {
      replyEvent: 'delete-library-talk-track',
      method: 'delete',
      url: '/api/v1/frameworks/library-talk-track',
      data: body,
      headers: {
        'Content-Type': 'application/json',
        'user-account-id': auth.user.account_id,
        // Authorization: auth.accessToken,
      },
    });
    window.electron.ipcRenderer.on('delete-library-talk-track', (response) => {
      resolve(response);
      // console.log('auth-authn', response);
    });
  });
  return promise;
};

export {
  getTalkTracks,
  updateTalkTrack,
  createTalkTrack,
  addTalkTrack,
  deleteTalkTrack,
  deleteLibraryTalkTrack,
};
