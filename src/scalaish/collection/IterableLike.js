import {Trait} from 'traits';

import {TTraversableLike} from './TraversableLike';

var TIterableLike_ = Trait("IterableLike", {
  iterator: Trait.required,

  forEach: function (f) {
    return this.iterator().forEach(f);
  },

  forAll: function (p) {
    return this.iterator().forAll(p);
  },

  exists: function (p) {
    return this.iterator().exists(p);
  },

  find: function (p) {
    return this.iterator().find(p);
  },

  isEmpty: function () {
    return !this.iterator().hasNext();
  },

  foldRight: function (z) {
    return function(op) {
      return this.iterator.foldRight(z)(op);
    }.bind(this)
  },

  reduceRight: function (op) {
    return this.iterator.reduceRight(op);
  },

  toIterable: function () {
    return this;
  },

  head: function() {
    return this.iterator.next();
  },

  // TODO
});

var TIterableLike = Trait.override(TIterableLike_, TTraversableLike);

export {TIterableLike};
