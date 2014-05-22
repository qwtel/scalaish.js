// http://coffeescript.org/
var __extends = function (parent, child) {
  /*
   // Do we want this?
   for (var key in parent) {
   if (parent.hasOwnProperty(key)) child[key] = parent[key];
   }
   */

  /*
   function ctor() {
   this.constructor = child;
   }

   ctor.prototype = parent.prototype;
   child.prototype = new ctor();
   */

  child.__super__ = parent.prototype;
  child.prototype = Object.create(parent.prototype, {});
  return child;
};

// http://stackoverflow.com/a/1880726/870615
var __isConstructor = function (Clazz) {
  var isConstructor = false;
  if (this instanceof Clazz && !this['__previouslyConstructedBy' + Clazz.name]) {
    isConstructor = true;
    this['__previouslyConstructedBy' + Clazz.name] = true;
  }
  return isConstructor;
};

// http://underscorejs.org/
var __isFunction = function (obj) {
  return typeof obj === 'function';
};

// http://underscorejs.org/
var __result = function (value) {
  return __isFunction(value) ? value.call() : value;
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

export {__extends, __isConstructor, __isFunction, __result, __clone};
