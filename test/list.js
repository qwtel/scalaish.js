var __List__ = require('../dist/cjs/scalaish/collection/immutable/List');
var List = __List__.List;
var Cons = __List__.Cons;
var Nil = __List__.Nil;

var list = Cons(1, Cons(2, Cons(3, Nil())));
var lessThanFive = function (x) { return x <= 5};
list = List(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).dropWhile(lessThanFive);
console.log(list);


