/**
 * @namespace Snautsynth.Control.UI.RangeControl
 */
define(['dejavu', 'app/control/ui/UIControl'], function(dejavu, UIControl){
    var RangeControl = dejavu.Class.declare({
        $name: 'RangeControl',

        $extends: UIControl,

        /**
         * @memberof Snautsynth.Control.UI.RangeControl.RangeControl
         * @instance
         * @protected
         *
         * @type {Snautsynth.Util.Formatter.NumberFormatter}
         */
        _formatter:            null,

        /**
         * @memberof Snautsynth.Control.UI.RangeControl.RangeControl
         * @instance
         * @protected
         *
         * @type {Snautsynth.DataType.NumberRange}
         */
        _valueRange:           null,

        /**
         * @memberof Snautsynth.Control.UI.RangeControl.RangeControl
         * @instance
         * @protected
         *
         * @type {Snautsynth.Control.UI.RangeControl.SnapOptions}
         */
        _snapOptions:          null,

        /**
         * @memberof Snautsynth.Control.UI.RangeControl.RangeControl
         * @instance
         * @protected
         *
         * @type {number}
         */
        _valueDspMult:         null,

        /**
         * @memberof Snautsynth.Control.UI.RangeControl.RangeControl
         * @instance
         *
         * @return {Snautsynth.Util.Formatter.NumberFormatter}
         */
        getFormatter: function() {
            return this._formatter;
        },

        /**
         * @memberof Snautsynth.Control.UI.RangeControl.RangeControl
         * @instance
         *
         * @return {Snautsynth.Control.UI.RangeControl.SnapOptions}
         */
        getSnapOptions: function() {
            return this._snapOptions;
        },

        /**
         * @memberof Snautsynth.Control.UI.RangeControl.RangeControl
         * @instance
         *
         * @return {Snautsynth.DataType.NumberRange}
         */
        getValueRange: function() {
            return this._valueRange;
        },

        /**
         * @constructor
         * @class Snautsynth.Control.UI.RangeControl.RangeControl
         *
         * @param {number}                                         id
         * @param {Snautsynth.Util.Position}                       position
         * @param {*}                                              value
         * @param {Snautsynth.Canvas.CanvasState}                  canvasState
         * @param {number}                                         valueDspMult
         * @param {Snautsynth.DataType.NumberRange}                valueRange
         * @param {Snautsynth.Control.UI.RangeControl.SnapOptions} snapOptions
         * @param {Snautsynth.Util.Formatter.NumberFormatter}      formatter
         */
        initialize: function (id, position, value, canvasState, valueDspMult, valueRange, snapOptions, formatter) {
            this.$super(id, position, value, canvasState);

            this._valueDspMult = valueDspMult;
            this._valueRange   = valueRange;
            this._snapOptions  = snapOptions;
            this._formatter    = formatter;
        }

    });

    return RangeControl;
});
