/**
 * @namespace Snautsynth.Factory.Control.UI.Envelope
 */
define(
    [
        'app/control/ui/envelope/GraphOptions',
        'dejavu'
    ],
    function(
        GraphOptions,
        dejavu
    ) {
        'use strict';

        /** @class Snautsynth.Factory.Control.UI.Envelope.GraphOptions */
        return dejavu.Class.declare({
            $name: 'GraphOptions',

            /**
             * @memberof Snautsynth.Factory.Control.UI.Envelope.GraphOptions
             * @instance
             *
             * @param  {Snautsynth.Canvas.CanvasState} canvasState
             * @param  {Object}                        options
             *
             * @return {Snautsynth.Control.UI.Envelope.GraphOptions}
             */
            create: function(canvasState, options) {
                return new GraphOptions(
                    options.color,
                    options.selectedColor,
                    options.pointColor,
                    options.maxTime
                );
            }
        });
    }
);
