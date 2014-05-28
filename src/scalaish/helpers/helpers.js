import {_} from 'underscore';

// http://coffeescript.org/
var __extends = function (parent, child) {
  child.__super__ = parent.prototype;

  function ctor() {
    this.constructor = child;
  }

  ctor.prototype = parent.prototype;
  child.prototype = new ctor();

  return child;
};

// http://stackoverflow.com/a/1880726/870615
// super bad performance, don't use this
var __isConstructor = function (_this, Class) {
  var isConstructor = false;
  var key = '__previouslyConstructedBy' + Class.name + '__';
  if (_this instanceof Class && !_this[key]) {
    isConstructor = true;
    Object.defineProperty(_this, key, {
      value: true,
      writeable: false,
      enumerable: false
    })
  }
  return isConstructor;
};

// http://underscorejs.org/
var __isFunction = function (obj) {
  return typeof obj === 'function';
};

// http://underscorejs.org/
var __result = function (value, context) {
  return __isFunction(value) ? value.call(context) : value;
};

// http://stackoverflow.com/a/728694/870615
var __clone2 = function (obj) {
  if (null == obj || "object" != typeof obj) return obj;
  var copy = obj.constructor();
  for (var attr in obj) {
    if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
  }
  return copy;
};

/**
 * Clone function for a property descriptor that goes two levels deep
 */
var __clone = function (obj) {
  if (null == obj || "object" != typeof obj) return obj;
  var copy = obj.constructor();
  for (var attr in obj) {
    if (obj.hasOwnProperty(attr)) copy[attr] = __clone2(obj[attr]);
  }
  return copy;
};

var println = console.log;

function time(f, context) {
  var start = new Date().getTime();
  f.call(context);
  var now = new Date().getTime();
  return now - start;
}

function printTime(f, context) {
  println(time(f, context));
}

function __equals(o1, o2) {
  if (typeof o1.equals !== 'undefined') {
    if (typeof o2.equals !== 'undefined') {
      return o1.equals(o2);
    } else {
      return false;
    }
  } else {
    if (typeof o2.equals === 'undefined') {
      return o1 === o2;
    } else {
      return false;
    }
  }
}

export {__extends, __isConstructor, __isFunction, __result, __clone, __equals, println, time, printTime};
