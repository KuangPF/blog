---
title: js 常见方法
date: 2018-02-08 14:59:36
tags: javascript
summary: 在开发中会遇到一些简单实用的方法，比如移动端设备判断，获取url参数或者去掉字符串中的空格等等，这篇博客目的就在于记录下这些方法，持续更新。

---
在开发中会遇到一些简单实用的方法，比如移动端设备判断，获取url参数或者去掉字符串中的空格等等，这篇博客目的就在于记录下这些方法，持续更新。
## 去掉字符串中的空格
``` javascript
/**
 *去掉所有空格
 * @param {any} str
 * @param {any} isGlobal
 * @returns
*/
let _trim = (str, isGlobal) => {
    let result;
    result = str.replace(/(^\s+)|(\s+$)/g, '');
    if (isGlobal.toLowerCase() === 'g') {
	result = result.replace(/\s/g, '');
    }
    return result;
};
```
<p class='tip'>默认替换字符串首位空格，如果第二个参数为`g`，则替换字符串中所有的空格。</p>

## 获取 url 中参数
``` javascript
/**
 * 获取 url 中的参数
 * @param {any} name
 * @returns
 */
let _getQueryString = (name) => {
    let reg = new RegExp('(^|&?)' + name + '=([^&]*)(&|$)', 'i');
    let r = window.location.search.substr(1).match(reg) || window.location.hash.substr(1).match(reg);
    if (r != null) {
        return decodeURIComponent(r[2]);
    }
    return null;
};
```

## 判断设备
``` javascript
let ua = window.navigator.userAgent;
let browser = {
    isAndroid: () => {
	return ua.match(/Android/i) ? true : false;
    },
    isIOS: () => {
	return ua.match(/iPhone|iPad|iPod/i) ? true : false;
    },
    isWx: () => {
	return ua.match(/micromessenger/i) ? true : false;
    },
    isWp: () => {
	return ua.toLowerCase().indexOf('windows phone') > -1;
    },
    isMobile: () => {
	return ua.match(/(iPhone|iPod|Android|ios)/i) ? true : false;
    },
    isPC: () => {
	return ua.match(/(iPhone|iPod|Android|ios)/i) ? false : true;
    }
};

/* android */
if (browser.isAndroid()) {
  console.log('android');
}
/* ios */
if (browser.isIOS()) {
  console.log('ios');
}
/* windows phone */
if (browser.isWp()) {
  console.log('windows phone');
}
/* weixin */
if (browser.isWx()) {
  console.log('weixin');
}
/* mobile */
if (browser.isMobile()) {
  console.log('Mobile');
}
/* pc */
if (browser.isPC()) {
  console.log('PC')
}
```

## type类型判断
``` javascript
isString (o) { //是否字符串
    return Object.prototype.toString.call(o).slice(8, -1) === 'String'
}

isNumber (o) { //是否数字
    return Object.prototype.toString.call(o).slice(8, -1) === 'Number'
}

isBoolean (o) { //是否boolean
    return Object.prototype.toString.call(o).slice(8, -1) === 'Boolean'
}

isFunction (o) { //是否函数
    return Object.prototype.toString.call(o).slice(8, -1) === 'Function'
}

isNull (o) { //是否为null
    return Object.prototype.toString.call(o).slice(8, -1) === 'Null'
}

isUndefined (o) { //是否undefined
    return Object.prototype.toString.call(o).slice(8, -1) === 'Undefined'
}

isObj (o) { //是否对象
    return Object.prototype.toString.call(o).slice(8, -1) === 'Object'
}

isArray (o) { //是否数组
    return Object.prototype.toString.call(o).slice(8, -1) === 'Array'
}

isDate (o) { //是否时间
    return Object.prototype.toString.call(o).slice(8, -1) === 'Date'
}

isRegExp (o) { //是否正则
    return Object.prototype.toString.call(o).slice(8, -1) === 'RegExp'
}

isError (o) { //是否错误对象
    return Object.prototype.toString.call(o).slice(8, -1) === 'Error'
}

isSymbol (o) { //是否Symbol函数
    return Object.prototype.toString.call(o).slice(8, -1) === 'Symbol'
}

isPromise (o) { //是否Promise对象
    return Object.prototype.toString.call(o).slice(8, -1) === 'Promise'
}

isSet (o) { //是否Set对象
    return Object.prototype.toString.call(o).slice(8, -1) === 'Set'
}

```