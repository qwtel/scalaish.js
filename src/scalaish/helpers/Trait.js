import {_} from 'underscore';

var Trait = function(name, obj) {
  obj[name] = true;
  return obj;
};

Trait.required = function() {
  // TODO:
  throw new Error("not impl");
};

Trait.compose = function() {
  var traits = Array.prototype.slice.call(arguments, 0).reverse();
  traits.unshift({});
  return _.extend.apply(undefined, traits);
};

Trait.override = Trait.compose;

export {Trait};
