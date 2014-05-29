import {_} from 'underscore';
import {__wrap} from '../helpers/helpers';

function TraitBuilder(name, trt) {
  this.trt = trt;
  this.trt[name] = true;
}

TraitBuilder.prototype = {
  required: function() {
    throw new Error("Not implemented");
  },

  with: function (trt) {
    _.extend(this.trt, trt);
    return __wrap(this);
  },

  constructor: function (body) {
    body = body || {};
    return _.extend(this.trt, body);
  }
};

function Trait(name, trt) {
  var traitBuilder = new TraitBuilder(name, {});

  if (trt != null) {
    return traitBuilder.constructor(trt);
  } else {
    return __wrap(traitBuilder);
  }
}

var Trait2 = Trait;

export {Trait, Trait2}
