import {Trait} from '../helpers/Trait';

import {TTraversableLike} from './TraversableLike';

var TIterableLike = Trait.extend(TTraversableLike, Trait("IterableLike", {

  iterator: Trait.required,

  forEach: function (f) {
    return this.iterator().forEach(f);
  },

  forAll: function (p) {
    return this.iterator().forAll(p);
  },

  exists: function (p) {
    return this.iterator().exists(p);
  },

  find: function (p) {
    return this.iterator().find(p);
  },

  isEmpty: function () {
    return !this.iterator().hasNext();
  },

  foldRight: function (z) {
    return function (op) {
      return this.iterator.foldRight(z)(op);
    }.bind(this);
  },

  reduceRight: function (op) {
    return this.iterator.reduceRight(op);
  },

  toIterable: function () {
    return this;
  },

  head: function () {
    return this.iterator.next();
  },

  /**
   * @param {Number} frm
   * @param {Number} until
   * @override
   */
  slice: function (frm, until) {

  },

  /**
   * @param {Number} n
   * @override
   */
  take: function (n) {

  },

  /**
   * @param {Number} n
   * @override
   */
  drop: function (n) {

  },

  /**
   * @template A
   * @param {function(A): boolean} p
   * @override
   * @return {Repr}
   */
  takeWhile: function (p) {

  },

  /**
   * @param {Number} size - the number of elements per group
   * @return {Iterator.<Repr>} -
   */
  grouped: function (size) {

  },

  /**
   *
   * @param {Number=} size -
   * @param {Number=} step -
   * @return {Iterator.<Repr>} -
   */
  sliding: function (size, step) {
    step = step || 1;
  },

  takeRight: function (n) {

  },

  dropRight: function (n) {

  },

  /**
   * @template A, B
   * B >: A
   * @param {Array.<B>} xs
   * @param {Number} start
   * @param {Number} len
   */
  copyToArray: function (xs, start, len) {

  },

  zip: function (that) {

  },

  zipAll: function () {

  },

  zipWithIndex: function () {

  },

  sameElements: function () {

  }

  // TODO: toStream

  // TODO: canEqual

  // TODO: view
}));

export {TIterableLike};
