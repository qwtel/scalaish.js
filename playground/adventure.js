var Random = require("../dist/cjs/scalaish/util/Random").Random;
var Try = require("../dist/cjs/scalaish/util/Try").Try;
var Success = require("../dist/cjs/scalaish/util/Try").Success;
var Failure = require("../dist/cjs/scalaish/util/Try").Failure;

function collectCoins() {
  if (eatenByMonster()) {
    throw new Error("GameOver");
  }
  return new Random().nextInt(10);
}

function buyTreasure(coins) {
  if (coins < 3) {
    throw new Error("GameOver")
  }

  return "Win"
}

function eatenByMonster() {
  return new Random().nextBoolean();
}

Try(collectCoins).map(buyTreasure)
  .orElse(Try("Lose"))
  .forEach(function (v) {
    console.log(v);
  });