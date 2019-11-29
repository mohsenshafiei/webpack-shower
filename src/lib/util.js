const log = console.log;
const match = (reg, value) => RegExp(`${reg}`).test(value)
const pipe2 = (fn1, fn2) => (...args) => fn1(fn2(...args));
const sort = (arr) => arr.sort((a, b) => b.size - a.size);
const spaces = (val, stickerLength = 30) => new Array((stickerLength - val)).fill(' ').join('');
const pick = (obj, keys) => keys.map(k => k in obj ? {[k]: obj[k]} : {}).reduce((res, o) => Object.assign(res, o), {});
const flat = (arr) => arr.reduce((res, el) => el.modules ? [...res, ...flat(el.modules)] : [...res, el], []);
const getDate = () => new Date().toLocaleString();
const bytesToSize = (bytes) => {
   const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
   if (bytes == 0) return '0 Byte';
   const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
   return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

module.exports = {
  log,
  match,
  spaces,
  pick,
  getDate,
  bytesToSize,
  sort,
  pipe2,
  flat,
}
