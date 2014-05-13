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
var __isConstructor = function (Clazz) {
    var isConstructor = false;
    if (this instanceof Clazz && !this['__previouslyConstructedBy' + Clazz.name]) {
        isConstructor = true;
        this['__previouslyConstructedBy' + Clazz.name] = true;
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

exports.__extends = __extends;
exports.__isConstructor = __isConstructor;
exports.__isFunction = __isFunction;
exports.__result = __result;