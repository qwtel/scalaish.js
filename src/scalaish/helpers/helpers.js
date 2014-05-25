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

function Case(o) {
  this.o = o
}

Case.prototype = {
  case: function (className, f, context) {
    if (this.o.isInstanceOf(className)) {
      return new Match(f.call(context, this.o._1, this.o._2, this.o._3, this.o._4 /* TODO */))
    }
    return this
  },

  get: function () {
    throw new Error("MatchError");
  }
};

function Match(res) {
  this.res = res;
}

Match.prototype = {
  case: function () {
    return this
  },

  get: function () {
    return this.res;
  }
};

function match(caseObj) {
  return new Case(caseObj)
}

export {__extends, __isConstructor, __isFunction, __result, __clone, match};
