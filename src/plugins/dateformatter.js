// Element UI Table 时间格式化
import moment from 'moment';
export const dateY2S = (row, col, val) => {
  if (!val) {
    return val;
  }
  const data = new Date(val);
  if (data === 'Invalid Date') {
    return val;
  } else {
    return moment(val).format('YYYY-MM-DD HH:mm:ss');
  }
};

export const dateY2D = (row, col, val) => {
  if (!val) {
    return val;
  }
  const data = new Date(val);
  if (data === 'Invalid Date') {
    return val;
  } else {
    return moment(val).format('YYYY-MM-DD');
  }
};

export const dateH2D = (row, col, val) => {
  if (!val) {
    return val;
  }
  const data = new Date(val);
  if (data === 'Invalid Date') {
    return val;
  } else {
    return moment(val).format('HH:mm:ss');
  }
};
