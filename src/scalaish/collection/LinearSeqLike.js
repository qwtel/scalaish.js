import {Trait} from 'traits';

import {TSeqLike} from './SeqLike';

var TLinearSeqLike_ = Trait("LinearSeqLike", {
  seq: Trait.required,

  hashCode: function () {

  },

  iterator: function () {

  },

  corresponds: function () {

  }
});

var TLinearSeqLike = Trait.override(TLinearSeqLike_, TSeqLike);

export {TLinearSeqLike};
