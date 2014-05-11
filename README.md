# Scalaish.js

Provides a "scala-ish" experience for JavaScript.

The goal is to have some of Scala's niceties in JS, without going all-in with [Scala.js](http://www.scala-js.org/)

### Example

    var x = Option(localStorage.getItem("maybeThere")).map(function(x) {
        return x + 1;
    }).getOrElse(fallbackValue);

### Status

Currently only the `Option` Type works, so "Option.js" would be a better title. Anyway, it is almost a 1:1 translation of the Scala code and works fine on its own.

### Roadmap

It would be nice to have scala-ish collections, so one could use `List(1, 2, 3)` etc directly in JS. In order to achieve this one has to wrap his head around the Scala collections library and find a way to deal with it's heavy use of traits. 
