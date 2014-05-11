define("collection/IterableLike",
  ["traits","TraversableLike","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var Trait = __dependency1__.Trait;

    var TraversableLike = __dependency2__.TraversableLike;

    var IterableLike = Trait.override(
      Trait({
        iterator: Trait.required,

        forEach: function(f) {
          return this.iterator().forEach(f);
        },

        forAll: function(p) {
          return this.iterator().forAll(p);
        },

        exists: function(p) {
          return this.iterator().exists(p);
        },

        find: function(p) {
          return this.iterator().find(p);
        },

        isEmpty: function() {
          return !this.iterator().hasNext();
        }

        // TODO
      }),
      TraversableLike
    );

    __exports__.IterableLike = IterableLike;
  });