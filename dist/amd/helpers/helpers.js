define("helpers/helpers",
  ["exports"],
  function(__exports__) {
    "use strict";
    // http://coffeescript.org/
    var __extends = function (parent, child) {
        for (var key in parent) {
            if (parent.hasOwnProperty(key)) child[key] = parent[key];
        }
        function ctor() {
            this.constructor = child;
        }

        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
    };

    // http://stackoverflow.com/a/1880726/870615
    var __isConstructor = function (clazz) {
        var isConstructor = false;
        if (this instanceof clazz && !this['__previouslyConstructedBy' + clazz.name]) {
            isConstructor = true;
            this['__previouslyConstructedBy' + clazz.name] = true;
        }
        return isConstructor;
    };

    // http://underscorejs.org/
    var __isFunction = function (obj) {
        return typeof obj === 'function';
    };

    // http://underscorejs.org/
    var __result = function (value) {
        return __isFunction(value) ? value.call() : value;
    };

    __exports__.__extends = __extends;
    __exports__.__isConstructor = __isConstructor;
    __exports__.__isFunction = __isFunction;
    __exports__.__result = __result;
  });