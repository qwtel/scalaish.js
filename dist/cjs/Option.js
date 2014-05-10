"use strict";
var __extends = require("helpers/helpers").__extends;
var __isConstructor = require("helpers/helpers").__isConstructor;
var __isFunction = require("helpers/helpers").__isFunction;
var __result = require("helpers/helpers").__result;

// http://www.scala-lang.org/
var Option, Some, None;

Option = (function () {

  /**
   * An Option factory which returns `None` in a manner consistent with
   * the collections hierarchy.
   */
  Option.empty = None;

  /**
   * An Option factory which creates Some(x) if the argument is not null,
   *  and None if it is null.
   *
   * @template A
   * @param x {A} the value
   * @constructor
   * @return {Option.<A>} Some(value) if value != null, None if value == null
   */
  function Option(x) {
    if (!__isConstructor.call(this, Option)) {
      if (x == null) {
        return None();
      }
      else {
        return Some(x);
      }
    } else {
      // TODO: find out by who this gets called, prevent direct call, allow sub class
      //throw new Error("Option is abstract");
    }
  }

  /**
   * Returns true if the option is $none, false otherwise.
   * @return {boolean}
   */
  Option.prototype.isEmpty = function () {
  };

  /**
   * Returns true if the option is an instance of $some, false otherwise.
   * @return {boolean}
   */
  Option.prototype.isDefined = function () {
    return !this.isEmpty()
  };

  /**
   * Returns the option's value.
   * @note The option must be nonEmpty.
   * @throws Predef.NoSuchElementException if the option is empty.
   * @return {A}
   */
  Option.prototype.get = function () {
  };

  /**
   * Returns the option's value if the option is nonempty, otherwise
   * return the result of evaluating `def`.
   *
   * @param def {A|function(): A} the default expression.
   * @return {A}
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
   * @return {A|null}
   */
  Option.prototype.orNull = function () {
    return this.getOrElse(null)
  };

  /**
   * Returns a $some containing the result of applying $f to this $option's
   * value if this $option is nonempty.
   * Otherwise return $none.
   *
   * @note This is similar to `flatMap` except here,
   * $f does not need to wrap its result in an $option.
   *
   * @template B
   * @param  f {function(A): B} the function to apply
   * @return Option.<B>
   * @see flatMap
   * @see foreach
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
   * value if the $option is nonempty.  Otherwise, evaluates
   * expression `ifEmpty`.
   *
   * @note This is equivalent to `$option map f getOrElse ifEmpty`.
   *
   * @template B
   * @param f {function(A): B} the function to apply if nonempty.
   * @return {function(B|function(): B): B}
   */
  Option.prototype.fold = function (f) {
    // TODO: Better way to document this / better way for partial application?
    /**
     *  @param ifEmpty {B|function(): B} the expression to evaluate if empty.
     *  @return {B}
     */
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
   * @template B
   * @param  f {function(A): Option.<B>} the function to apply
   * @return {Option.<B>}
   * @see map
   * @see foreach
   */
  Option.prototype.flatMap = function (f) {
    if (this.isEmpty()) {
      return None()
    } else {
      return f(this.get())
    }
  };

  /*
   TODO: Not sure what this does
   Option.prototype.flatten = function () {
   if (this.isEmpty()) {
   return None()
   } else {
   return this.get()
   }
   };
   */

  /**
   * Returns this $option if it is nonempty '''and''' applying the predicate $p to
   * this $option's value returns true. Otherwise, return $none.
   *
   * @param  p {function(A): boolean} the predicate used for testing.
   * @return {Option.<A>}
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
   * @param  p {function(A): boolean} the predicate used for testing.
   * @return {Option.<A>}
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

  /**
   * Tests whether the option contains a given value as an element.
   *
   * @param elem {A} the element to test.
   * @return {boolean} `true` if the option has an element that is equal (as
   * determined by `===`) to `elem`, `false` otherwise.
   */
  Option.prototype.contains = function (elem) {
    // TODO: equals?
    return !this.isEmpty() && this.get() === elem
  };

  /**
   * Returns true if this option is nonempty '''and''' the predicate
   * $p returns true when applied to this $option's value.
   * Otherwise, returns false.
   *
   * @param  p {function(A): boolean}  the predicate to test
   * @return {boolean}
   */
  Option.prototype.exists = function (p) {
    return !this.isEmpty() && p(this.get())
  };

  /**
   * Returns true if this option is empty '''or''' the predicate
   * $p returns true when applied to this $option's value.
   *
   * @param  p {function(A): boolean}  the predicate to test
   * @return {boolean}
   */
  Option.prototype.forall = function (p) {
    return this.isEmpty() || p(this.get())
  };

  /**
   * Apply the given procedure $f to the option's value,
   * if it is nonempty. Otherwise, do nothing.
   *
   * @template U
   * @param  f {function(A): U} the procedure to apply.
   * @return {U|undefined}
   * @see map
   * @see flatMap
   */
  Option.prototype.foreach = function (f) {
    if (!this.isEmpty()) return f(this.get())
  };

  // TODO: collect

  /** Returns this $option if it is nonempty,
   *  otherwise return the result of evaluating `alternative`.
   *
   *  @param alternative {Option.<A>|function(): Option.<A>} the alternative expression.
   *  @return {Option.<A>}
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

  /**
   * Class `Some[A]` represents existing values of type
   *  `A`.
   *
   * @template A
   * @param value {A}
   * @return {Some.<A>}
   * @constructor
   * @extends {Option.<A>}
   */
  function Some(value) {
    if (!__isConstructor.call(this, Some)) {
      return new Some(value)
    } else {
      Some.__super__.constructor.call(this);
      this.value = value
    }
  }

  /**
   * @override
   * @inheritDoc
   */
  Some.prototype.get = function () {
    return this.value;
  };

  /**
   * @override
   * @inheritDoc
   */
  Some.prototype.isEmpty = function () {
    return false;
  };

  return Some;
})(Option);

None = (function (_super) {
  __extends(_super, None);

  /**
   * This case object represents non-existent values.
   *
   * @return {None}
   * @constructor
   * @extends {Option}
   */
  function None() {
    if (!__isConstructor.call(this, None)) {
      return new None()
    } else {
      None.__super__.constructor.call(this);
    }
  }

  /**
   * @override
   * @inheritDoc
   */
  None.prototype.get = function () {
    // TODO: Custom Exceptions
    throw new Error("None.get");
  };

  /**
   * @override
   * @inheritDoc
   */
  None.prototype.isEmpty = function () {
    return true;
  };

  return None;
})(Option);

exports.Option = Option;
exports.Some = Some;
exports.None = None;