define(
    [
        'app/control/ui/envelope/Graph',
        'app/factory/control/ui/envelope/Point',
        'app/utils/Position',
        'dejavu'
    ],
    function(
        Graph,
        PointFactory,
        Position,
        dejavu
    ) {
        return dejavu.Class.declare({
                $name: 'Graph',

                /**
                 * @param {Object} canvasState
                 * @param {Object} options
                 * @return {Object}
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
            }
        );
    }
);