// The requests are being handled in the main.ts
const getUserAccount = (user) => {
  const promise = new Promise((resolve) => {
    window.electron.ipcRenderer.sendMessage('auth-request', {
      replyEvent: 'user-account',
      method: 'get',
      url: '/api/user-account/v1/account',
      headers: {
        'Content-Type': 'application/json',
        'user-account-id': user.account_id,
        // Authorization: auth.accessToken,
      },
    });
    window.electron.ipcRenderer.on('user-account', (response) => {
      resolve(response);
      // console.log('auth-authn', response);
      // callback(response.data);
    });
  });
  return promise;
};

const updateUserAccount = (user, data) => {
  const promise = new Promise((resolve) => {
    window.electron.ipcRenderer.sendMessage('auth-request', {
      replyEvent: 'update-user-account',
      method: 'put',
      url: '/api/user-account/v1/account',
      data,
      headers: {
        'Content-Type': 'application/json',
        'user-account-id': user.account_id,
        // Authorization: auth.accessToken,
      },
    });
    window.electron.ipcRenderer.on('update-user-account', (response) => {
      resolve(response);
      // console.log('auth-authn', response);
      // callback(response.data);
    });
  });
  return promise;
};

export { getUserAccount, updateUserAccount };
