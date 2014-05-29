import {Trait} from '../helpers/Trait';

import {TSeq} from './Seq';
import {TLinearSeqLike} from './LinearSeqLike';

var TLinearSeq = Trait("LinearSeq").with(TSeq).with(TLinearSeqLike)({
  seq: function () {
    return this;
  }
});

export {TLinearSeq};

