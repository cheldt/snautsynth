/**
 * @namespace Snautsynth.Factory.Control.UI.RangeControl
 */
define(
    [
        'app/control/ui/rangecontrol/Knob',
        'app/control/ui/rangecontrol/SnapOptions',
        'app/datatype/NumberRange',
        'app/util/formatter/NumberFormatter',
        'app/util/Position',
        'dejavu'
    ],
    function(
        Knob,
        SnapOptions,
        NumberRange,
        NumberFormatter,
        Position,
        dejavu
    ) {
        'use strict';

        /** @class Snautsynth.Factory.Control.UI.RangeControl.Knob */
        return dejavu.Class.declare({
            $name: 'Knob',

            /**
             * @memberof Snautsynth.Factory.Control.UI.RangeControl.Knob
             * @instance
             *
             * @param  {Snautsynth.Canvas.CanvasState} canvasState
             * @param  {Object}                        options
             *
             * @return {Snautsynth.Control.UI.RangeControl.Knob}
             */
            create: function(canvasState, options) {
                var position    = new Position(options.position.x, options.position.y);
                var valueRange  = new NumberRange(options.valueRange.min, options.valueRange.max);
                var formatter   = new NumberFormatter(options.numberFormat);
                var snapOptions = null;

                if (null !== options.snapOptions) {
                    snapOptions = new SnapOptions(
                        options.snapOptions.doubleClickSnapValue,
                        options.snapOptions.snapDistance,
                        options.snapOptions.snapStep
                    );
                }

                return new Knob(
                    options.id,
                    position,
                    options.value,
                    canvasState,
                    options.valueDisplayMultiplier,
                    valueRange,
                    options.radius,
                    options.color,
                    snapOptions,
                    formatter
                );
            }
        });
    }
);