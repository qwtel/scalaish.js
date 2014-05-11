define("test",
  ["traits","./Option","./collection/generic/Growable"],
  function(__dependency1__, __dependency2__, __dependency3__) {
    "use strict";
    var Trait = __dependency1__.Trait;

    var Option = __dependency2__.Option;
    var Some = __dependency2__.Some;
    var None = __dependency2__.None;
    var Growable = __dependency3__.Growable;

    /*
    var TEquality = Trait({
      equals: Trait.required,
      differs: function(x) { return !this.equals(x); }
    });

    var TMagnitude = Trait.compose(TEquality, Trait({
      smaller: Trait.required,
      greater: function(x) { return !this.smaller(x) && this.differs(x) },
      between: function(min, max) {
        return min.smaller(this) && this.smaller(max);
      }
    }));

    function TCircle(center, radius) {
      return Trait.compose(
        TMagnitude,
        TEquality,
        Trait({
          center: center,
          radius: radius,
          area: function() { return Math.PI * this.radius * this.radius; },
          equals: function(c) { return c.center === this.center && r.radius === this.radius },
          smaller: function(c) { return this.radius < c.radius }
        }));
    }

    function Circle(center, radius, rgb) {
      return Trait.create(Object.prototype, TCircle(center, radius));
    }
    var c = new Circle(0, 1);

    console.log(c instanceof Circle);
    */

    /*
    console.log(Some(1).get() === 1);
    console.log(Option(null).isEmpty() === true);

    console.log(Growable);
    */
  });