import {_} from 'underscore';
import {Class} from '../helpers/Class';
import {Trait} from '../helpers/Trait';
import {TTraversableOnce} from './TraversableOnce';
//import {T} from '../Tuple';
import {__equals} from '../helpers/helpers';

var TBufferedIterator = {

};

// TODO: well..
var IntMaxValue = 320000;

var TIterator = Trait("Iterator").with(TTraversableOnce)({
  seq: function () {
    return this;
  },

  hasNext: Trait.required,
  next: Trait.required,

  isEmpty: function () {
    return !this.hasNext();
  },

  isTraversableAgain: false,

  hasDefiniteSize: function () {
    return this.isEmpty();
  },

  take: function (n) {
    return this.slice(0, n);
  },

  drop: function (n) {
    return this.slice(n, IntMaxValue)
  },

  slice: function (frm, until) {
    var lo = Math.max(frm, 0);
    var toDrop = lo;
    while (toDrop > 0 && this.hasNext()) {
      this.next();
      toDrop--;
    }

    var self = this;
    var remaining = until - lo;
    return _.extend(new AbstractIteratorImpl(), {
      hasNext: function () {
        return remaining > 0 && self.hasNext();
      },
      next: function () {
        if (remaining > 0) {
          remaining--;
          return self.next();
        } else {
          Iterator.empty().next();
        }
      }
    });
  },

  map: function (f, context) {
    var self = this;
    return _.extend(new AbstractIteratorImpl(), {
      hasNext: function () {
        return self.hasNext();
      },
      next: function () {
        return f.call(context, self.next());
      }
    });
  },

  // ++
  concat: function (that) {
    return new Iterator.JoinIterator(this, that);
  },

  flatMap: function (f, context) {
    var self = this;
    var cur = Iterator.empty();
    return _.extend(new AbstractIteratorImpl(), {
      hasNext: function () {
        return cur.hasNext() || self.hasNext() && (function () {
          cur = f.call(context, self.next()).toIterator();
          return this.hasNext();
        }.bind(this))()
      },
      next: function () {
        if (this.hasNext()) {
          return cur
        } else {
          Iterator.empty().next();
        }
      }
    })
  },

  filter: function (p, context) {
    var self = this;
    var hd = undefined;
    var hdDefined = false;
    return _.extend(new AbstractIteratorImpl(), {
      hasNext: function () {
        return hdDefined || (function () {
          do {
            if (!self.hasNext()) return false;
            hd = self.next();
          } while (!p.call(context, hd));
          hdDefined = true;
          return true;
        }.bind(this))();
      },

      next: function () {
        if (this.hasNext()) {
          hdDefined = false;
          return hd;
        } else {
          Iterator.empty().next();
        }
      }
    });
  },

  corresponds: function (that) {
    return function (p, context) {
      var that0 = that.toIterator();
      while (this.hasNext && that0.hasNext()) {
        if (!p.call(context, this.next(), that0.next())) return false;
      }
      return this.hasNext() === that0.hasNext();
    }
  },

  withFilter: function (p, context) {
    // TODO: better way to make this "bridge"?
    return this.filter(p, context);
  },

  filterNot: function (p, context) {
    return this.filter(function (x) {
      return !p(x);
    }, context);
  },

  // TODO: collect

  // TODO: scanLeft

  // TODO: scanRight

  takeWhile: function (p, context) {
    var self = this;
    var hd = undefined;
    var hdDefined = false;
    var tail = self;

    return _.extend(new AbstractIteratorImpl(), {
      hasNext: function () {
        return hdDefined || tail.hasNext() || (function () {
          hd = tail.next();
          if (p.call(context, hd)) hdDefined = true;
          else tail = Iterator.empty();
          return hdDefined;
        }.bind(this))();
      },
      next: function () {
        if (this.hasNext()) {
          hdDefined = false;
          return hd;
        } else {
          Iterator.empty().next();
        }
      }
    });
  },

  /*
   // TODO: partition
   partition: function (p, context) {
   var self = this.buffered();
   function PartitionIterator(p, context) {
   this.p = p;
   this.context = context;
   }
   PartitionIterator.prototype = _.extend(Object.create(Any.prototype), {
   other: undefined,
   //lookAhead: new Queue
   });
   }
   */

  // TODO: span

  dropWhile: function (p, context) {
    var self = this.buffered();
    var skip = function () {
      if (!this.dropped) {
        while (self.hasNext() && p.call(context, self.head())) self.next();
        this.dropped = true;
      }
    };
    return _.extend(new AbstractIteratorImpl(), {
      dropped: false,
      hasNext: function () {
        skip.call(this);
        return self.hasNext();
      },
      next: function () {
        skip.call(this);
        return self.next();
      }
    });
  },

  zip: function (that) {
    var self = this;
    return _.extend(new AbstractIteratorImpl(), {
      hasNext: function () {
        return self.hasNext() && that.hasNext()
      },
      next: function () {
        //return T(self.next(), that.next());
        return [self.next(), that.next()];
      }
    });
  },

  padTo: function (len, elem) {
    var self = this;
    var count = 0;
    return _.extend(new AbstractIteratorImpl(), {
      hasNext: function () {
        return self.hasNext() || count < len;
      },
      next: function () {
        count++;
        if (self.hasNext()) return self.next();
        else if (count <= len) return elem;
        else Iterator.empty.next();
      }
    });
  },

  zipWithIndex: function () {
    var self = this;
    var idx = 0;
    return _.extend(new AbstractIteratorImpl(), {
      hasNext: function () {
        return self.hasNext();
      },
      next: function () {
        //var ret = T(self.next(), idx);
        var ret = [self.next(), idx];
        idx++;
        return ret;
      }
    });
  },

  zipAll: function (that, thisElem, thatElem) {
    var self = this;
    return _.extend(new AbstractIteratorImpl(), {
      hasNext: function () {
        return self.hasNext() || that.hasNext();
      },
      next: function () {
        if (self.hasNext()) {
          //if (that.hasNext()) return T(self.next(), that.next());
          if (that.hasNext()) return [self.next(), that.next()];
          else return T(self.next(), thatElem);
        } else {
          //if (that.hasNext()) return T(thisElem, that.next());
          if (that.hasNext()) return [thisElem, that.next()];
          else Iterator.empty.next();
        }
      }
    });
  },

  forEach: function (f, context) {
    while (this.hasNext()) {
      f.call(context, this.next());
    }
  },

  forAll: function (p, context) {
    var res = true;
    while (res && this.hasNext()) res = p.call(context, this.next());
    return res;
  },

  exists: function (p, context) {
    var res = false;
    while (!res && this.hasNext()) res = p.call(context, this.next());
    return res;
  },

  contains: function (elem) {
    return this.exists(function (x) {
      return __equals(x, elem);
    })
  },

  find: function (p, context) {
    var res = None();
    while (res.isEmpty && this.hasNext()) {
      var e = this.next();
      if (p.call(context, e)) res = Some(e);
    }
    return res;
  },

  indexWhere: function (p, context) {
    var i = 0;
    var found = false;
    while (!found && this.hasNext()) {
      if (p.call(context, this.next())) {
        found = true;
      } else {
        i++;
      }
    }
    return found ? i : -1;
  },

  indexOf: function (elem) {
    var i = 0;
    var found = false;
    while (!found && this.hasNext()) {
      if (__equals(this.next(), elem)) {
        found = true;
      } else {
        i++;
      }
    }
    return found ? i : -1;
  },

  buffered: function () {
    var self = this;
    var hd = undefined;
    var hdDefined = false;
    return _.extend(new AbstractIteratorImpl(), TBufferedIterator, {
      head: function () {
        if (!hdDefined) {
          hd = this.next();
          hdDefined = true;
        }
        return hd;
      },

      hasNext: function () {
        return hdDefined || self.hasNext();
      },

      next: function () {
        if (hdDefined) {
          hdDefined = false
          return hd;
        } else {
          return self.next()
        }
      }
    });
  },

  // TODO: grouped

  // TODO: sliding

  length: function () {
    return this.size();
  },

  // TODO: duplicate

  // TODO: patch

  // TODO: copyToArray

  sameElements: function (that) {
    while (this.hasNext() && that.hasNext())
      if (!__equals(this.next(), that.next()))
        return false;

    return !this.hasNext() && !that.hasNext();
  },

  // TODO: toTraversable

  toIterator: function () {
    return this;
  },

  // TODO: toStream

  toString: function () {
    return (this.hasNext() ? "non-empty" : "empty") + " iterator";
  }
});

function Iterator() {
}

function AbstractIteratorImpl() {
}
Class("AbstractIterator", AbstractIteratorImpl).with(TIterator);

export {TIterator, AbstractIteratorImpl};
