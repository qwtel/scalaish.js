import {Trait} from 'traits';

import {Traversable} from './Traversable';
import {IterableLike} from './IterableLike';

var Iterable = Trait.compose(Traversable, IterableLike, Trait({
  // TODO: do i need this?
  seq: function () {
    return this
  }
}));

export {Iterable};
