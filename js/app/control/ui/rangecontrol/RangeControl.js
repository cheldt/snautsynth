define(['dejavu', '../UIControl'], function(dejavu, UIControl){
    var RangeControl = dejavu.Class.declare({
        $name: 'RangeControl',

        $extends: UIControl,

        _formatter:            null,
        _valueRange:           null,
        _snapOptions:          null,
        _valueDspMult:         null,

        /**
         * @return {Object}
         */
        getFormatter: function() {
            return this._formatter;
        },

        /**
         * @return {Object}
         */
        getSnapOptions: function() {
            return this._snapOptions;
        },

        /**
         * @return {Object}
         */
        getValueRange: function() {
            return this._valueRange;
        },

        /**
         * Constructor for RangeControl
         *
         * @param {Number} id
         * @param {Object} position
         * @param {Number} value
         * @param {Object} canvasState
         * @param {Number} valueDspMult
         * @param {Object} valueRange
         * @param {Object} snapOptions
         * @param {Object} formatter
         */
        initialize: function (
            id,
            position,
            value,
            canvasState,
            valueDspMult,
            valueRange,
            snapOptions,
            formatter) {
            this.$super(id, position, value, canvasState);

            this._valueDspMult         = valueDspMult;
            this._valueRange           = valueRange;
            this._snapOptions          = snapOptions;
            this._formatter            = formatter;
        }

    });
    return RangeControl;
});
