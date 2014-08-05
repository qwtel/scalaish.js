import {Trait} from '../../helpers/Trait';

var TShrinkable = Trait("Shrinkable")({

  // -=
  shrink: Trait.required,

  // TODO
  growMore: function(elem1, elem2, elems) {
    return this.addOne(elem1).addOne(elem2).addAll(Array.prototype.slice.call(arguments, 2))
  },

  growAll: function(xs) {
    // TODO: loop for LinearSeq
    // https://github.com/scala/scala/blob/2.12.x/src/library/scala/collection/generic/Growable.scala

    xs.forEach(this.addOne);

    return this;
  },

  clear: Trait.required
});

export {TShrinkable};
