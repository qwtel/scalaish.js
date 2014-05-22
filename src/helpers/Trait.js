import {Trait} from "traits";
import {__clone} from "./helpers";

var T = Trait;

/**
 * Small wrapper around traits.js that supports types and provides a isInstanceOf method.
 *
 * Usage:
 *
 * var TFoo = Trait("Foo", {})
 * var TBar = Trait("Bar", {})
 * var TNoName = Trait({}) // backward compatible
 *
 * var TFooBar = Trait.compose(TFoo, TBar, TNoName);
 * var fooBar = Trait.create(Object.prototype, TFooBar);
 * fooBar = Object.create(Object.prototype, TFooBar); // works as well
 *
 * fooBar.isInstanceOf("Foo") // true
 * fooBar.isInstanceOf("Bar") // true
 * fooBar.isInstanceOf("Any") // true, because scalaish
 */
var Trait = (function () {

  // Duplicates
  var freeze = Object.freeze || function (obj) {
    return obj;
  };

  var call = Function.prototype.call;

  /**
   * An ad hoc version of bind that only binds the 'this' parameter.
   */
  var bindThis = Function.prototype.bind ?
    function (fun, self) {
      return Function.prototype.bind.call(fun, self);
    } :
    function (fun, self) {
      function funcBound(var_args) {
        return fun.apply(self, arguments);
      }

      return funcBound;
    };

  var slice = bindThis(call, Array.prototype.slice);

  function supportsGOPD() {
    try {
      if (Object.getOwnPropertyDescriptor) {
        var test = {x: 0};
        return !!Object.getOwnPropertyDescriptor(test, 'x');
      }
    } catch (e) {
    }
    return false;
  }

  var hasOwnProperty = bindThis(call, Object.prototype.hasOwnProperty);

  var getOwnPropertyNames = Object.getOwnPropertyNames ||
    function (obj) {
      var props = [];
      for (var p in obj) {
        if (hasOwnProperty(obj, p)) {
          props.push(p);
        }
      }
      return props;
    };

  var getOwnPropertyDescriptor = supportsGOPD() ?
    Object.getOwnPropertyDescriptor :
    function (obj, name) {
      return {
        value: obj[name],
        enumerable: true,
        writable: true,
        configurable: true
      };
    };

  // feature testing such that traits.js runs on both ES3 and ES5
  var forEach = Array.prototype.forEach ?
    bindThis(call, Array.prototype.forEach) :
    function (arr, fun) {
      for (var i = 0, len = arr.length; i < len; i++) {
        fun(arr[i], i);
      }
    };
  // Duplicates end

  var makeTypeField = function (type, record) {
    record.__type__ = {
      'Any': true
    };
    record.__type__[type] = true;
    return record;
  };

  function copy(traits) {
    var newTraits = [];
    forEach(traits, function (t) {
      var newTrait = __clone(t);
      newTraits.push(newTrait)
    });
    return newTraits;
  }

  function prepareTypes(func) {
    return function () {
      var traits = slice(arguments, 0);
      traits = copy(traits);

      var hasTypes = false;
      var __type__ = {};

      forEach(traits, function (t, i) {
        if (hasOwnProperty(t, '__type__')) {

          for (var key in t.__type__.value) {
            if (hasOwnProperty(t.__type__.value, key)) {
              __type__[key] = true;
            }
          }

          if (hasTypes === false) {
            // set to first trait that has a type
            hasTypes = i;
          } else {
            // remove types
            // TODO: This is very bad: changes the original trait; use copy
            delete t['__type__'];
            delete t['isInstanceOf'];
          }
        }
      });

      if (hasTypes !== false) {
        // first trait that has a type field
        traits[hasTypes].__type__.value = __type__;
        // instanceof should already be present
      }

      return func.apply(T, traits);
    }
  }

  function Trait(type, record) {
    if (typeof type !== 'string') {
      return T(type)
    } else {
      makeTypeField(type, record);
      getOwnPropertyDescriptor(record, '__type__');

      record.isInstanceOf = function (className) {
        return this.__type__[className] === true
      };
      getOwnPropertyDescriptor(record, 'isInstanceOf');

      return T(record);
    }
  }

  Trait.required = T.required;
  Trait.compose = prepareTypes(T.compose);
  Trait.resolve = T.resolve;
  Trait.override = prepareTypes(T.override);
  Trait.create = T.create;
  Trait.eqv = T.eqv;
  Trait.object = T.object; // not essential, cf. create + trait
  return freeze(Trait);
})();

export {Trait};
