import {Trait} from './helpers/Trait';

var TFoo = Trait("Foo", {
  foo: function () {
  }
});
var TBar = Trait("Bar", {
  bar: function () {
  }
});
var TFooBar = Trait.compose(TFoo, TBar);

function FooBar(x) {
  return Object.create(FooBar.prototype, Trait.compose(TFooBar, Trait("FooBar", {value: x})))
}

var fooBar = FooBar(3);
/*
console.log(fooBar.isInstanceOf("Bar"));
console.log(fooBar.isInstanceOf("Foo"));
console.log(fooBar.isInstanceOf("Any"));
console.log(!fooBar.isInstanceOf("Other"));
console.log(fooBar.hasOwnProperty("foo"));
console.log(fooBar.hasOwnProperty("bar"));
console.log(fooBar.value === 3);
console.log(fooBar.isInstanceOf("FooBar"));
console.log(fooBar instanceof FooBar);
*/

import {Option, Some, None} from './Option';

var o = Option(1);
console.log(o instanceof Some);
console.log(o instanceof Option);
console.log(!(o instanceof None));
console.log(o.isInstanceOf("Some"));
console.log(o.isInstanceOf("Option"));
console.log(o.isInstanceOf("Any"));
console.log(!o.isInstanceOf("Other"));
console.log(!o.isInstanceOf("None"));
console.log(o.get() === 1);
console.log(o.map(function(x) { return x + 1}).get() === 2);

/*
var fooBar = Trait.create(Object.prototype, TFooBar);
console.log(fooBar.isInstanceOf("Bar"));
console.log(fooBar.isInstanceOf("Foo"));
console.log(fooBar.isInstanceOf("Any"));
console.log(!fooBar.isInstanceOf("Other"));
console.log(fooBar.hasOwnProperty("foo"));
console.log(fooBar.hasOwnProperty("bar"));

fooBar = Object.create(Object.prototype, TFooBar);
console.log(fooBar.isInstanceOf("Bar"));
console.log(fooBar.isInstanceOf("Foo"));
console.log(fooBar.isInstanceOf("Any"));
console.log(!fooBar.isInstanceOf("Other"));
console.log(fooBar.hasOwnProperty("foo"));
console.log(fooBar.hasOwnProperty("bar"));
*/
