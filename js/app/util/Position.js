/**
 * Position module
 *
 * @module    app/util/Position
 * @namespace Snautsynth.Util
 */
define(
    ['dejavu']
    ,
    function(dejavu) {
          return dejavu.Class.declare({
                $name: 'Position',

                /**
                 * @memberof Snautsynth.Util.Position
                 * @instance
                 * @protected
                 *
                 * @type {number}
                 */
                _x: null,

                /**
                 * @memberof Snautsynth.Util.Position
                 * @instance
                 * @protected
                 *
                 * @type {number}
                 */
                _y: null,

                /**
                 * @memberof Snautsynth.Util.Position
                 * @instance
                 * @return {number}
                 */
                getX: function() {
                    return this._x;
                },

                /**
                 * @memberof Snautsynth.Util.Position
                 * @instance
                 * @return {number}
                 */
                getY: function() {
                    return this._y;
                },

                /**
                 * @constructor
                 * @class Snautsynth.Util.Position
                 *
                 * @param {number} x
                 * @param {number} y
                 */
                initialize: function(x, y) {
                    this._x = x;
                    this._y = y;
                }
            }
        );
    }
);
