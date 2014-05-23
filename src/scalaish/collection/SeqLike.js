import {Trait} from 'traits';

import {TIterableLike} from './IterableLike';

var TSeqLike_ = Trait("SeqLike", {
  length: Trait.required,

  apply: Trait.required,

  lengthCompare: function (len) {
    if (len < 0) {
      return 1
    } else {
      var i = 0;
      var it = this.iterator();
      while (it.hasNext()) {
        if (i === len) {
          return (it.hasNext() ? 1 : 0)
        }
        it.next();
        i++;
      }
      return i - len;
    }
  },

  isEmpty: function () {
    return this.lengthCompare(0) === 0;
  },

  size: function () {
    return this.length();
  },

  /**
   * @param p {function(A): boolean}
   * @param frm {number}
   * @return {number}
   */
  segmentLength: function (p, frm) {
    var i = 0;
    var it = this.iterator().drop(frm);
    while(it.hasNext() && p(it.next())) {
      i++;
    }
    return i;
  },

  /**
   * @param p {function(A): boolean}
   * @param frm {number}
   * @return {number}
   */
  indexWhere: function (p, frm) {
    var i = 0;
    var it = this.iterator().drop(frm);
    while (it.hasNext()){
      if (p(it.next())) {
        return i;
      } else {
        i++;
      }
    }

    return -1;
  },

  lastIndexWhere: function(p, end) {
    // TODO
  },









});

var TSeqLike = Trait.override(TSeqLike_, TIterableLike);

export {TSeqLike};


