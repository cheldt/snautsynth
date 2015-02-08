/**
 * @namespace Snautsynth.DataType
 */
define(['dejavu'], function(dejavu){
    var NumberRange = dejavu.Class.declare({
        $name: 'NumberRange',

        /**
         * @memberof Snautsynth.DataType.NumberRange
         * @instance
         * @protected
         *
         * @type {number}
         */
        _max: null,

        /**
         * @memberof Snautsynth.DataType.NumberRange
         * @instance
         * @protected
         *
         * @type {number}
         */
        _min: null,

        /**
         * @memberof Snautsynth.DataType.NumberRange
         * @instance
         *
         * @return {number}
         */
        getMax: function() {
            return this._max;
        },


        /**
         * @memberof Snautsynth.DataType.NumberRange
         * @instance
         *
         * @return {number}
         */
        getMin: function() {
            return this._min;
        },

        /**
         * @class Snautsynth.DataType.NumberRange
         * @constructor
         *
         * @param {number} min
         * @param {number} max
         */
        initialize: function (min, max) {
            this._max = max;
            this._min = min;
        },

        /**
         * Calculates range-value from min to max
         *
         * @memberof Snautsynth.DataType.NumberRange
         * @instance
         *
         * @return {number}
         */
        calcRange: function() {
            return this._max - this._min;
        }
    });

    return NumberRange;
});