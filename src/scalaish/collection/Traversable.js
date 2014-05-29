import {Class} from '../helpers/Class';
import {Trait} from '../helpers/Trait';

import {TTraversableLike} from './TraversableLike';

var TTraversable = Trait("Traversable").with(TTraversableLike)({
  // TODO: do i need this?
  seq: function () {
    return this;
  }
});

function AbstractTraversableImpl() {
}
Class("AbstractTraversable", AbstractTraversableImpl).with(TTraversable)();

export {TTraversable, AbstractTraversableImpl};
