import {__isFunction} from './helpers/helpers';

var TAny = {
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

function Any() {
}
Any.prototype = TAny;

export {Any};
