import {Class} from '../helpers/Class';
import {Trait} from '../helpers/Trait';

import {TSeqLike} from './SeqLike';
import {TIterable} from './Iterable';

import {AbstractIterableImpl} from './Iterable';

var TSeq = Trait("Seq").with(TIterable).with(TSeqLike)({
  seq: function () {
    return this;
  }
});

function AbstractSeqImpl() {
}
Class("AbstractSeq", AbstractSeqImpl).extends(AbstractIterableImpl).with(TSeq)();

export {TSeq, AbstractSeqImpl};
