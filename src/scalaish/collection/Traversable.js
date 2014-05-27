import {_} from 'underscore';
import {Any} from '../Any';
import {Trait} from '../helpers/Trait';

import {TTraversableLike} from './TraversableLike';

var TTraversable = Trait.compose(TTraversableLike, Trait("Traversable", {
  // TODO: do i need this?
  seq: function () {
    return this;
  }
}));

function AbstractTraversableImpl() {
}
AbstractTraversableImpl.prototype = _.extend(Object.create(Any.prototype), TTraversable);

export {TTraversable, AbstractTraversableImpl};
