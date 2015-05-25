/**
 * @namespace Snautsynth.Util
 */
define(
    [
        'dejavu',
        'app/util/Position'
    ],
    function(dejavu, Position) {
        'use strict';

        var MouseMovement = dejavu.Class.declare({
            $name: 'MouseMovement',

            /**
             * @memberof Snautsynth.Util.MouseMovement
             * @instance
             * @protected
             *
             * @type {number}
             */
            _deltaX: null,

            /**
             * @memberof Snautsynth.Util.MouseMovement
             * @instance
             * @protected
             *
             * @type {number}
             */
            _deltaY: null,

            /**
             * @memberof Snautsynth.Util.MouseMovement
             * @instance
             * @protected
             *
             * @type {number}
             */
            _direction: null,

            /**
             * @memberof Snautsynth.Util.MouseMovement
             * @instance
             * @protected
             *
             * @type {Snautsynth.Util.Position}
             */
            _lastPosition: null,

            $constants: {
              DIRECTION_UP:    1,
              DIRECTION_DOWN:  2,
              DIRECTION_LEFT:  3,
              DIRECTION_RIGHT: 4
            },

            /**
             * @memberof Snautsynth.Util.MouseMovement
             * @instance
             *
             * @return {number}
             */
            getDeltaX: function() {
                return this._deltaX;
            },

            /**
             * @memberof Snautsynth.Util.MouseMovement
             * @instance
             *
             * @return {number}
             */
            getDeltaY: function() {
                return this._deltaY;
            },

            /**
             * @memberof Snautsynth.Util.MouseMovement
             * @instance
             *
             * @return {number}
             */
            getDirection: function() {
                return this._direction;
            },

            /**
             * @constructor
             * @class Snautsynth.Util.MouseMovement
             */
            initialize: function() {
            },

            /**
             * Returns mouse-delta or position depending on pointer-lock.
             * Position is calculated scaling
             *
             * @memberof Snautsynth.Util.MouseMovement
             * @instance
             * @function
             *
             * @param {Object} e
             * @param {bool}   pointerLocked
             *
             * @return {Snautsynth.Util.Position}
             */
            calcMovement: function(e, pointerLocked) {
                if (null !== this._lastPosition) {
                    var deltaX, deltaY;
                    if (pointerLocked) {
                        deltaX = e.movementX
                        || e.mozMovementX
                        || e.webkitMovementX
                        || 0;

                        deltaY = e.movementY
                        || e.mozMovementY
                        || e.webkitMovementY
                        || 0;
                    } else {
                        deltaX = this._lastPosition.getX() - e.offsetX;
                        deltaY = this._lastPosition.getY() - e.offsetY;
                    }

                    if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX > 0) {
                        this._direction = MouseMovement.DIRECTION_LEFT;
                    } else if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX < 0) {
                        this._direction = MouseMovement.DIRECTION_RIGHT;
                    } else if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY > 0) {
                        this._direction = MouseMovement.DIRECTION_UP;
                    } else if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY < 0) {
                        this._direction = MouseMovement.DIRECTION_DOWN;
                    }

                    this._deltaX = deltaX;
                    this._deltaY = deltaY;
                }

                this._lastPosition = new Position(e.offsetX, e.offsetY);
            }
        });

        return MouseMovement;
    }
);
