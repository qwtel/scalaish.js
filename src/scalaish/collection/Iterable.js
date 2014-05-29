import {Class} from '../helpers/Class';
import {Trait} from '../helpers/Trait';

import {TTraversable} from './Traversable';
import {TIterableLike} from './IterableLike';

import {AbstractTraversableImpl} from './Traversable';

var TIterable = Trait("Iterable").with(TTraversable).with(TIterableLike)({
  // TODO: do i need this?
  seq: function () {
    return this;
  }
});

function AbstractIterableImpl() {
}
Class("AbstractIterable", AbstractIterableImpl).extends(AbstractTraversableImpl).with(TIterable)();

export {TIterable, AbstractIterableImpl};
