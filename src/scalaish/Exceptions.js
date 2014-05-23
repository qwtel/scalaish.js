import {Trait} from './helpers/Trait';

var TThrowable = Trait("Throwable", {
  message: Trait.required
});

var TException = Trait.compose(TThrowable, Trait("Exception", {}));
var TRuntimeException = Trait.compose(TException, Trait("RuntimeException", {}));

var TNoSuchElementException = Trait.compose(TRuntimeException, Trait("NoSuchElementException", {}));
var TUnsupportedOperationException = Trait.compose(TRuntimeException, Trait("UnsupportedOperationException", {}));
var TIndexOutOfBoundsException = Trait.compose(TRuntimeException, Trait("IndexOutOfBoundsException", {}));

function Throwable(msg) {
  return Object.create(Throwable.prototype, Trait.compose(TThrowable, Trait({message: msg})))
}

function Exception(msg) {
  return Object.create(Exception.prototype, Trait.compose(TException, Trait({message: msg})))
}

function RuntimeException(msg) {
  return Object.create(RuntimeException.prototype, Trait.compose(TRuntimeException, Trait({message: msg})))
}

function NoSuchElementException(msg) {
  return Object.create(NoSuchElementException.prototype, Trait.compose(TNoSuchElementException, Trait({message: msg})))
}

function UnsupportedOperationException(msg) {
  return Object.create(UnsupportedOperationException.prototype, Trait.compose(TUnsupportedOperationException, Trait({message: msg})))
}

function IndexOutOfBoundsException(msg) {
  return Object.create(IndexOutOfBoundsException.prototype, Trait.compose(TIndexOutOfBoundsException, Trait({message: msg})))
}

export {
  Throwable,
  Exception,
  RuntimeException,
  NoSuchElementException,
  UnsupportedOperationException,
  IndexOutOfBoundsException
  };
