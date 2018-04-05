/**
 * 解析url参数
 * @example ?id=1124&name=zmy
 * @returns Object {id: 1124, name: zmy}
 */
export function urlParse() {
  // window.location.search 可以拿到get的参数
  let url = window.location.search;
  let obj = {};
  let reg = /[?&][^?&]+=[^?&]+/g;
  let arr = url.match(reg);
  // ['?id=1124', '&name=zmy']
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substring(1).split('=');
      let key = decodeURIComponent(tempArr[0]);
      let val = decodeURIComponent(tempArr[1]);
      // 赋值对象方法
      obj[key] = val;
    });
    console.log(obj);
  }
  return obj;
}
