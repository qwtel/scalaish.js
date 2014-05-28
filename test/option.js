var Option = require("../dist/cjs/scalaish/Option").Option;
var Some = require("../dist/cjs/scalaish/Option").Some;
var None = require("../dist/cjs/scalaish/Option").None;

var helpers = require('../dist/cjs/scalaish/helpers/helpers');
var println = helpers.println;

var o = Option(1);

println(o.toString());
println(o.toJSON());

var plusOne = function (x) {
  return x + 1;
};

println(o.map(plusOne));

println(Some.unCreate(o.map(plusOne)));
println(o.toJSON());
println(o.copy({x: 3}));

println(Option(1).equals(Some(1)));
println(Option(1).isInstanceOf("Equals"));
