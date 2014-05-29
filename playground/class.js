var Class = require('../dist/cjs/scalaish/helpers/Class').Class;
var Trait = require('../dist/cjs/scalaish/helpers/Trait').Trait;
var Any = require('../dist/cjs/scalaish/Any').Any;

function MyOldParentClass() {
}
MyOldParentClass.prototype = Object.create(Any.prototype);


var TMyTrait = Trait("MyTrait", {
  doSomething: Trait.required,
  doSomethingElse: function () {
    this.doSomething();
    console.log('did something')
  }
});

var TMyOtherTrait = Trait("MyOtherTrait", {
  doSomethingElse: function () {
    console.log('did something else else')
  }
});

var MyClassImpl = Class("MyClass").extends(MyOldParentClass).with(TMyTrait).with(TMyOtherTrait)({
  constructor: function (a) {
    this.a = a;
  },
  doSomething: function () {
    console.log(this.a);
  }
});

var a = new MyClassImpl(1);
console.log(a);
console.log(a.isInstanceOf("MyClass"));
console.log(a.isInstanceOf("MyTrait"));
console.log(a.isInstanceOf("MyOtherTrait"));
console.log(a instanceof Any);
console.log(a instanceof MyClassImpl);
console.log(a instanceof MyOldParentClass);
a.doSomething();
a.doSomethingElse();

var SimpleClass = Class("SimpleClass")();
var sc = new SimpleClass();
console.log(sc instanceof Any);
console.log(sc.isInstanceOf('Any'));
console.log(sc.isInstanceOf('SimpleClass'));
