import {Trait} from '../helpers/Trait';

import {TSeqLike} from './SeqLike';

var TLinearSeqLike = Trait("LinearSeqLike").with(TSeqLike)({
  seq: Trait.required,

  hashCode: function () {

  },

  iterator: function () {

  },

  corresponds: function () {

  }
});

export {TLinearSeqLike};
