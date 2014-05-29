import {__result} from "../helpers/helpers";
import {Any} from '../Any';
import {Class} from '../helpers/Class';
import {Trait} from '../helpers/Trait';
import {NoSuchElementException} from '../Exceptions';
import {Some, None} from '../Option';
import {caseClassify} from '../helpers/caseClassify';

function pipe(x) {
  return x;
}

function noOp() {
}

function throwNoSuchElementEx(m) {
  throw new NoSuchElementException(m);
}

/**
 * @template A
 * @template B
 * @constructor
 */
function EitherImpl() {
}

Class("Either", EitherImpl)({

  // patching merge in here
  merge: function () {
    return this.match()
      .case(Left, pipe)
      .case(Right, pipe)
      .get()
  },

  /**
   * Projects this `Either` as a `Left`.
   */
  left: function () {
    return Either.LeftProjection(this);
  },

  /**
   * Projects this `Either` as a `Right`.
   */
  right: function () {
    return Either.RightProjection(this);
  },

  /**
   * Applies `fa` if this is a `Left` or `fb` if this is a `Right`.
   *
   * TODO: JS example
   * @example {{{
   * val result: Either[Exception, Value] = possiblyFailingOperation()
   * log(result.fold(
   *   ex => "Operation failed with " + ex,
   *   v => "Operation produced value: " + v
   * ))
   * }}}
   *
   * @param {function(A): X} fa - the function to apply if this is a `Left`
   * @param {function(B): X} fb - the function to apply if this is a `Right`
   * @return {X} - the results of applying the function
   */
  fold: function (fa, fb, context) {
    return this.match()
      .case(Left, fa.bind(context))
      .case(Right, fb.bind(context))
      .get()
  },

  /**
   * If this is a `Left`, then return the left value in `Right` or vice versa.
   *
   * TODO: JS example
   * @example {{{
   * val l: Either[String, Int] = Left("left")
   * val r: Either[Int, String] = l.swap // Result: Right("left")
   * }}}
   *
   * @return {EitherImpl.<A, B>}
   */
  swap: function () {
    return this.match()
      .case(Left, function (a) {
        return Right(a);
      })
      .case(Right, function (b) {
        return Left(b);
      })
      .get();
  },

  /**
   * Joins an `Either` through `Right`.
   *
   * This method requires that the right side of this Either is itself an
   * Either type. That is, this must be some type like: {{{
   * Either[A, Either[A, C]]
   * }}} (which respects the type parameter bounds, shown below.)
   *
   * If this instance is a Right[Either[A, C]] then the contained Either[A, C]
   * will be returned, otherwise this value will be returned unmodified.
   *
   * TODO: JS example
   * @example {{{
   * Right[String, Either[String, Int]](Right(12)).joinRight // Result: Right(12)
   * Right[String, Either[String, Int]](Left("flower")).joinRight // Result: Left("flower")
   * Left[String, Either[String, Int]]("flower").joinRight // Result: Left("flower")
   * }}}
   *
   * This method, and `joinLeft`, are analogous to `Option#flatten`
   */
  joinRight: function () {
    return this.match()
      .case(Left, function (a) {
        return Left(a);
      })
      .case(Right, pipe)
      .get()
  },

  /**
   * Joins an `Either` through `Left`.
   *
   * This method requires that the left side of this Either is itself an
   * Either type. That is, this must be some type like: {{{
   * Either[Either[C, B], B]
   * }}} (which respects the type parameter bounds, shown below.)
   *
   * If this instance is a Left[Either[C, B]] then the contained Either[C, B]
   * will be returned, otherwise this value will be returned unmodified.
   *
   * {{{
   * Left[Either[Int, String], String](Right("flower")).joinLeft // Result: Right("flower")
   * Left[Either[Int, String], String](Left(12)).joinLeft // Result: Left(12)
   * Right[Either[Int, String], String]("daisy").joinLeft // Result: Right("daisy")
   * }}}
   *
   * This method, and `joinRight`, are analogous to `Option#flatten`
   */
  joinLeft: function () {
    return this.match()
      .case(Left, pipe)
      .case(Right, function (b) {
        return Right(b);
      })
      .get();
  },

  isLeft: Trait.required,
  isRight: Trait.required
});

/**
 * The left side of the disjoint union, as opposed to the [[scala.util.Right]] side.
 *
 * @param {A} a
 * @constructor
 * @extends {EitherImpl}
 */
function LeftImpl(a) {
  this.a = a;
}

Class("Left", LeftImpl).extends(EitherImpl)({
  isLeft: function () {
    return true
  },
  isRight: function () {
    return false
  }
});

/**
 * The right side of the disjoint union, as opposed to the [[scala.util.Left]] side.
 *
 * @param {B} b
 * @constructor
 * @extends {EitherImpl}
 */
function RightImpl(b) {
  this.b = b;
}

Class("Right", RightImpl).extends(EitherImpl)({
  isLeft: function () {
    return false
  },
  isRight: function () {
    return true
  }
});

var Either = caseClassify("Either", EitherImpl);

function LeftProjectionImpl(e) {
  this.e = e;
}

Class("Either.LeftProjection", LeftProjectionImpl)({

  get: function () {
    return this.e.match()
      .case(Left, pipe)
      .case(Right, throwNoSuchElementEx.bind(undefined, 'Either.left.value on Right'))
      .get()
  },

  forEach: function (f, context) {
    this.e.match()
      .case(Left, f, context)
      .case(Right, noOp)
  },

  getOrElse: function (or, context) {
    return this.e.match()
      .case(Left, pipe)
      .case(Right, function () {
        return __result(or, context)
      })
      .get()
  },

  forAll: function (f, context) {
    return this.e.match()
      .case(Left, f, context)
      .case(Right, pipe.bind(undefined, true))
      .get()
  },

  exists: function (f, context) {
    return this.e.match()
      .case(Left, f, context)
      .case(Right, pipe.bind(undefined, false))
      .get()
  },

  flatMap: function (f, context) {
    return this.e.match()
      .case(Left, f, context)
      .case(Right, function (b) {
        return Right(b);
      })
      .get()
  },

  map: function (f, context) {
    return this.e.match()
      .case(Left, function (a) {
        return Left(f.call(context, a));
      })
      .case(Right, function (b) {
        return Right(b);
      })
      .get()
  },

  filter: function (p, context) {
    return this.e.match()
      .case(Left, function (a) {
        return p.call(context, a) ? Some(Left(a)) : None();
      })
      .case(Right, function () {
        return None();
      })
      .get()
  },

  toSeq: function () {
    // TODO
  },

  toOption: function () {
    return this.e.match()
      .case(Left, function (a) {
        return Some(a);
      })
      .case(Right, function () {
        return None();
      })
      .get()
  }
});

Either.LeftProjection = caseClassify("Either.LeftProjection", LeftProjectionImpl);

function RightProjectionImpl(e) {
  this.e = e;
}

Class("Either.RightProjection", RightProjectionImpl)({

  get: function () {
    return this.e.match()
      .case(Left, throwNoSuchElementEx.bind(undefined, 'Either.right.value on Left'))
      .case(Right, pipe)
      .get()
  },

  forEach: function (f, context) {
    this.e.match()
      .case(Left, noOp)
      .case(Right, f, context)
  },

  getOrElse: function (or, context) {
    return this.e.match()
      .case(Left, function () {
        return __result(or, context)
      })
      .case(Right, pipe)
      .get()
  },

  forAll: function (f, context) {
    return this.e.match()
      .case(Left, pipe.bind(undefined, true))
      .case(Right, f, context)
      .get()
  },

  exists: function (f, context) {
    return this.e.match()
      .case(Left, pipe.bind(undefined, false))
      .case(Right, f, context)
      .get()
  },

  flatMap: function (f, context) {
    return this.e.match()
      .case(Left, function (a) {
        return Left(a);
      })
      .case(Right, f, context)
      .get()
  },

  map: function (f, context) {
    return this.e.match()
      .case(Left, function (a) {
        return Left(a);
      })
      .case(Right, function (b) {
        return Right(f.call(context, b))
      })
      .get()
  },

  filter: function (p, context) {
    return this.e.match()
      .case(Left, function () {
        return None();
      })
      .case(Right, function (b) {
        return p.call(context, b) ? Some(Right(b)) : None()
      })
      .get()
  },

  toSeq: function () {
    // TODO
  },

  toOption: function () {
    return this.e.match()
      .case(Left, function () {
        return None()
      })
      .case(Right, function (b) {
        return Some(b)
      })
      .get()
  }
});

Either.RightProjection = caseClassify("Either.RightProjection", RightProjectionImpl);

/**
 * If the condition is satisfied, return the given `B` in `Right`,
 * otherwise, return the given `A` in `Left`.

 * @param {function(): boolean} test
 * @param {function(): B} right
 * @param {function(): A} left
 * @param {object=} context
 * @return {EitherImpl}
 */
Either.cond = function (test, right, left, context) {
  return __result(test, context) ? Right(right) : Left(left);
};

var Left = caseClassify("Left", LeftImpl);
var Right = caseClassify("Right", RightImpl);

export {Either, Left, Right, EitherImpl, LeftImpl, RightImpl};


