"use strict";
var Trait = require("traits").Trait;

var Traversable = require("./Traversable").Traversable;
var IterableLike = require("./IterableLike").IterableLike;

var Iterable = Trait.compose(Traversable, IterableLike, Trait({
  // TODO: do i need this?
  seq: function () {
    return this
  }
}));

exports.Iterable = Iterable;