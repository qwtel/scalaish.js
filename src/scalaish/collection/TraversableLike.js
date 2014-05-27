import {Trait} from '../helpers/Trait';
import {Some, None} from '../Option';
import {TTraversableOnce} from './TraversableOnce';
import {NoSuchElementException, UnsupportedOperationException} from '../Exceptions';
import {T} from '../Tuple';

var TTraversableLike_ = Trait("TraversableLike", {

  newBuilder: Trait.required,

  forEach: Trait.required,

  // TODO: not yet sure what this is and how to implement w/o implicits
  bf: Trait.required,

  isEmpty: function () {
    var result = true;

    // TODO: Probably slow
    try {
      this.forEach(function () {
        result = false;
        throw new Error("break");
      });
    } catch (e) {
    }

    return result;
  },

  addAll: function (that) {
    var b = this.bf(this);

    b.addAll(this);
    b.addAll(that.seq());

    return b.result();
  },

  map: function (f) {
    var b = this.bf(this);
    b.sizeHint(this);

    this.forEach(function (x) {
      b.addOne(f(x));
    });

    return b.result();
  },

  flatMap: function (f) {
    var b = this.bf(this);

    this.forEach(function (x) {
      b.addAll(f(x).seq());
    });

    return b.result();
  },

  // TODO: private methods in traits?
  _filterImpl: function (p, isFlipped) {
    var b = this.newBuilder();

    this.forEach(function (x) {
      if (p(x) !== isFlipped) b.addOne(x);
    });

    return b.result();
  },

  filter: function (p) {
    return this._filterImpl(p, false);
  },

  filterNot: function (p) {
    return this._filterImpl(p, true);
  },

  // TODO: collect

  partition: function (p) {
    var l = this.newBuilder();
    var r = this.newBuilder();

    this.forEach(function (x) {
      (p(x) ? l : r).addOne(x);
    });

    return T(l.result(), r.result());
  },

  // TODO: groupBy

  forAll: function (p) {
    var result = true;

    // TODO: Probably slow
    try {
      this.forEach(function (x) {
        if (!p(x)) {
          result = false;
          throw new Error("break");
        }
      });
    } catch (e) {
    }

    return result;
  },

  every: this.forAll,

  exists: function (p) {
    var result = false;

    // TODO: Probably slow
    try {
      this.forEach(function (x) {
        if (p(x)) {
          result = true;
          throw new Error("break");
        }
      });
    } catch (e) {
    }

    return result;
  },

  find: function (p) {
    var result = None();

    // TODO: Probably slow
    try {
      this.forEach(function (x) {
        if (p(x)) {
          result = Some(x);
          throw new Error("break");
        }
      });
    } catch (e) {
    }

    return result;
  },

  // TODO: scan, scanLeft, scanRight

  head: function () {
    var result = function () {
      throw new NoSuchElementException();
    };

    try {
      this.forEach(function (x) {
        result = function () {
          return x;
        };
        throw new Error("break");
      });
    } catch (e) {
    }

    return result();
  },

  headOption: function () {
    if (this.isEmpty()) {
      return None();
    } else {
      return Some(this.head());
    }
  },

  tail: function () {
    if (this.isEmpty()) {
      // TODO: Exception types
      throw new UnsupportedOperationException();
    }
    return this.drop(1);
  },

  last: function () {
    var lst = this.head();

    this.forEach(function (x) {
      lst = x;
    });

    return lst
  },

  lastOption: function () {
    if (this.isEmpty()) {
      return None();
    } else {
      return Some(this.last());
    }
  },

  init: function () {
    if (this.isEmpty()) {
      // TODO: Exception types
      throw new UnsupportedOperationException();
    }

    var lst = this.head();
    var follow = false;
    var b = this.newBuilder();
    b.sizeHint(this, -1);

    this.forAll(function (x) {
      if (follow) b.addOne(lst);
      else follow = true;
      lst = x;
    });

    return b.result();
  },

  take: function (n) {
    return this.slice(0, n);
  },

  drop: function (n) {
    if (n <= 0) {
      var b = this.newBuilder();
      b.sizeHint(this);
      return (b.addAll(this)).result();
    } else {
      // TODO: no integer in js
      return this._sliceWithKnownDelta(n, 10000000, -n)
    }
  },

  slice: function (frm, until) {
    return this._sliceWithKnownBound(Math.max(frm, 0), until)
  },

  // TODO: private methods in traits?
  _sliceInternal: function (frm, until, b) {
    var i = 0;

    // TODO: Probably slow
    try {
      this.forEach(function (x) {
        if (i >= frm) b.addOne(x);
        i++;
        if (i >= until) throw new Error("break");
      });
    } catch (e) {
    }

    return b.result();
  },

  // TODO: private methods in traits?
  // Precondition: frm >= 0
  _sliceWithKnownDelta: function (frm, until, delta) {
    var b = this.newBuilder();
    if (until <= frm) return b.result();
    else {
      b.sizeHint(this, delta);
      return this._sliceInternal(frm, until, b);
    }
  },

  // TODO: private methods in traits?
  _sliceWithKnownBound: function (frm, until) {
    var b = this.newBuilder();
    if (until <= frm) return b.result();
    else {
      b.sizeHintBounded(until - frm, this);
      return this._sliceInternal(frm, until, b);
    }
  },

  takeWhile: function (p) {
    var b = this.newBuilder();

    // TODO: Probably slow
    try {
      this.forEach(function (x) {
        if (!p(x)) throw new Error("break");
        else b.addOne(x);
      });
    } catch (e) {
    }

    return b.result();
  },

  dropWhile: function (p) {
    var b = this.newBuilder();
    var go = false;

    this.forEach(function (x) {
      if (!go && !p(x)) go = true;
      if (go) b.addOne(x);
    });

    return b.result();
  },

  span: function (p) {
    var l = this.newBuilder();
    var r = this.newBuilder();
    var toLeft = true;

    this.forEach(function (x) {
      toLeft = toLeft && p(x);
      (toLeft ? l : r).addOne(x);
    });

    return T(l.result(), r.result());
  },

  splitAt: function (n) {
    var l = this.newBuilder();
    var r = this.newBuilder();

    l.sizeHintBounded(n, this);
    if (n >= 0) r.sizeHint(this, -n);
    var i = 0;

    this.forEach(function (x) {
      (i < n ? l : r).addOne(x);
      i++;
    });

    return T(l.result(), r.result());
  }

  // TODO: tails, inits

  // TODO: copyToArray

  // TODO: various toX methods

  // TODO: view

  // TODO: withFilter

  // TODO: _iterateUntilEmpty
});

var TTraversableLike = Trait.override(TTraversableLike_, TTraversableOnce);

export {TTraversableLike};
