import {Trait} from '../../helpers/Trait';
import {Class} from '../../helpers/Class';
import {TGrowable} from '../generic/Growable';
import {TSeqLike} from '../SeqLike';

var TBufferLike = Trait("BufferLike")
  .with(TGrowable)
  //.with(TShrinkable)
  //.with(TScriptable)
  //.with(TSubtractable)
  .with(TSeqLike)
({
  // Find names for all the scala ++===---::: methods >.<
  // +=:
  prepend: Trait.required,

  insertAll: Trait.required,

  remove: Trait.required,

  removeMany: function (n, count) {
    for (var i = 0; i < count; i++) { // TODO: use range
      this.remove(n);
    }
  },

  // TODO

  trimStart: function(n) {
    this.removeMany(0, n);
  },

  trimEnd: function () {
    this.removeMany(Math.max(this.length() - n, 0), n);
  },

  clone: function () {
    var bf = this.newBuilder();
    bf.addAll(this);
    return bf.result();
  }
});

export {TBufferLike};
