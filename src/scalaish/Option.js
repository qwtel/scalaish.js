import {_} from 'underscore';
import {__result} from "./helpers/helpers";
import {Any} from './Any';
import {NoSuchElementException} from './Exceptions';
import {Left, Right} from './util/Either';

/**
 * @param {B} x
 * @return {OptionImpl.<B>}
 * @constructor
 */
function OptionImpl(x) {
  if (x == null) {
    return None();
  }
  else {
    return Some(x);
  }
}

OptionImpl.prototype = _.extend(Object.create(Any.prototype), {
  Option: true,
  companion: Option,

  /**
   * Returns true if the option is $none, false otherwise.
   * @return {boolean}
   */
  isEmpty: null,

  /**
   * Returns true if the option is an instance of $some, false otherwise.
   * @return {boolean}
   */
  isDefined: function () {
    return !this.isEmpty
  },

  /**
   * Returns the option's value.
   * @note The option must be nonEmpty.
   * @throws {NoSuchElementException} if the option is empty.
   * @return {A}
   */
  // TODO: Rename to avoid JS Object conflict?
  get: null,

  /**
   * Returns the option's value if the option is nonempty, otherwise
   * return the result of evaluating `def`.
   *
   * @param def {A|function(): A} the default expression.
   * @return {A}
   */
  getOrElse: function (def, context) {
    if (this.isEmpty) {
      return __result(def, context);
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
   * @return OptionImpl.<B>
   * @see flatMap
   * @see forEach
   */
  map: function (f, context) {
    if (this.isEmpty) {
      return None()
    } else {
      return Some(f.call(context, this.get()))
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
    return function (f, context) {
      if (this.isEmpty) {
        return __result(ifEmpty)
      } else {
        return f.call(context, this.get())
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
   * @param  f {function(A): OptionImpl.<B>} the function to apply
   * @return {OptionImpl.<B>}
   * @see map
   * @see forEach
   */
  flatMap: function (f, context) {
    if (this.isEmpty) {
      return None()
    } else {
      return f.call(context, this.get())
    }
  },

  flatten: function () {
    if (this.isEmpty) {
      return None()
    } else {
      return this.get()
    }
  },

  /**
   * Returns this $option if it is nonempty '''and''' applying the predicate $p to
   * this $option's value returns true. Otherwise, return $none.
   *
   * @param  p {function(A): boolean} the predicate used for testing.
   * @return {OptionImpl.<A>}
   */
  filter: function (p, context) {
    if (this.isEmpty || p.call(context, this.get())) {
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
   * @return {OptionImpl.<A>}
   */
  filterNot: function (p, context) {
    if (this.isEmpty || !p.call(context, this.get())) {
      return this;
    } else {
      return None()
    }
  },

  nonEmpty: function () {
    return this.isDefined()
  },

  // TODO: This is the exact same code as in Try
  withFilter: function (p, context) {
    var self = this;

    // TODO: Use pseudo case class?
    function WithFilter(p, context) {
      this.p = p;
      this.context = context;
    }

    WithFilter.prototype = {
      map: function (f, context) {
        return self.filter(this.p, this.context).map(f, context)
      },
      flatMap: function (f, context) {
        return self.filter(this.p, this.context).flatMap(f, context)
      },
      foreach: function (f, context) {
        return self.filter(this.p, this.context).foreach(f, context)
      },
      withFilter: function (q, context) {
        return new WithFilter(function (x) {
          return self.p.call(self.context, x) && q.call(context, x)
        }, context)
      }
    };

    return new WithFilter(p, context)
  },

  /**
   * Tests whether the option contains a given value as an element.
   *
   * @param elem {A} the element to test.
   * @return {boolean} `true` if the option has an element that is equal (as
   * determined by `===`) to `elem`, `false` otherwise.
   */
  contains: function (elem) {
    // TODO: equals?
    return !this.isEmpty && this.get() === elem
  },

  /**
   * Returns true if this option is nonempty '''and''' the predicate
   * $p returns true when applied to this $option's value.
   * Otherwise, returns false.
   *
   * @param  p {function(A): boolean}  the predicate to test
   * @return {boolean}
   */
  exists: function (p, context) {
    return !this.isEmpty && p.call(context, this.get())
  },

  /**
   * Returns true if this option is empty '''or''' the predicate
   * $p returns true when applied to this $option's value.
   *
   * @param  p {function(A): boolean}  the predicate to test
   * @return {boolean}
   */
  forAll: function (p, context) {
    return this.isEmpty || p.call(context, this.get())
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
  forEach: function (f, context) {
    if (!this.isEmpty) return f.call(context, this.get())
  },

  // TODO: collect

  /**
   * Returns this $option if it is nonempty,
   * otherwise return the result of evaluating `alternative`.
   *
   * @param alternative {OptionImpl.<A>|function(): OptionImpl.<A>} the alternative expression.
   * @return {OptionImpl.<A>}
   */
  orElse: function (alternative) {
    if (this.isEmpty) {
      return __result(alternative)
    } else {
      return this
    }
  },

  // TODO: iterator

  // TODO: toList

  /**
   * Returns a [[scala.util.Left]] containing the given
   * argument `left` if this $option is empty, or
   * a [[scala.util.Right]] containing this $option's value if
   * this is nonempty.
   *
   * @template X
   * @param {X|function(): X} left - the expression to evaluate and return if this is empty
   * @return {EitherImpl}
   * @see toLeft
   */
  toRight: function(left, context) {
    return this.isEmpty ? Left(__result(left, context)) : Right(this.get())
  },

  /**
   * Returns a [[scala.util.Right]] containing the given
   * argument `right` if this is empty, or
   * a [[scala.util.Left]] containing this $option's value
   * if this $option is nonempty.
   *
   * @template X
   * @param {X|function(): X} right - the expression to evaluate and return if this is empty
   * @return {EitherImpl}
   * @see toRight
   */
  toLeft: function(right, context) {
    return this.isEmpty ? Right(__result(right, context)) : Left(this.get())
  }
});

/**
 * @param {B} x
 * @constructor
 * @extends {OptionImpl.<B>}
 */
function SomeImpl(x) {
  this.value = __result(x);
}

SomeImpl.prototype = _.extend(Object.create(OptionImpl.prototype), {
  Some: true,
  companion: Some,

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
  isEmpty: false
});

/**
 * @constructor
 * @extends {OptionImpl.<B>}
 */
function NoneImpl() {
}

NoneImpl.prototype = _.extend(Object.create(OptionImpl.prototype), {
  None: true,
  companion: None,

  /**
   * @override
   * @inheritDoc
   */
  get: function () {
    throw new NoSuchElementException("None.get");
  },

  /**
   * @override
   * @inheritDoc
   */
  isEmpty: true
});

function Option(x) {
  return Option.apply(x);
}
Option.apply = function (x) {
  return new OptionImpl(x)
};
Option.unapply = function (opt) {
  if (opt.isEmpty) {
    return None.unapply(opt);
  } else {
    return Some.unapply(opt)
  }
};

function Some(x) {
  return Some.apply(x);
}
Some.apply = function (x) {
  return new SomeImpl(x)
};
Some.unapply = function (opt) {
  return opt.get();
};

function None() {
  return None.apply()
}
None.apply = function (x) {
  return None.instance;
};
None.unapply = function (opt) {
  return null;
};

None.instance = new NoneImpl();

export {Option, Some, None};

