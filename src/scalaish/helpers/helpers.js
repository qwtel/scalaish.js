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

var println = function() {
  var x;
  var args = [];
  for (var i = 0; i < arguments.length; i++) {
    x = arguments[i];
    args.push((x && x.toString) ? x.toString() : x);
  }
  console.log.apply(undefined, args);
};

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

/**
 * Surprisingly awesome wrapper function.
 * Turns an object into a function that will call the original object `constructor` function when invoked.
 * Still has all the properties of the original properties of the object though.
 *
 * @param {Object} target
 * @return {Function}
 */
function __wrap(target) {
  var result = function () {
    return target.constructor.apply(target, arguments);
  };

  for (var key in target) {
    if (typeof key === 'function') {
      result[key] = target[key].bind(target);
    } else {
      result[key] = target[key];
    }
  }

  return result;
}

function __isArray(a) {
  return _.isArray(a);
}

export {__extends, __isConstructor, __isFunction, __result, __clone, __equals, __wrap, __isArray, println, time, printTime};
