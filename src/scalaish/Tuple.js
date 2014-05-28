import {_} from 'underscore';
import {Any} from './Any';
import {TProduct1, TProduct2, TProduct3, TProduct4} from './Product';
import {caseClassify} from './helpers/caseClassify';

var TTuple1 = _.extend({}, TProduct1, {
  Tuple1: true
});

var TTuple2 = _.extend({}, TProduct2, {
  Tuple2: true
});

var TTuple3 = _.extend({}, TProduct3, {
  Tuple3: true
});

var TTuple4 = _.extend({}, TProduct4, {
  Tuple4: true
});

function Tuple1Impl(_1) {
  this._1 = _1;
}

Tuple1Impl.prototype = _.extend(Object.create(Any.prototype), TTuple1);


function Tuple2Impl(_1, _2) {
  this._1 = _1;
  this._2 = _2;
}

Tuple2Impl.prototype = _.extend(Object.create(Any.prototype), TTuple2);


function Tuple3Impl(_1, _2, _3) {
  this._1 = _1;
  this._2 = _2;
  this._3 = _3;
}

Tuple3Impl.prototype = _.extend(Object.create(Any.prototype), TTuple3);


function Tuple4Impl(_1, _2, _3, _4) {
  this._1 = _1;
  this._2 = _2;
  this._3 = _3;
  this._4 = _4;
}

Tuple4Impl.prototype = _.extend(Object.create(Any.prototype), TTuple4);

// TODO: More tuples

// TODO: Use 'arguments' and apply (js) when possible
function Tuple1() {
  return Tuple1.create.apply(undefined, arguments);
}
caseClassify("Tuple1", Tuple1, Tuple1Impl);

function Tuple2() {
  return Tuple2.create.apply(undefined, arguments);
}
caseClassify("Tuple2", Tuple2, Tuple2Impl);

function Tuple3() {
  return Tuple3.create.apply(undefined, arguments);
}
caseClassify("Tuple3", Tuple3, Tuple3Impl);

function Tuple4() {
  return Tuple4.create.apply(undefined, arguments);
}
caseClassify("Tuple4", Tuple4, Tuple4Impl);

/**
 * Convenience "factory" function for Tuples
 *
 * @return {Tuple1Impl|Tuple2Impl|Tuple3Impl|Tuple4Impl}
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
    default:
      throw new Error('Implementation missing for tuple with arity ' + arguments.length);
  }
}

export {T, Tuple1, Tuple2, Tuple3, Tuple4, TTuple1, TTuple2, TTuple3, TTuple4};
