/**
 * @namespace Snautsynth.Control.UI
 */
define(['dejavu'], function(dejavu) {
    return dejavu.Class.declare({
        $name: 'ControlOptions',

        /**
         * @memberof Snautsynth.Control.UI.ControlOptions
         * @protected
         *
         * @type {string}
         */
        _color: null,

        /**
         * @memberof Snautsynth.Control.UI.ControlOptions
         * @protected
         *
         * @type {string}
         */
        _selectedColor: null,

        /**
         * @memberof Snautsynth.Control.UI.ControlOptions
         * @instance
         *
         * @return {string}
         */
        getColor: function() {
            return this._color;
        },

        /**
         * @memberof Snautsynth.Control.UI.ControlOptions
         * @instance
         *
         * @return {string}
         */
        getSelectedColor: function() {
            return this._selectedColor;
        },

        /**
         * @class Snautsynth.Control.UI.ControlOptions
         * @constructor
         *
         * @param {string} color
         * @param {string} selectedColor
         */
        initialize: function(color, selectedColor) {
            this._color         = color;
            this._selectedColor = selectedColor;
        }
    });
});