import {_} from 'underscore';
import {__equals} from './helpers';
import {TProduct} from '../Product';
import {IndexOutOfBoundsException} from '../Exceptions';
import {match} from './match';

/**
 * (c) Angular.js
 */
var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
var FN_ARG_SPLIT = /,/;
var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

/**
 * (c) Angular.js
 */
function getArgumentNames(fn) {
  var fnText, argDecl, res = [];

  if (typeof fn === 'function') {
    fnText = fn.toString().replace(STRIP_COMMENTS, '');
    argDecl = fnText.match(FN_ARGS);
    Array.prototype.forEach.call(argDecl[1].split(FN_ARG_SPLIT), function (arg) {
      res.push(arg.trim());
    });
  }

  return res;
}

// TODO: this should be replaced by a iterator sometime
function iterateOverValues(caseClass, argumentList, f, context) {
  Array.prototype.forEach.call(argumentList, function (name) {
    f.call(context, name, caseClass[name]);
  });
}

/**
 * @param {String} name - the name of this case class
 * @param {Function} Impl - the constructor of the implementation of this case class (the one that get's invoked with 'new')
 * @param {Array.<String>=} argumentList - the names of the values of this case class. TODO: Better solution?
 * @return {Function} - factory function
 */
function caseClassify(name, Impl, argumentList) {

  argumentList = argumentList || getArgumentNames(Impl);

  var Factory = function () {
    return Factory.create.apply(undefined, arguments);
  };

  Factory.fromJSON = function (jsonObj) {
    var cc = new Impl();
    Array.prototype.forEach.call(argumentList, function (n) {
      cc[n] = jsonObj[n];
    });
    return cc;
  };

  // TODO: better way to do this? Is this inefficient?
  Factory.create = function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z) {
    return new Impl(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z);
  };

  Factory.unCreate = function (caseClass) {
    var values = [];
    iterateOverValues(caseClass, argumentList, function (n, v) {
      values.push(v);
    });
    return values;
  };

  // in case it was forgot
  Impl.prototype[name] = true;

  _.extend(Impl.prototype, TProduct, {

    // TODO: Better name?
    __factory__: Factory,

    // TODO: Serializable equavalent for JSONable?
    //Impl.prototype.JSONable: true,

    copy: function (patchObj) {
      // TODO: More efficient possibility?
      return Factory.fromJSON(_.extend(this.toJSON(), patchObj));
    },

    productArity: function () {
      return argumentList.length;
    },

    productElement: function (n) {
      if (n < argumentList.length) {
        return this[argumentList[n]];
      } else {
        throw new IndexOutOfBoundsException();
      }
    },

    canEqual: function (that) {
      return that.isInstanceOf(name);
    },

    productPrefix: name,

    // TODO: What should getClass actually return? Constructor? Factory? A class - class?
    getClass: function () {
      return name;
    },

    /*
     Impl.prototype.equals = function (other) {
     if (typeof other.Product !== 'undefined') {
     if (this.productArity() === other.productArity()) {
     // TODO: productIterator !!!
     return this.productIterator().sameElements(other.productIterator());
     }
     }

     return false;
     };
     */

    // TODO: Check for same type? Is a case class equal to a tuple with the same contents?
    equals: function (other) {
      if (typeof other.Product !== 'undefined') {
        if (this.productArity() === other.productArity() && this.productArity() > 0) {
          var res = true;
          iterateOverValues(this, argumentList, function (n, v) {
            res = res && __equals(this[n], v);
          }, this);
          return res;
        }
      }

      return false;
    },

    hashCode: function (x) {
      // TODO
    },

    /*
     toString: function () {
     // TODO: productIterator !!!
     return this.productIterator().mkString(this.productPrefix + "(", ",", ")");
     },
     */

    // Hacky implementation, good enough for now
    toString: function () {
      var values = [];
      iterateOverValues(this, argumentList, function (n, v) {
        values.push(v);
      });
      return name + '(' + values.join(',') + ')';
    },

    // this isn't really required. JSON.stringify works anyway...
    toJSON: function () {
      var res = {};
      iterateOverValues(this, argumentList, function (n, v) {
        res[n] = v;
      });
      return res;
    },

    /**
     * Start a pseudo pattern match
     * @return {*}
     */
    match: function() {
      return match(this);
    }
  });

  return Factory;
}

/**
 * @param {String} name - the name of this case class
 * @param {Function} Impl - the constructor of the implementation of this case object; Takes no arguments.
 * @param {Array.<String>=} argumentList - the names of the values of this case class. TODO: Better solution?
 */
function caseObjectify(name, Impl, argumentList) {
  var Factory = caseClassify(name, Impl, argumentList);

  Factory.instance = new Impl();

  Factory.create = function () {
    return Factory.instance;
  };

  return Factory;
}

export {caseClassify, caseObjectify};
