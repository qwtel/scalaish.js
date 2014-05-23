import {Trait} from '../helpers/Trait';

import {TTraversableLike} from 'TraversableLike';

var TTraversable = Trait.compose(TTraversableLike, Trait("Traversable", {
  // TODO: do i need this?
  seq: function () {
    return this
  }
}));

export {TTraversable};
