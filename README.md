# Scalaish.js

Provides a "scala-ish" experience for JavaScript.

The goal is to have some of Scala's niceties in JS, without going all-in on [Scala.js](http://www.scala-js.org/)

### Example

#### Option

    Option(localStorage.getItem("maybeThere"))
      .map(function(x) {
        return x + 1;
      })
      .orElse(Some(fallbackValue))
      .forEach(function (v) {
        console.log(v);
      });

#### Try

    Try(collectCoins)
      .map(buyTreasure)
      .orElse(Try("Lose"))
      .forEach(function (v) {
        console.log(v);
      });

### Status

Currently only the `Option` and `Try` types work (not reliable).

### Roadmap

It would be nice to have scala-ish collections, so one could use `List(1, 2, 3)` etc.
In order to achieve this one has to wrap his head around the Scala collections library and find a way to deal with its heavy use of traits.
