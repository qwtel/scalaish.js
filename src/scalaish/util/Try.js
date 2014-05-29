import {Class} from '../helpers/Class';
import {Trait} from '../helpers/Trait';
//import {T} from '../Product'
import {__result} from "../helpers/helpers";
import {caseClassify} from "../helpers/caseClassify";
import {Some, None} from '../Option';
import {NoSuchElementException, UnsupportedOperationException} from '../Exceptions';

function TryImpl(value) {
  try {
    return Success(value);
  } catch (e) {
    // TODO: NonFatal
    return Failure(e);
  }
}

Class("Try", TryImpl)({

  isFailure: Trait.required,

  isSuccess: Trait.required,

  getOrElse: function (def, context) {
    return this.isSuccess() ? this.get() : __result(def, context);
  },

  orElse: function (def, context) {
    try {
      return this.isSuccess() ? this : __result(def, context);
    }
    catch (e) {
      // TODO: NonFatal
      return Failure(e);
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

    // TODO: Creact class function?
    /**
     * @template A
     * @param {function(A): boolean} p
     * @param {Object=} context
     * @constructor
     */
    function WithFilter(p, context) {
      this.p = p;
      this.context = context;
    }

    WithFilter.prototype = {
      map: function (f, context) {
        return self.filter(this.p, this.context).map(f, context);
      },
      flatMap: function (f, context) {
        return self.filter(this.p, this.context).flatMap(f, context);
      },
      forEach: function (f, context) {
        return self.filter(this.p, this.context).forEach(f, context);
      },
      withFilter: function (q, context) {
        return new WithFilter(function (x) {
          return this.p.call(this.context, x) && q.call(context, x);
        }.bind(this), context);
      }
    };

    return new WithFilter(p, context);
  },

  recoverWith: null,

  recover: null,

  toOption: function () {
    return this.isSuccess() ? Some(this.get()) : None();
  },

  flatten: null,

  failed: null,

  transform: function (s, f, context) {
    try {
      return this.match()
        .case(Success, s, context)
        .case(Failure, f, context)
        .get();
    } catch (e) {
      // TODO: NonFatal
      return Failure(e);
    }
  }
});

function SuccessImpl(value) {
  this.value = __result(value);
}

Class("Success", SuccessImpl).extends(TryImpl)({

  isFailure: function () {
    return false;
  },

  isSuccess: function () {
    return true;
  },

  recoverWith: function () {
    return this;
  },

  get: function () {
    return this.value;
  },

  flatMap: function (f, context) {
    try {
      return f.call(context, this.value);
    } catch (e) {
      // TODO: NonFatal
      return Failure(e);
    }
  },

  flatten: function () {
    return this.value;
  },

  forEach: function (f, context) {
    f.call(context, this.value);
  },

  map: function (f, context) {
    return Try(f.bind(context, this.value));
  },

  filter: function (p, context) {
    try {
      return p.call(context, this.value) ?
        this : Failure(new NoSuchElementException("Predicate does not hold for " + this.value));
    } catch (e) {
      // TODO: NonFatal
      return Failure(e);
    }
  },

  recover: function () {
    return this;
  },

  failed: function () {
    return Failure(new UnsupportedOperationException("Success.failed"))
  }
});

function FailureImpl(exception) {
  this.exception = exception;
}

Class("Failure", FailureImpl).extends(TryImpl)({

  isFailure: function () {
    return true;
  },

  isSuccess: function () {
    return false;
  },

  recoverWith: function (f, context) {
    try {
      return (true /* TODO */) ? f.call(context, this.exception) : this;
    } catch (e) {
      // TODO: NonFatal
      return Failure(e);
    }
  },

  get: function () {
    throw this.exception;
  },

  flatMap: function () {
    return this;
  },

  flatten: function () {
    return this;
  },

  forEach: function () {
  },

  map: function () {
    return this;
  },

  filter: function () {
    return this;
  },

  recover: function (rescueException, context) {
    try {
      return (true /* TODO */) ? Try(rescueException.bind(context, this.exception)) : this;
    } catch (e) {
      // TODO: NonFatal
      return Failure(e);
    }
  },

  failed: function () {
    return Success(this.exception);
  }
});

var Try = caseClassify("Try", TryImpl);
var Success = caseClassify("Success", SuccessImpl);
var Failure = caseClassify("Failure", FailureImpl);

export {Try, Success, Failure, TryImpl, SuccessImpl, FailureImpl};
