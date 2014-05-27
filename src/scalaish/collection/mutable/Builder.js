import {Trait} from '../../helpers/Trait';

import {TGrowable} from '../generic/Growable';

var TBuilder_ = Trait("Builder", {

  addOne: Trait.required,

  clear: Trait.required,

  result: Trait.required,

  // TODO: Find a way to deal with lack of overloading
  sizeHint: function(size, n) {
    if (typeof size === 'number') {

    }
    // TODO
    /*
     else if (size.instanceOf(IndexedSeqLike)) {
     if (typeof n != 'undefined') {
     this.sizeHint(size.size(), n);
     } else {
     this.sizeHint(size.size());
     }
     }
     */
  },

  sizeHintBounded: function(size, boundingColl) {
    // TODO
    /*
     if (boundingColl.instanceOf(IndexedSeqLike)) {
     this.sizeHint(Math.min(size, boundingColl.size()))
     }
     */
  }

  // TODO: mapResult
});

var TBuilder = Trait.compose(TBuilder_, TGrowable);

export {TBuilder};
