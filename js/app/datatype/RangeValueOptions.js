/**
 * @namespace Snautsynth.DataType
 */
define(['dejavu', 'app/datatype/ValueOptions'], function(dejavu, ValueOptions) {
    return dejavu.Class.declare({
        $name: 'RangeValueOptions',

        $extends: ValueOptions,

        /**
         * @memberof Snautsynth.DataType.RangeValueOptions
         * @protected
         *
         * @type {Snautsynth.Util.Formatter.NumberFormatter}
         */
        _numberFormatter: null,

        /**
         * @memberof Snautsynth.DataType.RangeValueOptions
         * @protected
         *
         * @type {Snautsynth.DataType.NumberRange}
         */
        _numberRange: null,

        /**
         * @memberof Snautsynth.DataType.RangeValueOptions
         * @instance
         *
         * @return {Snautsynth.Util.Formatter.NumberFormatter}
         */
        getNumberFormatter: function() {
            return this._numberFormatter;
        },

        /**
         * @memberof Snautsynth.DataType.RangeValueOptions
         * @instance
         *
         * @return {Snautsynth.DataType.NumberRange}
         */
        getNumberRange: function() {
            return this._numberRange;
        },

        /**
         * @class Snautsynth.DataType.RangeValueOptions
         * @constructor
         * @extends Snautsynth.DataType.ValueOptions
         *
         * @param {Snautsynth.DataType.NumberRange}                numberRange
         * @param {Snautsynth.Control.UI.RangeControl.SnapOptions} snapOptions
         * @param {number}                                         valueDisplayMultiplier
         * @param {Snautsynth.Util.Formatter.NumberFormatter}      numberFormatter
         */
        initialize: function(numberRange, snapOptions, valueDisplayMultiplier, numberFormatter) {
            this.$super(snapOptions, valueDisplayMultiplier);

            this._numberFormatter = numberFormatter;
            this._numberRange     = numberRange;
        }
    });
});