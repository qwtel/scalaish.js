var Try = require("../dist/cjs/scalaish/util/Try").Try;
var Success = require("../dist/cjs/scalaish/util/Try").Success;
var Failure = require("../dist/cjs/scalaish/util/Try").Failure;
var Random = require("../dist/cjs/scalaish/util/Random").Random;

function retry(noTimes) {
  return function (block) {
    var range = [];
    for (var i = 0; i < noTimes; i++) {
      range.push(i);
    }
    var failed = Failure(new Error('Failed after ' + noTimes + ' retries.'));

    var attempts = range.map(function () {
      return block;
    });

    attempts.reduce(function (a, block) {
      return a.recoverWith(block)
    }, failed);
  }
}

var i = new Random().nextInt(3) + 1;
retry(3)(function () {
  if (--i === 0) {
    var w = "Win123";
    console.log(w);
    return Success(w)
  }
  var e = "Fail";
  console.log(e);
  return Failure(e)
});