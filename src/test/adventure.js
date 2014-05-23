import {Random} from '../util/Random';
import {Try, Success, Failure} from '../util/Try';

function Adventure() {
}

Adventure.prototype.collectCoins = function () {
  return Try(function () {
    if (this.eatenByMonster()) {
      throw new Error("GameOver");
    }
    return Random().nextInt(10);
  }.bind(this));
};

Adventure.prototype.buyTreasure = function (coins) {
  return Try(function () {
    if (coins < 5) {
      throw new Error("GameOver")
    }

    return "Win"
  }.bind(this));
};

Adventure.prototype.eatenByMonster = function () {
  return Random().nextBoolean();
};

var adventure = new Adventure();

adventure.collectCoins()
  .flatMap(function (coins) {
    return adventure.buyTreasure(coins);
  })
  .orElse(Try("Lose"))
  .forEach(function (v) {
    console.log(v);
  });

