import {Random} from '../util/Random';
import {Try, Success, Failure} from '../util/Try';

function Adventure() {
}

Adventure.prototype.collectCoins = function () {
  if (this.eatenByMonster()) {
    throw new Error("GameOver");
  }
  return Random().nextInt(10);
};

Adventure.prototype.buyTreasure = function (coins) {
  if (coins < 5) {
    throw new Error("GameOver")
  }

  return "Win"
};

Adventure.prototype.eatenByMonster = function () {
  return Random().nextBoolean();
};

var adventure = new Adventure();

Try(function() { return adventure.collectCoins() })
  .map(function (coins) {
    return adventure.buyTreasure(coins);
  })
  .orElse(Try("Lose"))
  .forEach(function (v) {
    console.log(v);
  });

