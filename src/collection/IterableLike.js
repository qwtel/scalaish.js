import {Trait} from 'traits';

import {TraversableLike} from 'TraversableLike';

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

export {IterableLike};
