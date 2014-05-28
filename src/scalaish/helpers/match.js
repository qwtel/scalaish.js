import {_} from 'underscore';
import {__isFunction, __equals} from './helpers';

// TODO: Use pseudo case classes?

/**
 * @template B
 * @template R
 * @param o {B} Any JS value to match against.
 * @constructor
 */
function Case(o) {
  this.o = o;
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
    return (__equals(this.o, other)) ?
      new Match(f.call(context, this.o)) :
      this;
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
    return new Match(f.call(context, this.o));
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
  Case.call(this, o);
}

var unCreate = function (Class, o) {
// TODO: recursive unCreate
  return Class.unCreate ?
    Class.unCreate(o) :
    [o];
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
      new Match(f.apply(context, unCreate(Class, this.o))) :
      this;
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
  Case.call(this, o);
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
      this;
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
    return this;
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
  default: function () {
    return this;
  }
};

/**
 * Starts a pseudo pattern-match.
 *
 * @param {Any|object|*} o
 * @return {Case}
 */
function match(o) {
  if (typeof o.Any !== 'undefined') {
    return new ScalaishCase(o);
  } else if (__isFunction(o)) {
    return new ConstructorCase(o);
  } else {
    return new Case(o);
  }
}
export {match};
