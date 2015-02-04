/**
 * Created by snaut on 22/01/15.
 */
define(['dejavu'], function(dejavu){
    var NumberRange = dejavu.Class.declare({
        $name: 'NumberRange',

        _max: null,
        _min: null,

        /**
         * @return {Number}
         */
        getMax: function() {
            return this._max;
        },

        /**
         * @param {Number} max
         */
        setMax: function(max) {
            this._max = max;
        },

        /**
         * @return {Number}
         */
        getMin: function() {
            return this._min;
        },

        /**
         * @params {Number} min
         */
        setMin: function(min) {
            this._min = min;
        },

        /**
         * @param {Number} min
         * @param {Number} max
         */
        initialize: function (min, max) {
            this._max = max;
            this._min = min;
        },

        /**
         * Calculates value from min to max
         *
         * @return {Number}
         */
        calcRange: function() {
            return this._max - this._min;
        }
    });

    return NumberRange;
});