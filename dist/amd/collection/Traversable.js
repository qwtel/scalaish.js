define("collection/Traversable",
  ["traits","TraversableLike","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var Trait = __dependency1__.Trait;

    var TraversableLike = __dependency2__.TraversableLike;

    var Traversable = Trait.compose(TraversableLike, Trait({
      // TODO: do i need this?
      seq: function () {
        return this
      }
    }));

    __exports__.Traversable = Traversable;
  });