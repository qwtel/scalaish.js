import {Trait} from '../helpers/Trait';
// import {List, Nil, Cons} from './immutable/List';

function reversed() {
  var elems = Nil();
  this.forEach(function(x) {
    elems = elems.cons(x);
  });
  return elems;
}

var TTraversableOnce = Trait("TraversableOnce")({
  forEach: Trait.required,
  isEmpty: Trait.required,
  hasDefiniteSize: Trait.required,
  seq: Trait.required,
  forAll: Trait.required,
  exists: Trait.required,
  find: Trait.required,

  // TODO: copyToArray

  size: function () {
    var result = 0;
    this.forEach(function() {
      result++;
    });
    return result;
  },

  nonEmpty: function () {
    return !this.isEmpty();
  },

  count: function (p, context) {
    var cnt = 0;
    this.forEach(function(x) {
      if (p.call(context, x)) cnt++;
    });
    return cnt;
  },

  foldLeft: function (z) {
    return function (op, context) {
      var result = z;
      this.forEach(function(x) {
        result = op.call(context, result, x);
      });
      return result;
    }.bind(this);
  },

  foldRight: function (op, context) {
    return function (z) {
      return reversed.call(this).foldLeft(z)(function(x, y) {
        return op.call(context, x, y);
      });
    }.bind(this);
  }
});

export {TTraversableOnce};
