import {_} from 'underscore';
import {Any} from './Any';
import {
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
  } from './Product';

import {caseClassify} from './helpers/caseClassify';


function Tuple1Impl(_1) {
  this._1 = _1;
}
Tuple1Impl.prototype = _.extend(Object.create(Any.prototype), TProduct1);


function Tuple2Impl(_1, _2) {
  this._1 = _1;
  this._2 = _2;
}
Tuple2Impl.prototype = _.extend(Object.create(Any.prototype), TProduct2);


function Tuple3Impl(_1, _2, _3) {
  this._1 = _1;
  this._2 = _2;
  this._3 = _3;
}
Tuple3Impl.prototype = _.extend(Object.create(Any.prototype), TProduct3);


function Tuple4Impl(_1, _2, _3, _4) {
  this._1 = _1;
  this._2 = _2;
  this._3 = _3;
  this._4 = _4;
}
Tuple4Impl.prototype = _.extend(Object.create(Any.prototype), TProduct4);


function Tuple5Impl(_1, _2, _3, _4, _5) {
  this._1 = _1;
  this._2 = _2;
  this._3 = _3;
  this._4 = _4;
  this._5 = _5;
}
Tuple5Impl.prototype = _.extend(Object.create(Any.prototype), TProduct5);


function Tuple6Impl(_1, _2, _3, _4, _5, _6) {
  this._1 = _1;
  this._2 = _2;
  this._3 = _3;
  this._4 = _4;
  this._5 = _5;
  this._6 = _6;
}
Tuple6Impl.prototype = _.extend(Object.create(Any.prototype), TProduct6);

function Tuple7Impl(_1, _2, _3, _4, _5, _6, _7) {
  this._1 = _1;
  this._2 = _2;
  this._3 = _3;
  this._4 = _4;
  this._5 = _5;
  this._6 = _6;
  this._7 = _7;
}
Tuple7Impl.prototype = _.extend(Object.create(Any.prototype), TProduct7);


function Tuple8Impl(_1, _2, _3, _4, _5, _6, _7, _8) {
  this._1 = _1;
  this._2 = _2;
  this._3 = _3;
  this._4 = _4;
  this._5 = _5;
  this._6 = _6;
  this._7 = _7;
  this._8 = _8;
}
Tuple8Impl.prototype = _.extend(Object.create(Any.prototype), TProduct8);


function Tuple9Impl(_1, _2, _3, _4, _5, _6, _7, _8, _9) {
  this._1 = _1;
  this._2 = _2;
  this._3 = _3;
  this._4 = _4;
  this._5 = _5;
  this._6 = _6;
  this._7 = _7;
  this._8 = _8;
  this._9 = _9;
}
Tuple9Impl.prototype = _.extend(Object.create(Any.prototype), TProduct9);


function Tuple10Impl(_1, _2, _3, _4, _5, _6, _7, _8, _9, _10) {
  this._1 = _1;
  this._2 = _2;
  this._3 = _3;
  this._4 = _4;
  this._5 = _5;
  this._6 = _6;
  this._7 = _7;
  this._8 = _8;
  this._9 = _9;
  this._10 = _10;
}
Tuple10Impl.prototype = _.extend(Object.create(Any.prototype), TProduct10);

// TODO: More tuples

var Tuple1 = caseClassify("Tuple1", Tuple1Impl);
var Tuple2 = caseClassify("Tuple2", Tuple2Impl);
var Tuple3 = caseClassify("Tuple3", Tuple3Impl);
var Tuple4 = caseClassify("Tuple4", Tuple4Impl);
var Tuple5 = caseClassify("Tuple5", Tuple5Impl);
var Tuple6 = caseClassify("Tuple6", Tuple6Impl);
var Tuple7 = caseClassify("Tuple7", Tuple7Impl);
var Tuple8 = caseClassify("Tuple8", Tuple8Impl);
var Tuple9 = caseClassify("Tuple9", Tuple9Impl);
var Tuple10 = caseClassify("Tuple10", Tuple10Impl);

/**
 * Convenience "factory" function for Tuples
 */
function T() {
  switch (arguments.length) {
    case 1:
      return Tuple1.apply(undefined, arguments);
    case 2:
      return Tuple2.apply(undefined, arguments);
    case 3:
      return Tuple3.apply(undefined, arguments);
    case 4:
      return Tuple4.apply(undefined, arguments);
    case 5:
      return Tuple5.apply(undefined, arguments);
    case 6:
      return Tuple6.apply(undefined, arguments);
    case 7:
      return Tuple7.apply(undefined, arguments);
    case 8:
      return Tuple8.apply(undefined, arguments);
    case 9:
      return Tuple9.apply(undefined, arguments);
    case 10:
      return Tuple10.apply(undefined, arguments);
    default:
      throw new Error('Implementation missing for tuple with arity ' + arguments.length);
  }
}

export {
  Tuple1Impl,
  Tuple2Impl,
  Tuple3Impl,
  Tuple4Impl,
  Tuple5Impl,
  Tuple6Impl,
  Tuple7Impl,
  Tuple8Impl,
  Tuple9Impl,
  Tuple10Impl,
  Tuple1,
  Tuple2,
  Tuple3,
  Tuple4,
  Tuple5,
  Tuple6,
  Tuple7,
  Tuple8,
  Tuple9,
  Tuple10,
  T};
