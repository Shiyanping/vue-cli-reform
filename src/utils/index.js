/**
 * 时间格式化
 * 用法：utils.dateFormat(时间戳, 'yyyy-MM-dd hh:mm:ss')
 * @param {string} date - 当前时间
 * @param {string} format - 格式化之后的格式
 */
export function parseTime(date, format) {
  if (format === undefined) {
    format = date;
    date = new Date();
  } else {
    console.log(date);
    date = new Date(date);
  }
  let map = {
    M: date.getMonth() + 1, // 月份
    d: date.getDate(), // 日
    h: date.getHours(), // 小时
    m: date.getMinutes(), // 分
    s: date.getSeconds(), // 秒
    q: Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  };
  format = format.replace(/([yMdhmsqS])+/g, function(all, t) {
    let v = map[t];
    if (v !== undefined) {
      if (all.length > 1) {
        v = '0' + v;
        v = v.substr(v.length - 2);
      }
      return v;
    } else if (t === 'y') {
      console.log(date);
      return (date.getFullYear() + '').substr(4 - all.length);
    }
    return all;
  });
  return format;
}

/**
 * 时间格式化
 * 用法：utils.dateFormat(时间戳, 'yyyy-MM-dd hh:mm:ss')
 * @param {string} date - 当前时间
 * @param {string} format - 格式化之后的格式，传了格式就返回指定格式的日期，否则返回刚刚这种的时间格式
 */
export function formatTime(time, option) {
  const d = new Date(time);
  const now = Date.now();

  const diff = (now - d) / 1000;

  if (option) {
    return parseTime(d, option);
  } else {
    if (diff < 30) {
      return '刚刚';
    } else if (diff < 3600) {
      // less 1 hour
      return Math.ceil(diff / 60) + '分钟前';
    } else if (diff < 3600 * 24) {
      return Math.ceil(diff / 3600) + '小时前';
    } else if (diff < 3600 * 24 * 2) {
      return '1天前';
    }
    // return (
    //   d.getMonth() +
    //   1 +
    //   '月' +
    //   d.getDate() +
    //   '日' +
    //   d.getHours() +
    //   '时' +
    //   d.getMinutes() +
    //   '分'
    // );
  }
}
