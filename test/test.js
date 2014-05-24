//import {Trait} from '../helpers/Trait';
var Option = require("../dist/cjs/scalaish/Option").Option;
var Some = require("../dist/cjs/scalaish/Option").Some;
var None = require("../dist/cjs/scalaish/Option").None;
var Try = require("../dist/cjs/scalaish/util/Try").Try;
var Success = require("../dist/cjs/scalaish/util/Try").Success;
var Failure = require("../dist/cjs/scalaish/util/Try").Failure;
var T = require("../dist/cjs/scalaish/Product").T;
//import {Random} from '../util/Random';
//import {T} from '../Product';


//console.log(T(1, 2)._1);

/*
 var TFoo = Trait("Foo", {
 foo: function () {
 }
 });
 var TBar = Trait("Bar", {
 bar: function () {
 }
 });
 var TFooBar = Trait.compose(TFoo, TBar);

 function FooBar(x) {
 return Object.create(FooBar.prototype, Trait.compose(TFooBar, Trait("FooBar", {value: x})))
 }

 var fooBar = FooBar(3);
 */
/*
 console.log(fooBar.isInstanceOf("Bar"));
 console.log(fooBar.isInstanceOf("Foo"));
 console.log(fooBar.isInstanceOf("Any"));
 console.log(!fooBar.isInstanceOf("Other"));
 console.log(fooBar.hasOwnProperty("foo"));
 console.log(fooBar.hasOwnProperty("bar"));
 console.log(fooBar.value === 3);
 console.log(fooBar.isInstanceOf("FooBar"));
 console.log(fooBar instanceof FooBar);
 */

var o = Option(1);
//console.log(o instanceof Some);
//console.log(o instanceof Option);
//console.log(!(o instanceof None));
console.log(o.get() === 1);
console.log(o.withFilter(function (x) {
  return x >= 1
}).map(function (x) {
  return x + 1
}).get() === 2);

var start = new Date().getTime();
for (var i = 0; i < 100000; i++) {
  Option(i)
}
var now = new Date().getTime();
console.log(now - start);

var start = new Date().getTime();
for (i = 0; i < 100000; i++) {
  x = [null, null, null]
}
var now = new Date().getTime();
console.log(now - start);

var start = new Date().getTime();
var x;
for (var i = 0; i < 100000; i++) {
  x = T(null, null, null)
}
var now = new Date().getTime();
console.log(now - start);

/*
 console.log(o.isInstanceOf("Some"));
 console.log(o.isInstanceOf("Option"));
 console.log(o.isInstanceOf("Any"));
 console.log(!o.isInstanceOf("Other"));
 console.log(!o.isInstanceOf("None"));
 */

var t = Try(1);
//console.log(t instanceof Success);
//console.log(t instanceof Try);
//console.log(!(t instanceof Failure));
var tt = t.withFilter(function (x) {
  return x >= 1
}).map(function (x) {
  return x + 1;
}).get();
console.log(tt === 2);

//None().get();

/*
 function testRandom(r) {
 console.log(r.nextInt());
 var i = 0;
 var t = r.nextInt();

 while(t !== 31) {
 t = r.nextInt();
 if (++i > 1000) {
 console.error("Unlikely..")
 break;
 }
 }
 console.log(r.nextNumber());
 console.log(r.nextGaussian());
 console.log(r.nextBoolean());
 console.log(r.nextString(3));
 console.log(r.nextPrintableChar());
 }

 var r = Random();
 testRandom(r);

 r = new Random();
 testRandom(r);
 */

/*
 var fooBar = Trait.create(Object.prototype, TFooBar);
 console.log(fooBar.isInstanceOf("Bar"));
 console.log(fooBar.isInstanceOf("Foo"));
 console.log(fooBar.isInstanceOf("Any"));
 console.log(!fooBar.isInstanceOf("Other"));
 console.log(fooBar.hasOwnProperty("foo"));
 console.log(fooBar.hasOwnProperty("bar"));

 fooBar = Object.create(Object.prototype, TFooBar);
 console.log(fooBar.isInstanceOf("Bar"));
 console.log(fooBar.isInstanceOf("Foo"));
 console.log(fooBar.isInstanceOf("Any"));
 console.log(!fooBar.isInstanceOf("Other"));
 console.log(fooBar.hasOwnProperty("foo"));
 console.log(fooBar.hasOwnProperty("bar"));
 */