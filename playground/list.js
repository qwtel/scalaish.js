var __List__ = require('../dist/cjs/scalaish/collection/immutable/List');
var List = __List__.List;
var Cons = __List__.Cons;
var Nil = __List__.Nil;
var printTime = require('../dist/cjs/scalaish/helpers/helpers').printTime;

var list = Cons(1, Cons(2, Cons(3, Nil())));
list.forEach(console.log);

//console.log(list);
var lessThanFive = function (x) {
  return x <= 5
};
list = List(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
list.forEach(console.log);
list = list.filter(lessThanFive);
list.forEach(console.log);

function print(list) {
  if (list.head()) {
    console.log(list.head());
    print(list.tail());
  }
}

printTime(function () {
  var b = Nil();
  for (var i = 0; i < 100000; i++) {
    b = b.cons(i);
  }
});

// print(list);

