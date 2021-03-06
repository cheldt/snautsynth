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
         * @type {boolean}
         */
        _increaseValue: null,

        /**
         * @memberof Snautsynth.Control.UI.RangeControl.RangeControl
         * @instance
         * @protected
         *
         * @type {number}
         */
        _lastValue: null,

        /**
         * @memberof Snautsynth.Control.UI.RangeControl.RangeControl
         * @instance
         * @protected
         *
         * @type {number}
         */
        _mouseMoves: null,

        /**
         * @memberof Snautsynth.Control.UI.RangeControl.RangeControl
         * @instance
         * @protected
         *
         * @type {Snautsynth.DataType.RangeValueOptions}
         */
        _rangeValueOptions: null,

        /**
         * @memberof Snautsynth.Control.UI.RangeControl.RangeControl
         * @instance
         * @protected
         *
         * @return {Snautsynth.DataType.RangeValueOptions}
         */
        getValueOptions: function() {
            return this._rangeValueOptions;
        },

        /**
         * @memberof Snautsynth.Control.I.RangeControl.RangeControl
         * @instance
         *
         * @param {number} lastValue
         */
        setLastValue: function(lastValue) {
            this._lastValue = lastValue;
        },

        /**
         * @constructor
         * @class Snautsynth.Control.UI.RangeControl.RangeControl
         * @extends Snautsynth.Control.UI.UIControl
         *
         * @param {number}                                         id
         * @param {Snautsynth.Util.Position}                       position
         * @param {*}                                              value
         * @param {Snautsynth.Canvas.CanvasState}                  canvasState
         * @param {Snautsynth.DataType.RangeValueOptions}          rangeValueOptions
         */
        initialize: function (id, position, value, canvasState, rangeValueOptions) {
            this.$super(id, position, value, canvasState);
        }
    });

    return RangeControl;
});
