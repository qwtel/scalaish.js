define("collection/TraversableOnce",
  ["traits","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Trait = __dependency1__.Trait;

    var TraversableOnce = Trait({
      forEach: Trait.required,
      isEmpty: Trait.required,
      hasDefiniteSize: Trait.required,
      seq: Trait.required,
      forAll: Trait.required,
      exists: Trait.required,
      find: Trait.required,

      reversed: function () {
        // TODO
        console.warn('reversed not implemented');
        return this
      },

      // TODO: copyToArray

      size: function () {
        var result = 0;
        this.forEach(function() {
          result++;
        });
        return result;
      },

      nonEmpty: function () {
        return !this.isEmpty();
      },

      count: function (p) {
        var cnt;
        this.forEach(function(x) {
          if (p(x)) cnt++;
        });
        return cnt;
      },

      foldLeft: function (z) {
        return function (op) {
          var result = z;
          this.forEach(function(x) {
            result = op(result, x);
          });
          return result;
        }.bind(this);
      },

      foldRight: function (op) {
        return function (z) {
          return this.reversed().foldLeft(z)(function(x, y) {
            return op(x, y);
          })
        }.bind(this);
      }


    });

    __exports__.TraversableOnce = TraversableOnce;
  });