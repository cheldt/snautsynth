/**
 * @namespace Snautsynth.Factory.Control.UI.RangeControl
 */
define(
    [
        'app/control/ui/rangecontrol/Knob',
        'app/util/Position',
        'dejavu'
    ],
    function(
        Knob,
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
                return new Knob(
                    options.id,
                    new Position(options.position.x, options.position.y),
                    options.value,
                    canvasState,
                    options.radius,
                    options.color
                );
            }
        });
    }
);