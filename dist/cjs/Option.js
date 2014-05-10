"use strict";
var __extends = require("helpers/helpers").__extends;
var __isConstructor = require("helpers/helpers").__isConstructor;
var __isFunction = require("helpers/helpers").__isFunction;
var __result = require("helpers/helpers").__result;

// http://www.scala-lang.org/
var Option, Some, None;

Option = (function () {

  Option.empty = None;

  /**
   * @template A
   * @param x {A}
   * @returns {*}
   * @constructor
   * @returns {Option}
   */
  function Option(x) {
    if (!__isConstructor.call(this, Option)) {
      if (x == null) {
        return new None();
      }
      else {
        return new Some(x);
      }
    } else {
      // TODO: find out by who this gets called, prevent direct call, allow sub class
      //throw new Error("Option is abstract");
    }
  }

  /**
   * Returns true if the option is $none, false otherwise.
   */
  Option.prototype.isEmpty = function () {
  };

  /**
   * Returns true if the option is an instance of $some, false otherwise.
   */
  Option.prototype.isDefined = function () {
    return !this.isEmpty()
  };

  /**
   * Returns the option's value.
   * @note The option must be nonEmpty.
   * @throws Predef.NoSuchElementException if the option is empty.
   */
  Option.prototype.get = function () {
  };

  /**
   * Returns the option's value if the option is nonempty, otherwise
   * return the result of evaluating `def`.
   *
   * @param def the default expression.
   */
  Option.prototype.getOrElse = function (def) {
    if (this.isEmpty()) {
      return __result(def);
    } else {
      return this.get()
    }
  };

  /**
   * Returns the option's value if it is nonempty,
   * or `null` if it is empty.
   * Although the use of null is discouraged, code written to use
   * $option must often interface with code that expects and returns nulls.
   */
  Option.prototype.orNull = function () {
    return this.getOrElse(null)
  };

  /**
   * Returns a $some containing the result of applying $f to this $option's
   * value if this $option is nonempty.
   * Otherwise return $none.
   *
   *  @note This is similar to `flatMap` except here,
   *  $f does not need to wrap its result in an $option.
   *
   *  @param  f   the function to apply
   *  @see flatMap
   *  @see foreach
   */
  Option.prototype.map = function (f) {
    if (this.isEmpty()) {
      return None()
    } else {
      return Some(f(this.get()))
    }
  };

  /**
   * Returns the result of applying $f to this $option's
   *  value if the $option is nonempty.  Otherwise, evaluates
   *  expression `ifEmpty`.
   *
   *  @note This is equivalent to `$option map f getOrElse ifEmpty`.
   *
   *  @param  ifEmpty the expression to evaluate if empty.
   *  @param  f       the function to apply if nonempty.
   */
  Option.prototype.fold = function (f) {
    return function (ifEmpty) {
      if (this.isEmpty()) {
        return __result(ifEmpty)
      } else {
        return f(this.get())
      }
    }.bind(this)
  };

  /**
   * Returns the result of applying $f to this $option's value if
   * this $option is nonempty.
   * Returns $none if this $option is empty.
   * Slightly different from `map` in that $f is expected to
   * return an $option (which could be $none).
   *
   *  @param  f   the function to apply
   *  @see map
   *  @see foreach
   */
  Option.prototype.flatMap = function (f) {
    if (this.isEmpty()) {
      return None()
    } else {
      return f(this.get())
    }
  };

  // meh..
  Option.prototype.flatten = function () {
    if (this.isEmpty()) {
      return None()
    } else {
      return this.get()
    }
  };

  /**
   * Returns this $option if it is nonempty '''and''' applying the predicate $p to
   * this $option's value returns true. Otherwise, return $none.
   *
   *  @param  p   the predicate used for testing.
   */
  Option.prototype.filter = function (p) {
    if (this.isEmpty() || p(this.get())) {
      return this;
    } else {
      return None()
    }
  };

  /**
   * Returns this $option if it is nonempty '''and''' applying the predicate $p to
   * this $option's value returns false. Otherwise, return $none.
   *
   *  @param  p   the predicate used for testing.
   */
  Option.prototype.filterNot = function (p) {
    if (this.isEmpty() || !p(this.get())) {
      return this;
    } else {
      return None()
    }
  };

  Option.prototype.nonEmpty = Option.prototype.isDefined;

  // TODO: withFilter 

  /** Tests whether the option contains a given value as an element.
   *
   *  @param elem the element to test.
   *  @return `true` if the option has an element that is equal (as
   *  determined by `==`) to `elem`, `false` otherwise.
   */
  Option.prototype.contains = function (elem) {
    // TODO: equals?
    return !this.isEmpty() && this.get() === elem
  };

  /** Returns true if this option is nonempty '''and''' the predicate
   * $p returns true when applied to this $option's value.
   * Otherwise, returns false.
   *
   *  @param  p   the predicate to test
   */
  Option.prototype.exists = function (p) {
    return !this.isEmpty() && p(this.get())
  };

  /** Returns true if this option is empty '''or''' the predicate
   * $p returns true when applied to this $option's value.
   *
   *  @param  p   the predicate to test
   */
  Option.prototype.forall = function (p) {
    return this.isEmpty() || p(this.get())
  };

  /** Apply the given procedure $f to the option's value,
   *  if it is nonempty. Otherwise, do nothing.
   *
   *  @param  f   the procedure to apply.
   *  @see map
   *  @see flatMap
   */
  Option.prototype.foreach = function (f) {
    if (!this.isEmpty()) f(this.get())
  };

  // TODO: collect

  /** Returns this $option if it is nonempty,
   *  otherwise return the result of evaluating `alternative`.
   *  @param alternative the alternative expression.
   */
  Option.prototype.orElse = function (alternative) {
    if (this.isEmpty()) {
      return __result(alternative)
    } else {
      return this
    }
  };

  // TODO: iterator

  // TODO: toList

  // TODO: toRight

  // TODO: toLeft

  return Option
})();

Some = (function (_super) {
  __extends(_super, Some);

  function Some(value) {
    if (!__isConstructor.call(this, Some)) {
      return new Some(value)
    } else {
      Some.__super__.constructor.call(this);
      this.value = value
    }
  }

  Some.prototype.get = function () {
    return this.value;
  };

  Some.prototype.isEmpty = function () {
    return false;
  };

  return Some;
})(Option);

None = (function (_super) {
  __extends(_super, None);

  function None() {
    if (!__isConstructor.call(this, None)) {
      return new None()
    } else {
      None.__super__.constructor.call(this);
    }
  }

  None.prototype.get = function () {
    // TODO: Custom Exceptions
    throw new Error("None.get");
  };

  None.prototype.isEmpty = function () {
    return true;
  };

  return None;
})(Option);

exports.Option = Option;
exports.Some = Some;
exports.None = None;