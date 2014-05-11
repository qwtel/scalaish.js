"use strict";
var Trait = require("traits").Trait;

var Growable = Trait({

  addOne: Trait.required,

  // TODO
  addMore: function(elem1, elem2, elems) {
    return this.addOne(elem1).addOne(elem2).addAll(Array.prototype.slice.call(arguments, 2))
  },

  addAll: function(xs) {
    // TODO: loop for LinearSeq
    // https://github.com/scala/scala/blob/2.12.x/src/library/scala/collection/generic/Growable.scala

    xs.forEach(this.addOne);

    return this;
  },

  clear: function(elem) {
    Trait.unimplemented(this, "clear");
  }
});

exports.Growable = Growable;