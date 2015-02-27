/**
 * @namespace Snautsynth.DataType
 */
define(['dejavu'], function(dejavu) {
    return dejavu.Class.declare({
        $name: 'ValueOptions',

        /**
         * @memberof Snautsynth.DataType.ValueOptions
         * @protected
         *
         * @type {Snautsynth.Control.UI.RangeControl.SnapOptions}
         */
        _snapOptions: null,

        /**
         * @memberof Snautsynth.DataType.ValueOptions
         * @protected
         *
         * @type {number}
         */
        _valueDisplayMultiplier: null,

        /**
         * @memberof Snautsynth.DataType.ValueOptions
         * @instance
         *
         * @return {Snautsynth.Control.UI.RangeControl.SnapOptions}
         */
        getSnapOptions: function() {
            return this._snapOptions;
        },

        /**
         * @memberof Snautsynth.DataType.ValueOptions
         * @instance
         *
         * @return {number}
         */
        getValueDisplayMultiplier: function() {
            return this._valueDisplayMultiplier;
        },

        /**
         * @class Snautsynth.DataType.ValueOptions
         * @constructor
         *
         * @param {Snautsynth.Control.UI.RangeControl.SnapOptions} snapOptions
         * @param {number}                                         valueDisplayMultiplier
         */
        initialize: function(snapOptions, valueDisplayMultiplier) {
            this._snapOptions            = snapOptions;
            this._valueDisplayMultiplier = valueDisplayMultiplier;
        }
    });
});
