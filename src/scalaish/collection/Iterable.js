import {_} from 'underscore';
import {Trait} from '../helpers/Trait';

import {TTraversable} from './Traversable';
import {TIterableLike} from './IterableLike';

import {AbstractTraversableImpl} from './Traversable';

var TIterable = Trait.extend(TTraversable, TIterableLike, Trait("Iterable", {
  // TODO: do i need this?
  seq: function () {
    return this;
  }
}));

function AbstractIterableImpl() {

}

AbstractIterableImpl.prototype = _.extend(Object.create(AbstractTraversableImpl.prototype), TIterable);

export {TIterable, AbstractIterableImpl};
