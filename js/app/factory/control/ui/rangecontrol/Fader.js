/**
 * @namespace Snautsynth.Factory.Control.UI.RangeControl
 */
define(
    [
        'app/control/ui/rangecontrol/Fader',
        'app/util/Position',
        'dejavu'
    ],
    function(
        Fader,
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
                var position                 = new Position(options.position.x, options.position.y);

                return new Fader(
                    options.id,
                    position,
                    options.value,
                    canvasState,
                    options.length,
                    options.color,
                    options.orientation
                );
            }
        });
    }
);
