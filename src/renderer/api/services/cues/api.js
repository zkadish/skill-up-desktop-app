import mockData from '../../../mockData/notifications.json';

const getNotifications = () => {
  return new Promise(resolve => {
    return resolve(mockData.notifications);
  });
};

export { getNotifications };
