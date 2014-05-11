import {Trait} from 'traits';

import {TraversableLike} from 'TraversableLike';

var Traversable = Trait.compose(TraversableLike, Trait({
  // TODO: do i need this?
  seq: function () {
    return this
  }
}));

export {Traversable};
