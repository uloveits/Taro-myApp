/**
 * 调用时不用把参数补全; getValue(array, key) 一样可以调用
 * @param array 数组
 * @param key 指定的数值
 * @returns {string|string|string}
 */
export function getConstantValue(array, key, strKey, strValue) {
  let result = '';
  let _strKey = 'id';
  let _strValue = 'value';
  if(strKey) {
    _strKey = strKey;
  }
  if(strValue) {
    _strValue = strValue;
  }
  if (array) {
    for (let item of array) {
      if (key == item[_strKey]) {
        result = item[_strValue];
      }
    }
  }
  return result;
};

export function dateFormat(fmt,date) {
  var o = {
    "M+" : date.getMonth()+1,                 //月份
    "d+" : date.getDate(),                    //日
    "h+" : date.getHours(),                   //小时
    "m+" : date.getMinutes(),                 //分
    "s+" : date.getSeconds(),                 //秒
    "q+" : Math.floor((date.getMonth()+3)/3), //季度
    "S"  : date.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt))
    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)
    if(new RegExp("("+ k +")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
  return fmt;
};
/** 数组转字符串*/
export function arrToString(arr) {
  let _str = '';
  for(let i= 0; i< arr.length;i++) {
    if(i == arr.length - 1){
      _str += arr[i]
    }else {
      _str += arr[i] + ','
    }
  }
  return _str;
}
/** 字符串转数组*/
export function stringToArr(str) {
  if(str) {
    let arr = str.split(',');
    let _arr = [];
    for(let i= 0; i< arr.length; i++) {
      let _value = parseInt(arr[i]);
      _arr.push(_value);
    }
    return  _arr;
  }else {
    return '';
  }

}

/** 将数组里某一字符传转成数组*/
export function stringToArrInObj(obj,item) {
  if(obj){
    for(let i= 0; i< obj.length; i++){
      obj[i][item] = stringToArr(obj[i][item]);
    }
    return obj;
  }else {
    return []
  }

}

/** 省市区三级联动id转化成value*/
export function getConstAddress(constArr,arr) {
  let _idxP = arr[0];
  let _idxC = arr[1];
  let _idxA = arr[2];
  let _arrP = getConstantValue(constArr,_idxP,'value','children');
  let _lblP = getConstantValue(constArr,_idxP,'value','label');
  let _arrC = getConstantValue(_arrP,_idxC,'value','children');
  let _lblC = getConstantValue(_arrP,_idxC,'value','label');
  let _lblA = getConstantValue(_arrC,_idxA,'value','label');
  return _lblP + '/' + _lblC + '/' + _lblA;

}

/**
 * @param {String|Number} value 要验证的字符串或数值
 * @param {*} validList 用来验证的列表
 */
export function oneOf (value, validList) {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true
    }
  }
  return false
}

