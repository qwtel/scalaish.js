var _ = require('underscore')._;
var T = require('../dist/cjs/scalaish/Tuple').T;
var Tuple10 = require('../dist/cjs/scalaish/Tuple').Tuple10;
var println = require('../dist/cjs/scalaish/helpers/helpers').println;
var caseClassify = require('../dist/cjs/scalaish/helpers/caseClassify').caseClassify;
var Any = require('../dist/cjs/scalaish/Any').Any;

function IdImpl(id, name) {
  this.id = id;
  this.name = name;
}
var Id = caseClassify("Id", IdImpl);

var me = Id(123, 'Me');
println(me.hashCode());
println(me.getClass());
println(me.toString());
println(JSON.stringify(me.toJSON()));
println(Id.fromJSON({id: 123, name: "Flo"}).toString());
console.log(me.toJSON());

println(T(1, 2, 3));
println(T(1, 2, 3).isInstanceOf('Tuple3'));
println(T(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).getClass());
println(T(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).isInstanceOf('Any'));
println(T(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).match().case(Tuple10, function(_, _, _, _, _5, _6) {
  println('match 10', _5, _6);
  return 'success';
}).get());

println(T(1, 2, 3).equals(T(1, 2, 3)));
println(!T(1, 2, 4).equals(T(1, 2, 3)));

println(T(1, 2, 3).productIterator().drop(1));
var lessThanFive = function (x) { return x <= 5};
T(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).productIterator().dropWhile(lessThanFive).forEach(println);
