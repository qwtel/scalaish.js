import {Random} from '../util/Random';
import {Try, Success, Failure} from '../util/Try';

function collectCoins() {
  if (eatenByMonster()) {
    throw new Error("GameOver");
  }
  return Random().nextInt(10);
}

function buyTreasure(coins) {
  if (coins < 3) {
    throw new Error("GameOver")
  }

  return "Win"
}

function eatenByMonster() {
  return Random().nextBoolean();
}

Try(collectCoins).map(buyTreasure)
  .orElse(Try("Lose"))
  .forEach(function (v) {
    console.log(v);
  });
