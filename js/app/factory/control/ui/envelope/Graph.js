/**
 * @namespace Snautsynth.Factory.Control.UI.Envelope
 */
define(
    [
        'app/control/ui/envelope/Graph',
        'app/factory/control/ui/envelope/Point',
        'app/util/Position',
        'dejavu'
    ],
    function(
        Graph,
        PointFactory,
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
                var graph    = new Graph(
                    options.id,
                    position,
                    canvasState,
                    options.color,
                    options.maxTime
                );

                options.points.forEach(
                    function(pointOptions) {
                        var factory = new PointFactory();
                        var point   = factory.create(canvasState, graph, pointOptions);
                        graph.addControl(point);
                    }
                );

                return graph;
            }
        });
    }
);