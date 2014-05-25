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

/**
 * @template B
 * @template R
 * @param o {B} Any JS value to match against.
 * @constructor
 */
function Case(o) {
  this.o = o
}

Case.prototype = {

  /**
   *
   * @param {B} other - An arbitrary object to compare to
   * @param {function(B): R} f - A callback function if it is a match.
   * @param {object=} context
   * @return {Match|Case}
   */
  case: function (other, f, context) {
    return (this.o === other /* TODO: equals? */) ?
      new Match(f.call(context, this.o)) :
      this
  },

  /**
   * Can't get a result before a matching pattern has been found.
   * @throws {Error}
   */
  get: function () {
    throw new Error("MatchError");
  },

  /**
   * The default case.
   *
   * Equal to calling `.case(undefined, f, context)`.
   *
   * @param {function(B): R} f - A callback function for the default case.
   * @param {object=} context
   * @return {Match}
   */
  default: function (f, context) {
    return new Match(f.call(context, this.o))
  }
};

/**
 * Matching against a scalaish object.
 * This means a `isInstanceOf` method is present.
 *
 * @param {Any} o - A scalaish object
 * @constructor
 * @extends {Case}
 */
function ScalaishCase(o) {
  Case.call(this, o)
}

// TODO: unapply as much as possible?
var unapply = function (Class, o) {
  return Class.unapply ?
    Class.unapply(o) :
    o
};

ScalaishCase.prototype = _.extend(Object.create(Case.prototype), {

  /**
   * @param {function} Class - The factory method (pseudo companion object) of a scalaish class
   * @param {function(B): R} f
   * @param {object=} context
   * @return {Match|ScalaishCase}
   */
  case: function (Class, f, context) {
    return (this.o.isInstanceOf(Class)) ?
      new Match(f.call(context, unapply(Class, this.o))) :
      this
  }
});

/**
 * Matching against a JS object.
 * This means a the `instaceof` operator is used.
 *
 * @param {object} o
 * @constructor
 * @extends {Case}
 */
function ConstructorCase(o) {
  Case.call(this, o)
}

ConstructorCase.prototype = _.extend(Object.create(Case.prototype), {

  /**
   * Returns a `Match` if `this.o` has been created with the constructor `Class`.
   *
   * @param {function} Class - A regular JS constructor function
   * @param {function(B): R} f
   * @param {object=} context
   * @return {Match|ConstructorCase}
   */
  case: function (Class, f, context) {
    return (this.o instanceof Class) ?
      new Match(f.call(context, this.o)) :
      this
  }
});

/**
 * Represents a match.
 * All further calls to 'case' will be ignored.
 *
 * @param {R} res The result of the case callback function
 * @constructor
 */
function Match(res) {
  this.res = res;
}

Match.prototype = {
  /**
   * @return {Match}
   */
  case: function () {
    return this
  },

  /**
   * Returns the result of the callback of the matching case.
   * This call to res is optional if you are not interested in the result.
   * @return {R}
   */
  get: function () {
    return this.res;
  },

  /**
   * @return {Match}
   */
  default: function (f, context) {
    return this
  }
};

/**
 * Starts a pseudo pattern-match.
 *
 * @param {Any|object|*} caseObj
 * @return {Case}
 */
function match(caseObj) {
  if (typeof caseObj['Any'] !== 'undefined') {
    return new ScalaishCase(caseObj)
  } else if (__isFunction(caseObj)) {
    return new ConstructorCase(caseObj)
  } else {
    return new Case(caseObj)
  }
}

var println = console.log;

function time(f, context) {
  var start = new Date().getTime();
  f.call(context);
  var now = new Date().getTime();
  return now - start
}

function printTime(f, context) {
  println(time(f, context))
}

export {__extends, __isConstructor, __isFunction, __result, __clone, match, println, time, printTime};
