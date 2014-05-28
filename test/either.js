//import {Trait} from '../helpers/Trait';
var Option = require("../dist/cjs/scalaish/Option").Option;
var Some = require("../dist/cjs/scalaish/Option").Some;
var None = require("../dist/cjs/scalaish/Option").None;
var Try = require("../dist/cjs/scalaish/util/Try").Try;
var Success = require("../dist/cjs/scalaish/util/Try").Success;
var Failure = require("../dist/cjs/scalaish/util/Try").Failure;
var T = require("../dist/cjs/scalaish/Tuple").T;
var Tuple1 = require("../dist/cjs/scalaish/Tuple").Tuple1;
var Tuple2 = require("../dist/cjs/scalaish/Tuple").Tuple2;
var Tuple3 = require("../dist/cjs/scalaish/Tuple").Tuple3;
var Tuple4 = require("../dist/cjs/scalaish/Tuple").Tuple4;
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
var l = Left(1).swap().right().get();
println(l);

var tuple = T(1, 'a', 3, 4);
match(tuple)
  .case(Tuple1)
  .case(Tuple2)
  .case(Tuple3)
  .case(Tuple4, function(a, b, c, d) {
    println(a, b, c, d);
  });
