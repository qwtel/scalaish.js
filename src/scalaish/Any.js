import {__isFunction} from './helpers/helpers';

function Any() {
}

Any.prototype = {
  Any: true,

  isInstanceOf: function (Class) {
    if (__isFunction(Class)) {
      return this[Class.name] === true
    } else {
      return this[Class] === true
    }
  },

  getClass: function () {
    // TODO
  }
};

export {Any};
