import {__result} from "../helpers/helpers";
import {Trait} from "../helpers/Trait";
import {Some, None} from '../Option';
import {NoSuchElementException, UnsupportedOperationException} from '../Exceptions';

var TTry = Trait("Try", {
  isFailure: Trait.required,

  isSuccess: Trait.required,

  getOrElse: function (def) {
    return this.isSuccess() ? this.get() : __result(def);
  },

  orElse: function (def) {
    try {
      return this.isSuccess() ? this : def;
    }
    catch (e) {
      // TODO: NonFatal
      return Failure(e);
    }
  },

  get: Trait.required,

  forEach: Trait.required,

  flatMap: Trait.required,

  map: Trait.required,

  filter: Trait.required,

  // TODO: withFilter

  recoverWith: Trait.required,

  recover: Trait.required,

  toOption: function () {
    return this.isSuccess() ? Some(this.get()) : None()
  },

  flatten: Trait.required,

  failed: Trait.required,

  transform: function (s, f) {
    try {
      // TODO: (pseudo) pattern matching?
      if (this.isSuccess()) {
        return s(this.value)
      } else if (this.isFailure()) {
        return f(this.exception)
      }
    } catch (e) {
      // TODO: NonFatal
      return Failure(e)
    }
  }
});

var TFailure = Trait.compose(TTry, Trait("Failure", {
  exception: Trait.required,

  isFailure: function () {
    return true
  },

  isSuccess: function () {
    return false
  },

  recoverWith: function (f) {
    try {
      return (true /* TODO */) ? f(this.exception) : this
    } catch (e) {
      // TODO: NonFatal
      return Failure(e)
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

  recover: function (rescueException) {
    try {
      return (true /* TODO */) ? Try(rescueException.bind(undefined, this.exception)) : this
    } catch (e) {
      // TODO: NonFatal
      return Failure(e)
    }
  },

  failed: function () {
    return Success(this.exception)
  }
}));

var TSuccess = Trait.compose(TTry, Trait("Success", {
  value: Trait.required,

  isFailure: function () {
    return false
  },

  isSuccess: function () {
    return true
  },

  recoverWith: function (f) {
    return this
  },

  get: function () {
    return this.value
  },

  flatMap: function (f) {
    try {
      return f(this.value)
    } catch (e) {
      // TODO: NonFatal
      return Failure(e)
    }
  },

  flatten: function () {
    return this.value
  },

  forEach: function (f) {
    f(this.value)
  },

  map: function (f) {
    return Try(f.bind(undefined, this.value))
  },

  filter: function (p) {
    try {
      return p(this.value) ? this : Failure(new NoSuchElementException("Predicate does not hold for " + this.value))
    } catch (e) {
      // TODO: NonFatal
      return Failure(e)
    }
  },

  recover: function (rescueException) {
    return this
  },

  failed: function () {
    return Failure(new UnsupportedOperationException("Success.failed"))
  }
}));

function Success(v) {
  return Object.create(Success.prototype, Trait.compose(TSuccess, Trait({value: __result(v)})))
}

function Failure(e) {
  return Object.create(Failure.prototype, Trait.compose(TFailure, Trait({exception: e})))
}

function Try(r) {
  try {
    return Success(r)
  } catch (e) {
    // TODO: NonFatal
    return Failure(e)
  }
}

export {Try, Success, Failure};
