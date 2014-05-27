import {_} from 'underscore';
import {Trait} from 'traits';

import {TSeqLike} from './SeqLike';
import {TIterable} from './Iterable';

import {AbstractIterableImpl} from './Iterable';

var TSeq_ = Trait("Seq", {
  seq: function () {
    return this;
  }
});

var TSeq = Trait.override(TSeq_, TSeqLike, TIterable);

function AbstractSeqImpl() {
}

AbstractSeqImpl.prototype = _.extend(Object.create(AbstractIterableImpl.prototype), TSeq);

export {TSeq, AbstractSeqImpl};
