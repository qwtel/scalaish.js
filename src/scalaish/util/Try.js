import {_} from 'underscore';
import {Any} from '../Any';
import {T} from '../Product'
import {__result} from "../helpers/helpers";
import {Some, None} from '../Option';
import {NoSuchElementException, UnsupportedOperationException} from '../Exceptions';

var constructors = (function () {
  var TTry = {
    Try: true,

    isFailure: null,

    isSuccess: null,

    getOrElse: function (def, context) {
      return this.isSuccess() ? this.get() : __result(def, context);
    },

    orElse: function (def, context) {
      try {
        return this.isSuccess() ? this : __result(def, context);
      }
      catch (e) {
        // TODO: NonFatal
        return new Failure(e);
      }
    },

    get: null,

    forEach: null,

    flatMap: null,

    map: null,

    filter: null,

    // TODO: This is the exact same code as in Option
    withFilter: function (p, context) {
      var self = this;

      function WithFilter(p, context) {
        this.p = p;
        this.context = context;
      }

      WithFilter.prototype = {
        map: function (f, context) {
          return self.filter(this.p, this.context).map(f, context)
        },
        flatMap: function (f, context) {
          return self.filter(this.p, this.context).flatMap(f, context)
        },
        foreach: function (f, context) {
          return self.filter(this.p, this.context).foreach(f, context)
        },
        withFilter: function (q, context) {
          return new WithFilter(function (x) {
            return this.p.call(x, this.context) && q.call(x, context)
          }.bind(this))
        }
      };

      return new WithFilter(p, context)
    },

    recoverWith: null,

    recover: null,

    toOption: function () {
      return this.isSuccess() ? Some(this.get()) : None()
    },

    flatten: null,

    failed: null,

    transform: function (s, f, context) {
      try {
        // TODO: (pseudo) pattern matching?
        if (this.isSuccess()) {
          return s.call(context, this.value)
        } else if (this.isFailure()) {
          return f.call(context, this.exception)
        }
      } catch (e) {
        // TODO: NonFatal
        return new Failure(e)
      }
    }
  };

  var TFailure = {
    Failure: true,

    exception: null,

    isFailure: function () {
      return true
    },

    isSuccess: function () {
      return false
    },

    recoverWith: function (f, context) {
      try {
        return (true /* TODO */) ? f.call(context, this.exception) : this
      } catch (e) {
        // TODO: NonFatal
        return new Failure(e)
      }
    },

    get: function () {
      throw this.exception
    },

    flatMap: function () {
      return this
    },

    flatten: function () {
      return this
    },

    forEach: function () {
    },

    map: function () {
      return this
    },

    filter: function () {
      return this
    },

    recover: function (rescueException, context) {
      try {
        return (true /* TODO */) ? new Try(rescueException.bind(context, this.exception)) : this
      } catch (e) {
        // TODO: NonFatal
        return new Failure(e)
      }
    },

    failed: function () {
      return new Success(this.exception)
    }
  };

  var TSuccess = {
    Success: true,

    value: null,

    isFailure: function () {
      return false
    },

    isSuccess: function () {
      return true
    },

    recoverWith: function () {
      return this
    },

    get: function () {
      return this.value
    },

    flatMap: function (f, context) {
      try {
        return f.call(context, this.value)
      } catch (e) {
        // TODO: NonFatal
        return new Failure(e)
      }
    },

    flatten: function () {
      return this.value
    },

    forEach: function (f, context) {
      f.call(context, this.value)
    },

    map: function (f, context) {
      return new Try(f.bind(context, this.value))
    },

    filter: function (p, context) {
      try {
        return p.call(context, this.value) ?
          this : new Failure(new NoSuchElementException("Predicate does not hold for " + this.value))
      } catch (e) {
        // TODO: NonFatal
        return new Failure(e)
      }
    },

    recover: function () {
      return this
    },

    failed: function () {
      return new Failure(new UnsupportedOperationException("Success.failed"))
    }
  };

  function Try(r, context) {
    try {
      return new Success(r, context)
    } catch (e) {
      // TODO: NonFatal
      return new Failure(e)
    }
  }

  Try.prototype = _.extend(Object.create(Any.prototype), TTry);

  function Success(v, context) {
    this.value = __result(v, context);
  }

  Success.prototype = _.extend(Object.create(Try.prototype), TSuccess);

  function Failure(e) {
    this.exception = e;
  }

  Failure.prototype = _.extend(Object.create(Try.prototype), TFailure);

  return T(Try, Success, Failure)
})();

function Try(r, context) {
  return Try.apply(r, context)
}
Try.apply = function (r, context) {
  return new constructors._1(r, context);
};
Try.unapply = function (t) {
  return t.isSuccess() ?
    Success.unapply(t) :
    Failure.unapply(t)
};

function Success(v, context) {
  return Success.apply(v, context);
}
Success.apply = function (v, context) {
  return new constructors._2(v, context);
};
Success.unapply = function (s) {
  return s.value;
};

function Failure(e) {
  return Failure.apply(e);
}
Failure.apply = function (e) {
  return new constructors._3(e);
};
Failure.unapply = function (e) {
  return e.exception;
};

export {Try, Success, Failure};
