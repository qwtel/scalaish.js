import {_} from 'traits';
import {Trait} from 'traits';

import {AbstractSeqImpl} from '../Seq';
import {TLinearSeq} from '../LinearSeq';
import {TProduct} from '../../Product';

// TODO: TODO: TODO
function ListBufferImpl() {
}
ListBufferImpl.prototype.addAll = function () {
};

ListBufferImpl.prototype.prependToList = function () {
};

var TLinearSeqOptimized = {
  // TODO
};

var TSerializable = {
  // TODO: Serializable in JS land means toJSON
  // or create a trait 'JSONable' instead...
};

// PSEUDO TRAITS

// TODO: List is not really a trait..
var TList_ = Trait.create("List", {
  companion: List, // this is so wrong

  /**
   * @type {Boolean}
   */
  isEmpty: Trait.required,
  /**
   * @template A
   * @type {A}
   */
  head: Trait.required,
  /**
   * @template A
   * @type {List.<A>}
   */
  tail: Trait.required,

  cons: function (x) {
    return new ConsImpl(x, this);
  },

  consAll: function (prefix) {
    if (this.isEmpty) {
      return prefix;
    } else if (prefix.isEmpty) {
      return this;
    } else {
      return (new ListBufferImpl().addAll(prefix)).prependToList(this);
    }
  },

  reverseConsAll: function () {

  },

  mapConserve: function (f) {

  },

  // ++
  addAll: function () {

  },

  // +:
  append: function () {
    // TODO: ???
  },

  toList: function () {
    return this;
  },

  take: function (n) {
    var b = new ListBufferImpl();
    var i = 0;
    var these = this;
    while (!these.isEmpty && i < n) {
      i++;
      b.add(these.head);
      these = these.tail;
    }
    return (these.isEmpty) ? this : b.toList();
  },

  drop: function (n) {
    var these = this;
    var count = n;
    while (!these.isEmpty && count > 0) {
      these = these.tail;
      count--;
    }
    return these;
  },

  slice: function () {

  },

  takeRight: function () {

  },

  splitAt: function () {

  },

  takeWhile: function () {

  },

  dropWhile: function () {

  },

  span: function () {

  },

  forEach: function (f, context) {
    var these = this;
    while (!these.isEmpty) {
      f.call(context, these.head);
      these = these.tail;
    }
  },

  reverse: function () {
    var result = Nil();
    var these = this;
    while (!these.isEmpty) {
      result = these.head.cons(result);
      these = these.tail;
    }
    return result;
  },

  foldRight: function (z) {
    return function (op, context) {
      return this.reverse().foldLeft(z)(function (right, left) {
        return op.call(context, left, right);
      });
    }.bind(this);
  },

  stringPrefix: 'List'

  // toStream
});

// TODO: Correct Order?
var TList = Trait.override(TList_, TLinearSeq, TProduct, TLinearSeqOptimized, TSerializable);


// IMPLEMENTATIONS

function ListImpl() {
}

ListImpl.prototype = _.extend(Object.create(AbstractSeqImpl.prototype), TList);

function NilImpl() {
}

NilImpl.prototype = _.extend(Object.create(ListImpl.prototype), {
  isEmpty: true,
  head: null, // TODO: make head and tail functions to throw exceptions here? performance?
  tail: null, // TODO: make head and tail functions to throw exceptions here? performance?
  equals: function (that) {
    if (that.isInstanceOf("Seq")) {
      return that.isEmpty;
    }
    return false;
  }
});

function ConsImpl(hd, tl) {
  this.head = hd;
  this.tail = tl;
}

ConsImpl.prototype = _.extend(Object.create(ListImpl.prototype), {
  head: null, // see constructor
  tail: null, // see constructor
  isEmpty: false
});


// FACTORY METHODS

function List(xs) {
  // TODO: support JS object and array
  // TODO: support argument list
  return xs.toList();
}

List.empty = function () {
  return Nil();
};

List.unapply = function (cons) {
  return (cons.isEmpty ? Nil.unapply : Cons.unapply)(cons);
};

// TODO: Can this be here?
List.newBuilder = function () {
  return new ListBufferImpl();
};

// TODO: canBuildFrom ???

function Nil() {
  return Nil.instance;
}

Nil.instance = new NilImpl();

Nil.unapply = function() {
  return null;
};

function Cons(hd, tl) {
  return new ConsImpl(hd, tl);
}

Cons.unapply = function (cons) {
  return cons.head;
};

export {List, Nil, Cons, ListImpl, NilImpl, ConsImpl};
