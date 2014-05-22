import {__result} from "./helpers/helpers";
import {Trait} from "./helpers/Trait";

var TOption = Trait("Option", {

  /**
   * Returns true if the option is $none, false otherwise.
   * @return {boolean}
   */
  isEmpty: Trait.required,

  /**
   * Returns true if the option is an instance of $some, false otherwise.
   * @return {boolean}
   */
  isDefined: function () {
    return !this.isEmpty()
  },

  /**
   * Returns the option's value.
   * @note The option must be nonEmpty.
   * @throws Predef.NoSuchElementException if the option is empty.
   * @return {A}
   */
  get: Trait.required,

  /**
   * Returns the option's value if the option is nonempty, otherwise
   * return the result of evaluating `def`.
   *
   * @param def {A|function(): A} the default expression.
   * @return {A}
   */
  getOrElse: function (def) {
    if (this.isEmpty()) {
      return __result(def);
    } else {
      return this.get()
    }
  },

  /**
   * Returns the option's value if it is nonempty,
   * or `null` if it is empty.
   * Although the use of null is discouraged, code written to use
   * $option must often interface with code that expects and returns nulls.
   * @return {A|null}
   */
  orNull: function () {
    return this.getOrElse(null)
  },

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
   * @see forEach
   */
  map: function (f) {
    if (this.isEmpty()) {
      return None()
    } else {
      return Some(f(this.get()))
    }
  },

  /**
   * Returns the result of applying $f to this $option's
   * value if the $option is nonempty.  Otherwise, evaluates
   * expression `ifEmpty`.
   *
   * @note This is equivalent to `$option map f getOrElse ifEmpty`.
   *
   * @template B
   * @param ifEmpty {B|function(): B} the expression to evaluate if empty.
   * @return {function(B|function(): B): B}
   */
  fold: function (ifEmpty) {
    // TODO: Better way to document this / better way for partial application?
    /**
     *  @return {B}
     *  @param f {function(A): B} the function to apply if nonempty.
     */
    return function (f) {
      if (this.isEmpty()) {
        return __result(ifEmpty)
      } else {
        return f(this.get())
      }
    }.bind(this)
  },

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
   * @see forEach
   */
  flatMap: function (f) {
    if (this.isEmpty()) {
      return None()
    } else {
      return f(this.get())
    }
  },

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
  filter: function (p) {
    if (this.isEmpty() || p(this.get())) {
      return this;
    } else {
      return None()
    }
  },

  /**
   * Returns this $option if it is nonempty '''and''' applying the predicate $p to
   * this $option's value returns false. Otherwise, return $none.
   *
   * @param  p {function(A): boolean} the predicate used for testing.
   * @return {Option.<A>}
   */
  filterNot: function (p) {
    if (this.isEmpty() || !p(this.get())) {
      return this;
    } else {
      return None()
    }
  },

  // HACK
  nonEmpty: function () {
    return this.isDefined()
  },

  // TODO: withFilter

  /**
   * Tests whether the option contains a given value as an element.
   *
   * @param elem {A} the element to test.
   * @return {boolean} `true` if the option has an element that is equal (as
   * determined by `===`) to `elem`, `false` otherwise.
   */
  contains: function (elem) {
    // TODO: equals?
    return !this.isEmpty() && this.get() === elem
  },

  /**
   * Returns true if this option is nonempty '''and''' the predicate
   * $p returns true when applied to this $option's value.
   * Otherwise, returns false.
   *
   * @param  p {function(A): boolean}  the predicate to test
   * @return {boolean}
   */
  exists: function (p) {
    return !this.isEmpty() && p(this.get())
  },

  /**
   * Returns true if this option is empty '''or''' the predicate
   * $p returns true when applied to this $option's value.
   *
   * @param  p {function(A): boolean}  the predicate to test
   * @return {boolean}
   */
  forAll: function (p) {
    return this.isEmpty() || p(this.get())
  },

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
  forEach: function (f) {
    if (!this.isEmpty()) return f(this.get())
  },

  // TODO: collect

  /** Returns this $option if it is nonempty,
   *  otherwise return the result of evaluating `alternative`.
   *
   *  @param alternative {Option.<A>|function(): Option.<A>} the alternative expression.
   *  @return {Option.<A>}
   */
  orElse: function (alternative) {
    if (this.isEmpty()) {
      return __result(alternative)
    } else {
      return this
    }
  }

  // TODO: iterator

  // TODO: toList

  // TODO: toRight

  // TODO: toLeft

});

var TSome = Trait.compose(
  Trait("Some", {
    /**
     * @override
     * @inheritDoc
     */
    get: function () {
      return this.value;
    },

    /**
     * @override
     * @inheritDoc
     */
    isEmpty: function () {
      return false;
    }
  }),
  TOption
);

var TNone = Trait.compose(
  Trait("None", {
    /**
     * @override
     * @inheritDoc
     */
    get: function () {
      // TODO: Exception types
      throw new Error("None.get");
    },

    /**
     * @override
     * @inheritDoc
     */
    isEmpty: function () {
      return true;
    }
  }),
  TOption
);

function Some(x) {
  // TODO: Less hacky constructor?
  return Object.create(Some.prototype, Trait.compose(TSome, Trait({value: x})))
}

function None() {
  // TODO: Less hacky constructor?
  return Object.create(None.prototype, TNone);
}

function Option(x) {
  if (x == null) {
    return None();
  }
  else {
    return Some(x);
  }
}
export {Option, Some, None};

