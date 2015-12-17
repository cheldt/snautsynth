/**
 * @namespace Snautsynth.Factory.Control.UI.Envelope
 */
define(
    [
        'app/control/ui/envelope/Graph',
        'app/factory/control/ui/envelope/GraphOptions',
        'app/util/Position',
        'dejavu'
    ],
    function(
        Graph,
        GraphOptionsFactory,
        Position,
        dejavu
    ) {
        'use strict';

        /** @class Snautsynth.Factory.Control.UI.Envelope.Graph */
        return dejavu.Class.declare({
            $name: 'Graph',

            /**
             * @memberof Snautsynth.Factory.Control.UI.Envelope.Graph
             * @instance
             *
             * @param  {Snautsynth.Canvas.CanvasState} canvasState
             * @param  {Object}                        options
             *
             * @return {Snautsynth.Control.UI.Envelope.Graph}
             */
            create: function(canvasState, options) {
                var position = new Position(options.position.x, options.position.y);
                var graphOptionsFactory = new GraphOptionsFactory();

                return new Graph(
                    options.id,
                    null,
                    position,
                    canvasState,
                    graphOptionsFactory.create(options.graphOptions)
                );
            }
        });
    }
);