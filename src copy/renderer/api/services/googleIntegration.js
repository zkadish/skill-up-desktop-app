const getGoogleCalEvents = (userSettings, today, endDate) => {
  const promise = new Promise((resolve) => {
    window.electron.ipcRenderer.sendMessage('auth-request', {
      replyEvent: 'get-google-cal-events',
      method: 'get',
      url: '/api/google/v1/calendar/events',
      data: { userSettings, today, endDate },
      headers: {
        'Content-Type': 'application/json',
        'user-account-id': userSettings.id,
        // Authorization: auth.accessToken,
      },
    });
    window.electron.ipcRenderer.on('get-google-cal-events', (response) => {
      resolve(response);
      // console.log('auth-authn', response);
      // callback(response.data);
    });
  });
  return promise;
};

export default getGoogleCalEvents;
