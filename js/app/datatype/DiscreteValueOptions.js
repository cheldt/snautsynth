/**
 * @namespace Snautsynth.DataType
 */
define(['dejavu', 'app/datatype/ValueOptions'], function(dejavu, ValueOptions) {
    return dejavu.Class.declare({
        $name: 'DiscreteValueOptions',

        $extends: ValueOptions,

        /**
         * @memberof Snautsynth.DataType.DiscreteValueOptions
         * @protected
         *
         * @type {Array.<Snautsynth.DataType.DiscreteValue>}
         */
        _discreteValueList: null,

        /**
         * @memberof Snautsynth.DataType.DiscreteValueOptions
         * @instance
         *
         * @return {Array.<Snautsynth.DataType.DiscreteValue>}
         */
        getDiscreteValueList: function() {
            return this._discreteValueList;
        },

        /**
         * @class Snautsynth.DataType.DiscreteValueOptions
         * @constructor
         * @extends Snautsynth.DataType.ValueOptions
         *
         * @param {Array.<Snautsynth.DataType.DiscreteValue>} discreteValueList
         * @param {Snautsynth.Control.UI.RangeControl.SnapOptions} snapOptions
         * @param {number}                                         valueDisplayMultiplier
         */
        initialize: function(discreteValueList, snapOptions, valueDisplayMultiplier) {
            this.$super(snapOptions, valueDisplayMultiplier);

            this._discreteValueList = discreteValueList;
        }
    });
});
