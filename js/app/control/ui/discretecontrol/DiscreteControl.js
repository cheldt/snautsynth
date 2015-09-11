/**
 * @namespace Snautsynth.Control.UI.DiscreteControl
 */
define(['dejavu', 'app/control/ui/UIControl'], function(dejavu, UIControl){
    var RangeControl = dejavu.Class.declare({
        $name: 'DiscreteControl',

        $extends: UIControl,

        /**
         * @memberof Snautsynth.Control.UI.RangeControl.RangeControl
         * @instance
         * @protected
         *
         * @type {Snautsynth.DataType.DiscreteValueOptions}
         */
        _rangeValueOptions: null,

        /**
         * @constructor
         * @class Snautsynth.Control.UI.DiscreteControl.DiscreteControl
         * @extends Snautsynth.Control.UI.UIControl
         *
         * @param {number}                                   id
         * @param {Snautsynth.Util.Position}                 position
         * @param {*}                                        value
         * @param {Snautsynth.Canvas.CanvasState}            canvasState
         */
        initialize: function (id, position, value, canvasState) {
            this.$super(id, position, value, canvasState);
        }
    });

    return RangeControl;
});