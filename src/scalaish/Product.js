import {_} from 'underscore';
import {Any} from './Any';
import {IndexOutOfBoundsException} from "./Exceptions";
import {TEquals} from './Equals';
import {Trait} from './helpers/Trait';
import {AbstractIteratorImpl} from './collection/Iterator';

/**
 * Base trait for all products, which in the standard library include at
 * least [[scala.Product1]] through [[scala.Product22]] and therefore also
 * their subclasses [[scala.Tuple1]] through [[scala.Tuple22]].  In addition,
 * all case classes implement `Product` with synthetically generated methods.
 */
var TProduct = Trait.extend(TEquals, Trait("Product", {

  /**
   * The n^th^ element of this product, 0-based.  In other words, for a
   * product `A(x,,1,,, ..., x,,k,,)`, returns `x,,(n+1),,` where `0 < n < k`.
   *
   * @param  {number} n   the index of the element to return
   * @throws       `IndexOutOfBoundsException`
   * @return  {*} the element `n` elements after the first element
   */
  productElement: function (n) {
    if (n < this.productArity()) {
      return this['_' + (n + 1)];
    } else {
      throw new IndexOutOfBoundsException(n);
    }
  },

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
    var self = this;
    var c = 0;
    var cmax = self.productArity();
    return _.extend(new AbstractIteratorImpl(), {
      hasNext: function () {
        return c < cmax;
      },
      next: function () {
        var result = self.productElement(c);
        c++;
        return result;
      }
    });
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

var TProduct1 = Trait.extend(TProduct, Trait("Product1", {
  productArity: 1,

  _1: Trait.required
}));

var TProduct2 = Trait.extend(TProduct, Trait("Product2", {
  Product2: true,

  productArity: 2,

  _1: Trait.required,
  _2: Trait.required
}));

function createProduct(n) {
  var obj = {
    productArity: n
  };

  for (var i = 1; i <= n; i++) {
    obj['_' + i] = Trait.required;
  }

  return Trait.extend(TProduct, Trait("Product" + n, obj));
}

var TProduct3 = createProduct(3);
var TProduct4 = createProduct(4);
var TProduct5 = createProduct(5);
var TProduct6 = createProduct(6);
var TProduct7 = createProduct(7);
var TProduct8 = createProduct(8);
var TProduct9 = createProduct(9);
var TProduct10 = createProduct(10);
var TProduct11 = createProduct(11);
var TProduct12 = createProduct(12);
var TProduct13 = createProduct(13);
var TProduct14 = createProduct(14);
var TProduct15 = createProduct(15);
var TProduct16 = createProduct(16);
var TProduct17 = createProduct(17);
var TProduct18 = createProduct(18);
var TProduct19 = createProduct(19);
var TProduct20 = createProduct(20);
var TProduct21 = createProduct(21);
var TProduct22 = createProduct(22);

export {
  TProduct,
  TProduct1,
  TProduct2,
  TProduct3,
  TProduct4,
  TProduct5,
  TProduct6,
  TProduct7,
  TProduct8,
  TProduct9,
  TProduct10,
  TProduct11,
  TProduct12,
  TProduct13,
  TProduct14,
  TProduct15,
  TProduct16,
  TProduct17,
  TProduct18,
  TProduct19,
  TProduct20,
  TProduct21,
  TProduct22
  };
