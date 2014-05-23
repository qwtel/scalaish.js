import {Trait} from "./helpers/Trait";
import {TEquals} from "./Equals";

/**
 * Base trait for all products, which in the standard library include at
 * least [[scala.Product1]] through [[scala.Product22]] and therefore also
 * their subclasses [[scala.Tuple1]] through [[scala.Tuple22]].  In addition,
 * all case classes implement `Product` with synthetically generated methods.
 */
var TProduct = Trait.compose(TEquals, Trait("Product", {

  /**
   * The n^th^ element of this product, 0-based.  In other words, for a
   * product `A(x,,1,,, ..., x,,k,,)`, returns `x,,(n+1),,` where `0 < n < k`.
   *
   * @param  {number} n   the index of the element to return
   * @throws       `IndexOutOfBoundsException`
   * @return  {*} the element `n` elements after the first element
   */
  productElement: Trait.required,

  /**
   * The size of this product.
   * @return  {number} for a product `A(x,,1,,, ..., x,,k,,)`, returns `k`
   */
  productArity: Trait.required,

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
}));

var TProduct1 = Trait.compose(TProduct, Trait("Product1", {
  productArity: 1,

  productElement: function (n) {
    switch (n) {
      case 0:
        return this._1;
      default:
        throw new Error('IndexOutOfBoundsException');
    }
  },

  _1: Trait.required
}));

var TProduct2 = Trait.compose(TProduct, Trait("Product2", {
  productArity: 2,

  productElement: function (n) {
    switch (n) {
      case 0:
        return this._1;
      case 1:
        return this._2;
      default:
        throw new Error('IndexOutOfBoundsException');
    }
  },

  _1: Trait.required,
  _2: Trait.required
}));

var TProduct3 = Trait.compose(TProduct, Trait("Product3", {
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
        throw new Error('IndexOutOfBoundsException');
    }
  },

  _1: Trait.required,
  _2: Trait.required,
  _3: Trait.required
}));

var TTuple1 = Trait.compose(TProduct1, Trait("Tuple1", {
  toString: function () {
    return "(" + this._1 + ")";
  }

  // TODO case class methods

}));

var TTuple2 = Trait.compose(TProduct2, Trait("Tuple2", {
  toString: function () {
    return "(" + this._1 + "," + this._2 + ")";
  },

  swap: function () {
    return Tuple2(this._2, this._1)
  }

  // TODO case class methods

}));

var TTuple3 = Trait.compose(TProduct3, Trait("Tuple3", {
  toString: function () {
    return "(" + this._1 + "," + this._2 + "," + this._3 + ")";
  }

  // TODO case class methods

}));

function Tuple1(_1) {
  return Object.create(Tuple1.prototype, Trait.compose(TTuple1, Trait({_1: _1})))
}

function Tuple2(_1, _2) {
  return Object.create(Tuple2.prototype, Trait.compose(TTuple2, Trait({_1: _1, _2: _2})))
}

function Tuple3(_1, _2, _3) {
  return Object.create(Tuple3.prototype, Trait.compose(TTuple3, Trait({_1: _1, _2: _2, _3: _3})))
}

function T() {
  var a = Array.prototype.slice.call(arguments, 0);
  switch (a.length) {
    case 1:
      return Tuple1(a[0]);
    case 2:
      return Tuple2(a[0], a[1]);
    case 3:
      return Tuple3(a[0], a[1], a[2]);
    default:
      throw new Error('Implementation missing')
  }
}

export {T};