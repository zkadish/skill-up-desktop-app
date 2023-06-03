const getPastEvents = (accountId, dateRange) => {
  const promise = new Promise((resolve) => {
    window.electron.ipcRenderer.sendMessage('framework-request', {
      replyEvent: 'get-past-events',
      method: 'get',
      url: '/api/v1/frameworks/call-events',
      data: dateRange,
      headers: {
        'Content-Type': 'application/json',
        'user-account-id': accountId,
        // Authorization: auth.accessToken,
      },
    });
    window.electron.ipcRenderer.on('get-past-events', (response) => {
      resolve(response);
      // console.log('auth-authn', response);
      // callback(response.data);
    });
  });
  return promise;
};

const createEvent = (user = {}, event = {}) => {
  const promise = new Promise((resolve) => {
    window.electron.ipcRenderer.sendMessage('framework-request', {
      replyEvent: 'create-event',
      method: 'post',
      url: '/api/v1/frameworks/event',
      data: event,
      headers: {
        'Content-Type': 'application/json',
        'user-account-id': user.account_id,
        // Authorization: auth.accessToken,
      },
    });
    window.electron.ipcRenderer.on('create-event', (response) => {
      resolve(response);
      // console.log('auth-authn', response);
      // callback(response.data);
    });
  });
  return promise;
};

const updateEvent = (user = {}, event = {}) => {
  const promise = new Promise((resolve) => {
    window.electron.ipcRenderer.sendMessage('framework-request', {
      replyEvent: 'update-event',
      method: 'put',
      url: '/api/v1/frameworks/event',
      data: event,
      headers: {
        'Content-Type': 'application/json',
        'user-account-id': user.account_id,
        // Authorization: auth.accessToken,
      },
    });
    window.electron.ipcRenderer.on('update-event', (response) => {
      resolve(response);
      // console.log('auth-authn', response);
      // callback(response.data);
    });
  });
  return promise;
};

const setCallEventTemplate = (body = {}, auth = {}) => {
  const promise = new Promise((resolve) => {
    window.electron.ipcRenderer.sendMessage('framework-request', {
      replyEvent: 'set-call-event-template',
      method: 'post',
      url: '/api/v1/frameworks/event-template',
      data: body,
      headers: {
        'Content-Type': 'application/json',
        'user-account-id': auth.user.account_id,
        // Authorization: auth.accessToken,
      },
    });
    window.electron.ipcRenderer.on('set-call-event-template', (response) => {
      resolve(response);
      // console.log('auth-authn', response);
      // callback(response.data);
    });
  });
  return promise;
};

export { setCallEventTemplate, getPastEvents, createEvent, updateEvent };
