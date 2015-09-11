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
                console.log(options);

                return new Fader(
                    options.id,
                    new Position(options.position.x, options.position.y),
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
