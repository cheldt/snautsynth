/**
 * @namespace Snautsynth.Control.UI
 */
define(['dejavu'], function(dejavu) {
    return dejavu.Class.declare({
        $name: 'ControlOptions',

        /**
         * @memberof Snautsynth.Control.UI.ControlOptions
         * @private
         *
         * @type {string}
         */
        __color: null,

        /**
         * @memberof Snautsynth.Control.UI.ControlOptions
         * @private
         *
         * @type {string}
         */
        __selectedColor: null,

        /**
         * @memberof Snautsynth.Control.UI.ControlOptions
         * @instance
         *
         * @return {string}
         */
        getColor: function() {
            return this.__color;
        },

        /**
         * @memberof Snautsynth.Control.UI.ControlOptions
         * @instance
         *
         * @return {string}
         */
        getSelectedColor: function() {
            return this.__selectedColor;
        },

        /**
         * @class Snautsynth.Control.UI.ControlOptions
         * @constructor
         *
         * @param {string} color
         * @param {string} selectedColor
         */
        initialize: function(color, selectedColor) {
            this.__color         = color;
            this.__selectedColor = selectedColor;
        }
    });
});