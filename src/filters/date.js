import moment from 'moment';
export const dateFilter = (value, formatString = 'YYYY-MM-DD HH:mm:ss') => {
  if (!value) {
    return value;
  }
  const data = new Date(value);
  if (data === 'Invalid Date') {
    return value;
  } else {
    return moment(value).format(formatString);
  }
};
