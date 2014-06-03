var __List__ = require('../dist/cjs/scalaish/collection/immutable/List');
var List = __List__.List;
var Cons = __List__.Cons;
var Nil = __List__.Nil;
var printTime = require('../dist/cjs/scalaish/helpers/helpers').printTime;

var list = Cons(1, Cons(2, Cons(3, Nil())));
print(list);

//console.log(list);
var lessThanFive = function (x) {
  return x <= 5
};
list = list.filter(lessThanFive);
list = List([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

var tuple = list.partition(function (x) {
  return x <= 5
});

print(tuple._1);
console.log('---');
print(tuple._2);
console.log('---');


function print(list) {
  var res = list.tail().foldLeft(list.head())(function (a, x) {
    return a + ',' + x;
  });
  console.log('List(' + res + ')');
}

plusOne = function (x) {
  return x + 1
};

var b;
printTime(function () {
  b = Nil();
  for (var i = 0; i < 100000; i++) {
    b = b.cons(i);
  }

  b.map(plusOne);
});

var a;
printTime(function () {
  a = [];
  for (var i = 0; i < 100000; i++) {
    a.push(i);
  }

  a.map(plusOne);
});

var c;
printTime(function () {
  c = [];
  for (var i = 0; i < 100000; i++) {
    c = c.concat(i);
  }

  c.map(plusOne);
});

// print(list);

