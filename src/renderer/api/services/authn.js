// The requests are being handled in the main.ts
const signIn = (body) => {
  const promise = new Promise((resolve) => {
    window.electron.ipcRenderer.sendMessage('auth-request', {
      replyEvent: 'auth-login',
      method: 'post',
      url: '/api/auth/login',
      data: body,
      headers: {
        'Content-Type': 'application/json',
        // 'user-account-id': accountId,
        // Authorization: auth.accessToken,
      },
    });
    window.electron.ipcRenderer.once('auth-login', (response) => {
      resolve(response);
      // console.log('auth-login', response);
      // callback(response.status, response.data);
    });
  });
  return promise;
};

const authn = () => {
  const promise = new Promise((resolve) => {
    window.electron.ipcRenderer.sendMessage('auth-request', {
      replyEvent: 'auth-authn',
      method: 'get',
      url: '/api/auth/authn',
      headers: {
        'Content-Type': 'application/json',
        // 'user-account-id': accountId,
        // Authorization: auth.accessToken,
      },
    });
    window.electron.ipcRenderer.once('auth-authn', (response) => {
      resolve(response);
      // console.log('auth-authn', response);
      // callback(response.status, response.data);
    });
  });
  return promise;
};

const signOut = (body) => {
  const promise = new Promise((resolve) => {
    window.electron.ipcRenderer.sendMessage('auth-request', {
      replyEvent: 'auth-sign-out',
      method: 'post',
      url: '/api/auth/sign-out',
      data: body,
      headers: {
        'Content-Type': 'application/json',
        // 'user-account-id': accountId,
        // Authorization: auth.accessToken,
      },
    });
    window.electron.ipcRenderer.once('auth-sign-out', (response) => {
      resolve(response);
      // console.log('auth-sign-out', response);
      // callback(response.status, response.data);
    });
  });
  return promise;
};

export { signIn, authn, signOut };
