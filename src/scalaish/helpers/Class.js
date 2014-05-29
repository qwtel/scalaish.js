import {_} from 'underscore';
import {Any} from '../Any';
import {__wrap} from '../helpers/helpers';

function ClassBuilder(name, Impl) {
  this.Impl = Impl || (function () {
    this.constructor.apply(this, arguments);
  });

  this._name = name;
  this.Impl.prototype = Object.create(Any.prototype);
  this.Impl.prototype[this._name] = true;
}

ClassBuilder.prototype = {
  constructor: function (body) {
    body = body || {};
    _.extend(this.Impl.prototype, body);
    return this.Impl;
  },

  extends: function (Ctor) {
    this.Impl.prototype = Object.create(Ctor.prototype);
    this.Impl.prototype[this._name] = true;
    return __wrap(new WithTraitClassBuilder(this));
  },

  with: function (trt) {
    _.extend(this.Impl.prototype, trt);
    return __wrap(new WithTraitClassBuilder(this));
  }
};

function WithTraitClassBuilder(instance) {
  this._name = instance._name;
  this.Impl = instance.Impl
}

WithTraitClassBuilder.prototype = {
  constructor: function (body) {
    body = body || {};
    _.extend(this.Impl.prototype, body);
    return this.Impl;
  },

  with: function (trt) {
    _.extend(this.Impl.prototype, trt);
    return __wrap(this);
  }
};

function Class(name, Impl, body) {
  var classImpl = new ClassBuilder(name, Impl);

  if (body != null) {
    return classImpl.constructor(body);
  } else {
    return __wrap(classImpl);
  }
}

export {Class}
