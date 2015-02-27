/**
 * @namespace Snautsynth.Control.UI.DiscreteControl
 */
define(['dejavu', 'app/control/ui/ControlOptions'], function(dejavu, ControlOptions) {
    return dejavu.Class.declare({
        $name: 'RadioButtonOptions',

        $extends: ControlOptions,

        /**
         * @memberof Snautsynth.Control.UI.DiscreteControl.RadioButtonOptions
         * @protected
         *
         * @type {string}
         */
        _checkedColor: null,

        /**
         * @memberof Snautsynth.Control.UI.DiscreteControl.RadioButtonOptions
         * @protected
         *
         * @type {number}
         */
        _radius: null,

        /**
         * @memberof Snautsynth.Control.UI.DiscreteControl.RadioButtonOptions
         * @instance
         *
         * @return {string}
         */
        getCheckedColor: function() {
           return this._checkedColor;
        },

        /**
         * @memberof Snautsynth.Control.UI.DiscreteControl.RadioButtonOptions
         * @instance
         *
         * @return {number}
         */
        getRadius: function() {
            return this._radius;
        },

        /**
         * @class Snautsynth.Control.UI.DiscreteControl.RadioButtonOptions
         * @constructor
         * @extends Snautsynth.Control.UI.ControlOptions
         *
         * @param {string} color
         * @param checkedColor
         * @param radius
         */
        initialize: function(color, checkedColor, radius) {
            this.$super(color, null);

            this._checkedColor = checkedColor;
            this._radius       = radius;
        }
    });
});