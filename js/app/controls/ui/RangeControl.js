define(['dejavu', 'app/controls/ui/UIControl'], function(dejavu, UIControl){
    var RangeControl = dejavu.Class.declare({
        $name: 'RangeControl',

        $extends: UIControl,

        _doubleClickSnapValue: null,
        _formatter:            null,
        _valueRange:           null,
        _snapDistance:         null,
        _snapStep:             null,
        _valueDspMult:         null,

        /**
         * @returns {Number}
         */
        getDoubleClickSnapValue: function() {
           return this._doubleClickSnapValue;
        },

        /**
         * @returns {Object}
         */
        getFormatter: function() {
            return this._formatter;
        },

        /**
         * @returns {Object}
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
         * @param {Number} snapStep
         * @param {Number} snapDistance
         * @param {Number} doubleClickSnapValue
         * @param {Object} formatter
         */
        initialize: function (id, position,
            value, canvasState,
            valueDspMult,
            valueRange,
            snapStep, snapDistance,
            doubleClickSnapValue,
            formatter) {
            this.$super(id, position, value, canvasState);

            this._valueDspMult         = valueDspMult;
            this._valueRange           = valueRange;
            this._snapStep             = snapStep;
            this._snapDistance         = snapDistance;
            this._doubleClickSnapValue = doubleClickSnapValue;
            this._formatter            = formatter;
        }

    });
    return RangeControl;
});
