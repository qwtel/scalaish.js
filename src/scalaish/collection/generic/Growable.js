import {Trait} from '../../helpers/Trait';

var TClearable = Trait("Clearable")({
  clear: Trait.required
});

var TGrowable = Trait("Growable").with(TClearable)({

  addAndReturn: Trait.required,

  // TODO
  addManyAndReturn: function(elem1, elem2, elems) {
    return this.addAndReturn(elem1).addAndReturn(elem2).addAllAndReturn(Array.prototype.slice.call(arguments, 2))
  },

  addAllAndReturn: function(xs) {
    // TODO: loop for LinearSeq
    // https://github.com/scala/scala/blob/2.12.x/src/library/scala/collection/generic/Growable.scala

    xs.forEach(this.add);

    return this;
  },

  clear: Trait.required
});

export {TGrowable};
