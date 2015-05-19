/**
 * @namespace Snautsynth.Control.UI.DiscreteControl
 */
define(['dejavu', 'app/control/ui/UIControl'], function(dejavu, UIControl){
    var RangeControl = dejavu.Class.declare({
        $name: 'DiscreteControl',

        $extends: UIControl,

        /**
         * @memberof Snautsynth.Control.UI.DiscreteControl.DiscreteControl
         * @instance
         * @protected
         *
         * @type {Snautsynth.DataType.DiscreteValueOptions}
         */
        _discreteValueOptions: null,

        /**
         * @memberof Snautsynth.Control.UI.DiscreteControl.DiscreteControl
         * @instance
         *
         * @return {Snautsynth.DataType.DiscreteValueOptions}
         */
        getValueOptions: function() {
            return this._discreteValueOptions;
        },

        /**
         * @memberof Snautsynth.Control.UI.DiscreteControl.DiscreteControl
         * @instance
         *
         * @param {Snautsynth.DataType.DiscreteValueOptions} discreteValueOptions
         */
        setValueOptions: function(discreteValueOptions) {
            this._discreteValueOptions = discreteValueOptions;
        },

        /**
         * @constructor
         * @class Snautsynth.Control.UI.DiscreteControl.DiscreteControl
         * @extends Snautsynth.Control.UI.UIControl
         *
         * @param {number}                                   id
         * @param {Snautsynth.Util.Position}                 position
         * @param {*}                                        value
         * @param {Snautsynth.Canvas.CanvasState}            canvasState
         * @param {Snautsynth.DataType.DiscreteValueOptions} discreteValueOptions
         */
        initialize: function (id, position, value, canvasState, discreteValueOptions) {
            this.$super(id, position, value, canvasState);

            this._discreteValueOptions = discreteValueOptions;
        }
    });

    return RangeControl;
});