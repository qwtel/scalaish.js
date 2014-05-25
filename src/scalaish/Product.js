import {_} from 'underscore';
import {Any} from './Any';
import {IndexOutOfBoundsException} from "./Exceptions";

/**
 * Base trait for all products, which in the standard library include at
 * least [[scala.Product1]] through [[scala.Product22]] and therefore also
 * their subclasses [[scala.Tuple1]] through [[scala.Tuple22]].  In addition,
 * all case classes implement `Product` with synthetically generated methods.
 */
var TProduct = {
  Product: true,

  /**
   * The n^th^ element of this product, 0-based.  In other words, for a
   * product `A(x,,1,,, ..., x,,k,,)`, returns `x,,(n+1),,` where `0 < n < k`.
   *
   * @param  {number} n   the index of the element to return
   * @throws       `IndexOutOfBoundsException`
   * @return  {*} the element `n` elements after the first element
   */
  productElement: null,

  /**
   * The size of this product.
   * @return  {number} for a product `A(x,,1,,, ..., x,,k,,)`, returns `k`
   */
  productArity: null,

  /**
   * An iterator over all the elements of this product.
   * @return     in the default implementation, an `Iterator[Any]`
   */
  productIterator: function () {
    // TODO
  },

  /**
   * A string used in the `toString` methods of derived classes.
   * Implementations may override this method to prepend a string prefix
   * to the result of `toString` methods.
   *
   * @type {string} in the default implementation, the empty string
   */
  productPrefix: ''
};

var TProduct1 = _.extend({}, TProduct, {
  Product1: true,

  productArity: 1,

  productElement: function (n) {
    switch (n) {
      case 0:
        return this._1;
      default:
        throw new IndexOutOfBoundsException(n);
    }
  },

  _1: null
});

var TProduct2 = _.extend({}, TProduct, {
  Product2: true,

  productArity: 2,

  productElement: function (n) {
    switch (n) {
      case 0:
        return this._1;
      case 1:
        return this._2;
      default:
        throw new IndexOutOfBoundsException(n);
    }
  },

  _1: null,
  _2: null
});

var TProduct3 = _.extend({}, TProduct, {
  Product3: true,

  productArity: 3,

  productElement: function (n) {
    switch (n) {
      case 0:
        return this._1;
      case 1:
        return this._2;
      case 2:
        return this._3;
      default:
        throw new IndexOutOfBoundsException(n);
    }
  },

  _1: null,
  _2: null,
  _3: null
});

var TProduct4 = _.extend({}, TProduct, {
  Product4: true,

  productArity: 4,

  productElement: function (n) {
    switch (n) {
      case 0:
        return this._1;
      case 1:
        return this._2;
      case 2:
        return this._3;
      case 3:
        return this._4;
      default:
        throw new IndexOutOfBoundsException(n);
    }
  },

  _1: null,
  _2: null,
  _3: null,
  _4: null
});

var TTuple1 = _.extend({}, TProduct1, {
  Tuple1: true,

  toString: function () {
    return "(" + this._1 + ")";
  }

  // TODO case class methods

});

var TTuple2 = _.extend({}, TProduct2, {
  Tuple2: true,

  toString: function () {
    return "(" + this._1 + "," + this._2 + ")";
  },

  swap: function () {
    return new Tuple2(this._2, this._1)
  }

  // TODO case class methods

});

var TTuple3 = _.extend({}, TProduct3, {
  Tuple3: true,

  toString: function () {
    return "(" + this._1 + "," + this._2 + "," + this._3 + ")";
  }

  // TODO case class methods

});

var TTuple4 = _.extend({}, TProduct4, {
  Tuple4: true,

  toString: function () {
    return "(" + this._1 + "," + this._2 + "," + this._3 + "," + this._4 + ")";
  }

  // TODO case class methods

});

function Tuple1(_1) {
  this._1 = _1;
}
Tuple1.prototype = _.extend(Object.create(Any.prototype), TTuple1);

function Tuple2(_1, _2) {
  this._1 = _1;
  this._2 = _2;
}
Tuple2.prototype = _.extend(Object.create(Any.prototype), TTuple2);

function Tuple3(_1, _2, _3) {
  this._1 = _1;
  this._2 = _2;
  this._3 = _3;
}
Tuple3.prototype = _.extend(Object.create(Any.prototype), TTuple3);

function Tuple4(_1, _2, _3, _4) {
  this._1 = _1;
  this._2 = _2;
  this._3 = _3;
  this._4 = _4;
}
Tuple4.prototype = _.extend(Object.create(Any.prototype), TTuple4);

// TODO: More tuples

/**
 * Convenience "factory" function for Tuples
 *
 * @return {Tuple1|Tuple2|Tuple3|Tuple4}
 */
function T() {
  switch (arguments.length) {
    case 1:
      return new Tuple1(arguments[0]);
    case 2:
      return new Tuple2(arguments[0], arguments[1]);
    case 3:
      return new Tuple3(arguments[0], arguments[1], arguments[2]);
    case 4:
      return new Tuple4(arguments[0], arguments[1], arguments[2], arguments[3]);
    default:
      throw new Error('Implementation missing for tuple with arity ' + arguments.length)
  }
}

export {T};