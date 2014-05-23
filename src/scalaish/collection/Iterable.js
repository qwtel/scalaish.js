import {Trait} from 'traits';

import {TTraversable} from './Traversable';
import {TIterableLike} from './IterableLike';

var TIterable_ = Trait("Iterable", {
  // TODO: do i need this?
  seq: function () {
    return this
  }
});

var TIterable = Trait.override(TIterable_, TIterableLike, TTraversable);

export {TIterable};
