/**
 * @namespace Snautsynth.Factory.Control.UI.RangeControl
 */
define(
    [
        'app/control/ui/rangecontrol/Fader',
        'app/control/ui/rangecontrol/SnapOptions',
        'app/datatype/NumberRange',
        'app/util/formatter/NumberFormatter',
        'app/util/Position',
        'dejavu'
    ],
    function(
        Fader,
        SnapOptions,
        NumberRange,
        NumberFormatter,
        Position,
        dejavu
    ) {
        'use strict';

        /** @class Snautsynth.Factory.Control.UI.RangeControl.Fader */
        return dejavu.Class.declare({
            $name: 'Fader',

            /**
             * @memberof Snautsynth.Factory.Control.UI.RangeControl.Fader
             * @instance
             *
             * @param  {Snautsynth.Canvas.CanvasState} canvasState
             * @param  {Object}                        options
             *
             * @return {Snautsynth.Control.UI.RangeControl.Fader}
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

                return new Fader(
                    options.id,
                    position,
                    options.value,
                    canvasState,
                    options.valueDisplayMultiplier,
                    valueRange,
                    options.length,
                    options.color,
                    snapOptions,
                    formatter,
                    options.orientation
                );
            }
        });
    }
);
