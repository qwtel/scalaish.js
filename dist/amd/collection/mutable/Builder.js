define("collection/mutable/Builder",
  ["traits","../TraversableLike","../generic/Growable","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    "use strict";
    var Trait = __dependency1__.Trait;

    var TraversableLike = __dependency2__.TraversableLike;
    var Growable = __dependency3__.Growable;

    var Builder = Trait.compose(Growable, Trait({

      addOne: Trait.required,

      clear: Trait.required,

      result: Trait.required,

      // TODO: Find a way to deal with lack of overloading
      sizeHint: function(size, n) {
        if (typeof size == 'number') {

        }
        // TODO
        /*
         else if (size.instanceOf(IndexedSeqLike)) {
         if (typeof n != 'undefined') {
         this.sizeHint(size.size(), n);
         } else {
         this.sizeHint(size.size());
         }
         }
         */
      },

      sizeHintBounded: function(size, boundingColl) {
        // TODO
        /*
         if (boundingColl.instanceOf(IndexedSeqLike)) {
         this.sizeHint(Math.min(size, boundingColl.size()))
         }
         */
      }

      // TODO: mapResult
    }));

    __exports__.Builder = Builder;
  });