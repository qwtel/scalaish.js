import {_} from 'underscore';
import {Trait} from 'traits';

import {TTraversable} from './Traversable';
import {TIterableLike} from './IterableLike';

import {AbstractTraversableImpl} from './Traversable';

var TIterable_ = Trait("Iterable", {
  // TODO: do i need this?
  seq: function () {
    return this;
  }
});

var TIterable = Trait.override(TIterable_, TIterableLike, TTraversable);

function AbstractIterableImpl() {

}

AbstractIterableImpl.prototype = _.extend(Object.create(AbstractTraversableImpl.prototype), TIterable);

export {TIterable, AbstractIterableImpl};
