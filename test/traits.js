var _ = require('underscore')._;
//var TTraversable = require('../dist/cjs/scalaish/collection/Traversable').TTraversable;
var println = require('../dist/cjs/scalaish/helpers/helpers').println;
var caseClassify = require('../dist/cjs/scalaish/helpers/caseClassify').caseClassify;
var Any = require('../dist/cjs/scalaish/Any').Any;

function IdImpl(id, name) {
  this.id = id;
  this.name = name;
}

IdImpl.prototype = _.extend(Object.create(Any.prototype), {
  giveName: function () {
    return this.id + ': ' + this.name;
  }
});

function Id(id, name) {
  return new IdImpl(id, name);
}

caseClassify("Id", Id, IdImpl);

var me = Id(123, 'Me');
println(me.hashCode());
println(me.getClass());
println(me.toString());
println(JSON.stringify(me));
println(Id.fromJSON({id: 123, name: "Foor"}));
println(me.toJSON());


// println(TTraversable);

