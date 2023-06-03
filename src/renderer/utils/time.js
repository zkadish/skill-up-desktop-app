// TODO: refactor to use UTC time
export const weekday = dateObj => {
  let day = null;
  switch (dateObj.getDay()) {
    case 0:
      day = 'Sunday';
      break;
    case 1:
      day = 'Monday';
      break;
    case 2:
      day = 'Tuesday';
      break;
    case 3:
      day = 'Wednesday';
      break;
    case 4:
      day = 'Thursday';
      break;
    case 5:
      day = 'Friday';
      break;
    default:
      day = 'Saturday';
  }

  return day;
};

export const getMonth = dateObj => {
  let month = null;
  switch (dateObj.getMonth()) {
    case 0:
      month = 'January';
      break;
    case 1:
      month = 'February';
      break;
    case 2:
      month = 'March';
      break;
    case 3:
      month = 'April';
      break;
    case 4:
      month = 'May';
      break;
    case 5:
      month = 'June';
      break;
    case 6:
      month = 'July';
      break;
    case 7:
      month = 'August';
      break;
    case 8:
      month = 'September';
      break;
    case 9:
      month = 'October';
      break;
    case 10:
      month = 'November';
      break;
    default:
      month = 'December';
  }
  return month;
};

export const getYesterdayDate = () => {
  const dateObj = new Date();
  const yesterdayObj = new Date(dateObj.setDate(dateObj.getDate() - 1));
  const date = yesterdayObj.getDate();
  const year = yesterdayObj.getFullYear();
  return `${weekday(yesterdayObj)}, ${getMonth(dateObj)} ${date} ${year}`;
};

export const getDateToday = () => {
  const dateObj = new Date();
  const date = dateObj.getDate();
  const year = dateObj.getFullYear();
  return `${weekday(dateObj)}, ${getMonth(dateObj)} ${date} ${year}`;
};

export const getTomorrowDate = () => {
  const dateObj = new Date();
  const tomorrowObj = new Date(dateObj.setDate(dateObj.getDate() + 1));
  const date = tomorrowObj.getDate();
  const year = tomorrowObj.getFullYear();
  return `${weekday(tomorrowObj)}, ${getMonth(dateObj)} ${date} ${year}`;
};

export const getTodayOffSet = (offSet = 0) => {
  const dateObj = new Date();
  const offSetObj = new Date(dateObj.setDate(dateObj.getDate() + offSet));
  const date = offSetObj.getDate();
  const year = offSetObj.getFullYear();
  return {
    date: `${weekday(offSetObj)}, ${getMonth(offSetObj)} ${date} ${year}`,
    dateObj: offSetObj,
  };
};

export const isSameDate = (a, b) => {
  const sameDate = new Date(a).getDate() === new Date(b).getDate();
  const sameYear = new Date(a).getYear() === new Date(b).getYear();
  const sameMonth = new Date(a).getMonth() === new Date(b).getMonth();

  return sameDate && sameYear && sameMonth;
};

export const getMeridianTime = (dateObj) => {
  const time = new Date(dateObj).toLocaleTimeString().split(':');
  const hours = `${time[0].replace('0', '')}:`;
  const meridian = time[2].slice(3).toLowerCase();
  const meridianTime = [hours, time[1], meridian].join('');

  return meridianTime;
};
