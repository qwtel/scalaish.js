import {match} from './helpers/match';
import {__isFunction} from './helpers/helpers';

function Any() {
}

Any.prototype = {
  Any: true,

  isInstanceOf: function (Class) {
    if (Class._name) {
      return this[Class._name] === true
    } else {
      return this[Class] === true
    }
  }
};

export {Any};
