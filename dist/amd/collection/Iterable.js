define("collection/Iterable",
  ["traits","./Traversable","./IterableLike","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    "use strict";
    var Trait = __dependency1__.Trait;

    var Traversable = __dependency2__.Traversable;
    var IterableLike = __dependency3__.IterableLike;

    var Iterable = Trait.compose(Traversable, IterableLike, Trait({
      // TODO: do i need this?
      seq: function () {
        return this
      }
    }));

    __exports__.Iterable = Iterable;
  });