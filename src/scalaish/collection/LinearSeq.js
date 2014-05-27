import {Trait} from 'traits';

import {TSeq} from './Seq';
import {TLinearSeqLike} from './LinearSeqLike';

var TLinearSeq_ = Trait("LinearSeq", {
  seq: function () {
    return this;
  }
});

var TLinearSeq = Trait.override(TLinearSeq_, TLinearSeqLike, TSeq);

export {TLinearSeq};

