import {Trait} from '../helpers/Trait';
import {Some, None} from '../Option';
import {TTraversableOnce} from './TraversableOnce';
import {NoSuchElementException, UnsupportedOperationException} from '../Exceptions';
import {T} from '../Tuple';

var TTraversableLike = Trait("TraversableLike").with(TTraversableOnce)({

  newBuilder: Trait.required,

  forEach: Trait.required,

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

  hasDefiniteSize: true,

  // ++
  addAll: function (that) {
    // TODO: Ignore CanBuildFrom for now
    var b = this.newBuilder();

    b.addAll(this);
    b.addAll(that.seq());

    return b.result();
  },

  // TODO: ++:

  map: function (f) {
    // TODO: Ignore CanBuildFrom for now
    var b = this.newBuilder();
    b.sizeHint(this);

    this.forEach(function (x) {
      b.addOne(f(x));
    });

    return b.result();
  },

  flatMap: function (f) {
    // TODO: Ignore CanBuildFrom for now
    var b = this.newBuilder(this);

    this.forEach(function (x) {
      b.addAll(f(x).seq());
    });

    return b.result();
  },

  filter: function (p, context) {
    // TODO: Performance characteristics of call with `this` vs. method
    return filterImpl.call(this, p, context, false);
  },

  filterNot: function (p, context) {
    // TODO: Performance characteristics of call with `this` vs. method
    return filterImpl.call(this, p, context, true);
  },

  // TODO: collect

  partition: function (p, context) {
    var l = this.newBuilder();
    var r = this.newBuilder();

    this.forEach(function (x) {
      (p.call(context, x) ? l : r).addOne(x);
    });

    return T(l.result(), r.result());
  },

  // TODO: groupBy

  forAll: function (p, context) {
    var result = true;

    // TODO: Probably slow
    try {
      this.forEach(function (x) {
        if (!p.call(context, x)) {
          result = false;
          throw new Error("break");
        }
      });
    } catch (e) {
    }

    return result;
  },

  every: function (p, context) {
    return this.forAll(p, context);
  },

  exists: function (p, context) {
    var result = false;

    try {
      this.forEach(function (x) {
        if (p.call(context, x)) {
          result = true;
          throw new Error("break");
        }
      });
    } catch (e) {
    }

    return result;
  },

  find: function (p, context) {
    var result = None();

    try {
      this.forEach(function (x) {
        if (p.call(context, x)) {
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
      return sliceWithKnownDelta.call(this, n, 10000000, -n);
    }
  },

  slice: function (frm, until) {
    return sliceWithKnownBound.call(this, Math.max(frm, 0), until)
  },

  takeWhile: function (p, context) {
    var b = this.newBuilder();

    // TODO: Probably slow
    try {
      this.forEach(function (x) {
        if (!p.call(context, x)) throw new Error("break");
        else b.addOne(x);
      });
    } catch (e) {
    }

    return b.result();
  },

  dropWhile: function (p, context) {
    var b = this.newBuilder();
    var go = false;

    this.forEach(function (x) {
      if (!go && !p.call(context, x)) go = true;
      if (go) b.addOne(x);
    });

    return b.result();
  },

  span: function (p, context) {
    var l = this.newBuilder();
    var r = this.newBuilder();
    var toLeft = true;

    this.forEach(function (x) {
      toLeft = toLeft && p.call(context, x);
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

function filterImpl(p, context, isFlipped) {
  var b = this.newBuilder();

  this.forEach(function (x) {
    if (p.call(context, x) !== isFlipped) b.addOne(x);
  });

  return b.result();
}

function sliceInternal(frm, until, b) {
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
}

// Precondition: frm >= 0
function sliceWithKnownDelta(frm, until, delta) {
  var b = this.newBuilder();
  if (until <= frm) return b.result();
  else {
    b.sizeHint(this, delta);
    return sliceInternal.call(this, frm, until, b);
  }
}

function sliceWithKnownBound(frm, until) {
  var b = this.newBuilder();
  if (until <= frm) return b.result();
  else {
    b.sizeHintBounded(until - frm, this);
    return sliceInternal.call(this, frm, until, b);
  }
}

export {TTraversableLike};
