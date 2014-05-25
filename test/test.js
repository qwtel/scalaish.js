//import {Trait} from '../helpers/Trait';
var Option = require("../dist/cjs/scalaish/Option").Option;
var Some = require("../dist/cjs/scalaish/Option").Some;
var None = require("../dist/cjs/scalaish/Option").None;
var Try = require("../dist/cjs/scalaish/util/Try").Try;
var Success = require("../dist/cjs/scalaish/util/Try").Success;
var Failure = require("../dist/cjs/scalaish/util/Try").Failure;
var T = require("../dist/cjs/scalaish/Tuple").T;

var helpers = require('../dist/cjs/scalaish/helpers/helpers');
var match = helpers.match;
var println = helpers.println;
var time = helpers.time;
var printTime = helpers.printTime;

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
println(o.get() === 1);
println(o.withFilter(function (x) {
  return x >= 1
}).map(function (x) {
  return x + 1
}).get() === 2);

printTime(function () {
  var x;
  for (var i = 0; i < 100000; i++) {
    x = Option(i)
  }
});

printTime(function () {
  var x;
  for (var i = 0; i < 100000; i++) {
    x = [null, null, null, null]
  }
});

printTime(function () {
  var x;
  for (var i = 0; i < 100000; i++) {
    x = T(null, null, null, null)
  }
});

/*
 println(o.isInstanceOf("Some"));
 println(o.isInstanceOf("Option"));
 println(o.isInstanceOf("Any"));
 println(!o.isInstanceOf("Other"));
 println(!o.isInstanceOf("None"));
 */

var t = Try(1);
//println(t instanceof Success);
//println(t instanceof Try);
//println(!(t instanceof Failure));
var tt = t.withFilter(function (x) {
  return x >= 1
}).map(function (x) {
  return x + 1;
}).get();
println(tt === 2);

//None().get();

/*
 function testRandom(r) {
 println(r.nextInt());
 var i = 0;
 var t = r.nextInt();

 while(t !== 31) {
 t = r.nextInt();
 if (++i > 1000) {
 console.error("Unlikely..")
 break;
 }
 }
 println(r.nextNumber());
 println(r.nextGaussian());
 println(r.nextBoolean());
 println(r.nextString(3));
 println(r.nextPrintableChar());
 }

 var r = new Random();
 testRandom(r);

 r = new new Random();
 testRandom(r);
 */

/*
 var fooBar = Trait.create(Object.prototype, TFooBar);
 println(fooBar.isInstanceOf("Bar"));
 println(fooBar.isInstanceOf("Foo"));
 println(fooBar.isInstanceOf("Any"));
 println(!fooBar.isInstanceOf("Other"));
 println(fooBar.hasOwnProperty("foo"));
 println(fooBar.hasOwnProperty("bar"));

 fooBar = Object.create(Object.prototype, TFooBar);
 println(fooBar.isInstanceOf("Bar"));
 println(fooBar.isInstanceOf("Foo"));
 println(fooBar.isInstanceOf("Any"));
 println(!fooBar.isInstanceOf("Other"));
 println(fooBar.hasOwnProperty("foo"));
 println(fooBar.hasOwnProperty("bar"));
 */

var caseObj = Option('some value');

var res = match(caseObj)
  .case(None, function () {
    return 'no value'
  })
  .case(Some, function (x) {
    return x + ', yay'
  })
  .get();

println(res);

printTime(function() {
  var res2;
  for (var i = 0; i<100000; i++) {
    res2 = match("test")
      .case("something")
      .case("somethingElse")
      .case("somethingElseElse")
      .case('test', function(s) {
        return s;
      })
      .get();
  }
});

printTime(function() {
  var res2;
  for (var i = 0; i<100000; i++) {
    switch("test") {
      case "something": break;
      case "somethingElse": break;
      case "somethingElseElse": break;
      case "test": res2 = "test"; break;
    }
  }
});

//println(res2);
