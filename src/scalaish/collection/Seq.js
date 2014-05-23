import {Trait} from 'traits';

import {TSeqLike} from './SeqLike';
import {TIterable} from './Iterable';

var TSeq_ = Trait("Seq", {
  seq: function () {
    return this
  }
});

var TSeq = Trait.override(TSeq_, TSeqLike, TIterable);

export {TSeq};
