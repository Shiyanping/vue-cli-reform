let defaultCity = '北京';
// 使用 localStorage 需要查错 防止浏览器奔溃
try {
  if (localStorage.city) {
    defaultCity = localStorage.city;
  }
} catch (e) {}

export default {
  city: defaultCity
};
