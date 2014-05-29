import {Class} from '../../helpers/Class';
import {Trait} from '../../helpers/Trait';
import {caseClassify, caseObjectify} from '../../helpers/caseClassify';

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

function ListImpl(xs) {
  if (xs.toList) {
    return xs.toList();
  } else {
    var res = Nil();
    for (var i = arguments.length - 1; i >= 0; i--) {
      if (arguments[i]) { // TODO: workaround to that 26 empty variable invokation in caseClassify
        res = res.cons(arguments[i]);
      }
    }
    return res;
  }
}

Class("List", ListImpl).extends(AbstractSeqImpl).with(TProduct).with(TLinearSeq)({

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

  /*
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
  */

  toList: function () {
    return this;
  },

  take: function (n) {
    var b = new ListBufferImpl();
    var i = 0;
    var these = this;
    while (!these.isEmpty() && i < n) {
      i++;
      b.add(these.head());
      these = these.tail();
    }
    return (these.isEmpty()) ? this : b.toList();
  },

  drop: function (n) {
    var these = this;
    var count = n;
    while (!these.isEmpty() && count > 0) {
      these = these.tail();
      count--;
    }
    return these;
  },

  /*
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
  */

  forEach: function (f, context) {
    var these = this;
    while (!these.isEmpty()) {
      f.call(context, these.head());
      these = these.tail();
    }
  },

  reverse: function () {
    var result = Nil();
    var these = this;
    while (!these.isEmpty()) {
      result = result.cons(these.head());
      these = these.tail();
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

  stringPrefix: 'List',

  // toStream

  // HACK: This is in the companion obj in Scala
  // TODO: More efficient impl, that is in line with the Scala impl
  newBuilder: function () {
    var res = [];
    return {
      addOne: function (x) {
        res.push(x);
      },
      result: function () {
        return List.apply(undefined, res);
      }
    }
  }
});

// IMPLEMENTATIONS


function NilImpl() {
}

Class("Nil", NilImpl).extends(ListImpl)({
  isEmpty: function () {
    return true;
  },
  head: Trait.required, // TODO: throw somethign
  tail: Trait.required, // TODO: throw somethin

  equals: function (that) {
    if (that.isInstanceOf("Seq")) {
      return that.isEmpty();
    }
    return false;
  }
});

function ConsImpl(head, tail) {
  this.head = function () {
    return head;
  };
  this.tail = function () {
    return tail;
  };
}

Class("Cons", ConsImpl).extends(ListImpl)({
  head: Trait.required, // see constructor
  tail: Trait.required, // see constructor
  isEmpty: function () {
    return false;
  }
});

// FACTORY METHODS

var List = caseClassify("List", ListImpl);

List.empty = function () {
  return Nil();
};

// TODO: Can this be here?
/*
List.newBuilder = function () {
  return new ListBufferImpl();
};
*/

var Cons = caseClassify("Cons", ConsImpl);
var Nil = caseObjectify("Nil", NilImpl);

export {List, Nil, Cons, ListImpl, NilImpl, ConsImpl};
