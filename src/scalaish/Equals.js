import {Trait} from "./helpers/Trait";

/**
 * An interface containing operations for equality.
 * The only method not already present in class `AnyRef` is `canEqual`.
 */
var TEquals = {
  Equals: true,

  /**
   * A method that should be called from every well-designed equals method
   * that is open to be overridden in a subclass. See Programming in Scala,
   * Chapter 28 for discussion and design.
   *
   * @param {*} that the value being probed for possible equality
   * @return {boolean} true if this instance can possibly equal `that`, otherwise false
   */
  canEqual: Trait.required,

  /**
   * The universal equality method defined in `Object`.
   */
  equals: Trait.required
};

export {TEquals};
