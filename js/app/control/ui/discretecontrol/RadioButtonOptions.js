/**
 * @namespace Snautsynth.Control.UI.DiscreteControl
 */
define(
    [
        'dejavu',
        'app/control/ui/ControlOptions',
        'app/control/ui/discretecontrol/RadioButton',
        'mout/lang/defaults'
    ],
    function(
        dejavu,
        ControlOptions,
        RadioButton,
        defaults
    ) {
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
         * @type {string}
         */
        _label: null,

        /**
         * @memberof Snautsynth.Control.UI.DiscreteControl.RadioButtonOptions
         * @protected
         *
         * @type {Snautsynth.Util.Position}
         */
        _position: null,

        /**
         * @memberof Snautsynth.Control.UI.DiscreteControl.RadioButtonOptions
         * @protected
         *
         * @type {number}
         */
        _radius: null,

        /**
         * @memberof Snautsynth.Control.UI.DiscreteControl.RadioButtonOptions
         * @protected
         *
         * @type {*}
         */
        _value: null,

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
         * @param {Snautsynth.Util.Position} position
         */
        setPosition: function(position) {
            this._position = position;
        },

        /**
         * @memberof Snautsynth.Control.UI.DiscreteControl.RadioButtonOptions
         * @instance
         *
         * @return {Snautsynth.Util.Position}
         */
        getPosition: function() {
            return this._position;
        },

        /**
         * @memberof Snautsynth.Control.UI.DiscreteControl.RadioButtonOptions
         * @instance
         *
         * @return {string}
         */
        getLabel: function() {
          return this._label;
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
         * @memberof Snautsynth.Control.UI.DiscreteControl.RadioButtonOptions
         * @instance
         *
         * @return {*}
         */
        getValue: function() {
            return this._value;
        },

        /**
         * @class Snautsynth.Control.UI.DiscreteControl.RadioButtonOptions
         * @constructor
         * @extends Snautsynth.Control.UI.ControlOptions
         *
         * @param {string}                   color
         * @param {string}                   checkedColor
         * @param {number}                   radius
         * @param {string}                   label
         * @param {Snautsynth.Util.Position} position
         */
        initialize: function(value, color, checkedColor, radius, label, position) {
            color = defaults(color, RadioButton.DEFAULT_COLOR);

            this.$super(color, null);

            this._value        = value;
            this._checkedColor = defaults(checkedColor, RadioButton.DEFAULT_CHECKED_COLOR);
            this._radius       = defaults(radius, RadioButton.BUTTON_RADIUS);
            this._label        = label;
            this._position     = position;
        }
    });
});