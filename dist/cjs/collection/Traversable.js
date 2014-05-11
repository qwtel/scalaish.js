"use strict";
var Trait = require("traits").Trait;

var TraversableLike = require("TraversableLike").TraversableLike;

var Traversable = Trait.compose(TraversableLike, Trait({
  // TODO: do i need this?
  seq: function () {
    return this
  }
}));

exports.Traversable = Traversable;