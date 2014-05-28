//import {Trait} from '../helpers/Trait';
var Option = require("../dist/cjs/scalaish/Option").Option;
var Some = require("../dist/cjs/scalaish/Option").Some;
var None = require("../dist/cjs/scalaish/Option").None;
var Try = require("../dist/cjs/scalaish/util/Try").Try;
var Success = require("../dist/cjs/scalaish/util/Try").Success;
var Failure = require("../dist/cjs/scalaish/util/Try").Failure;
var T = require("../dist/cjs/scalaish/Tuple").T;
var either = require('../dist/cjs/scalaish/util/Either');

var Either = either.Either;
var Left = either.Left;
var Right = either.Right;

var Random = require('../dist/cjs/scalaish/util/Random').Random;

var helpers = require('../dist/cjs/scalaish/helpers/helpers');
var __result = helpers.__result;
var println = helpers.println;
var time = helpers.time;
var printTime = helpers.printTime;

var match = require('../dist/cjs/scalaish/helpers/match').match;

var NUM = 100000;

//println(Right(1));
println(Right(1).swap());
println(Right(1).swap().left().map(function (x) {
  return x + 1
}));

/*
println("Create " + NUM + " JSObject instances:",
  time(function () {
    var x;
    for (var i = 0; i < NUM; i++) {
      x = {};
    }
  })
);

println("Map " + NUM + " Either instances:",
  time(function () {
    var x;
    for (var i = 0; i < NUM; i++) {
      x = Right(1).right().map(function (x) {
        return x + 1
      })
    }
  })
);
*/

//import {Random} from '../util/Random';
//import {T} from '../Product';


//println(T(1, 2)._1);

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
 println(fooBar.isInstanceOf("Bar"));
 println(fooBar.isInstanceOf("Foo"));
 println(fooBar.isInstanceOf("Any"));
 println(!fooBar.isInstanceOf("Other"));
 println(fooBar.hasOwnProperty("foo"));
 println(fooBar.hasOwnProperty("bar"));
 println(fooBar.value === 3);
 println(fooBar.isInstanceOf("FooBar"));
 println(fooBar instanceof FooBar);
 */

var o = Option(1);
//println(o instanceof Some);
//println(o instanceof Option);
//println(!(o instanceof None));
println(o.get() === 1);
println(o.withFilter(function (x) {
  return x >= 1
}).map(function (x) {
  return x + 1
}).get() === 2);


/*
println("Map " + NUM + " Option instances:",
  time(function () {
    var x;
    for (var i = 0; i < NUM; i++) {
      x = Option(i).map(function (x) {
        return x + 1;
      }).get()
    }
  })
);

println("Create " + NUM + " JSArray instances:",
  time(function () {
    var x;
    for (var i = 0; i < NUM; i++) {
      x = [null, null, null, null]
    }
  })
);


println("Create " + NUM + " Tuple instances:",
  time(function () {
    var x;
    for (var i = 0; i < NUM; i++) {
      x = T(null, null, null, null)
    }
  })
);
*/

/*
 println(o.isInstanceOf("Some"));
 println(o.isInstanceOf("Option"));
 println(o.isInstanceOf("Any"));
 println(!o.isInstanceOf("Other"));
 println(!o.isInstanceOf("None"));
 */

var rnd = new Random();

var t = Try(maybeThrowAnEx).transform(function(v) {
  return Success(v + ' was a Success');
}, function(e) {
  return Success('Something went wrong ' + e)
}).forEach(println);

//println(t instanceof Success);
//println(t instanceof Try);
//println(!(t instanceof Failure));
var tt = Try(1).withFilter(function (x) {
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

println("Do " + NUM + " pattern matches:",
  time(function () {
    var res2;
    for (var i = 0; i < NUM; i++) {
      res2 = match("test")
        .case("something")
        .case("somethingElse")
        .case("somethingElseElse")
        .case('test', function (s) {
          return s;
        })
        .get();
    }
  })
);

println("Do " + NUM + " native switch-case:",
  time(function () {
    var res2;
    for (var i = 0; i < NUM; i++) {
      switch ("test") {
        case "something":
          break;
        case "somethingElse":
          break;
        case "somethingElseElse":
          break;
        case "test":
          res2 = "test";
          break;
      }
    }
  })
);

var throwableToLeft = function (block) {
  try {
    return Right(__result(block))
  }
  catch (ex) {
    return Left(ex)
  }
};

function maybeThrowAnEx() {
  if (rnd.nextBoolean()) {
    throw new Error()
  } else {
    return 'result'
  }
}

println(throwableToLeft(maybeThrowAnEx).merge());

println(
  Either.cond(new Random().nextBoolean(), 'B', 'A')
    .right().flatMap(function (b) {
      return Right('I knew it would be ' + b)
    })
    .left().map(function (a) {
      return 'I knew it would be ' + a + '???'
    })
);

//println(res2);
