define(
    [
        'app/control/ui/envelope/Point',
        'app/control/ui/envelope/PointValue',
        'dejavu'
    ],
    function(
        Point,
        PointValue,
        dejavu
    ) {
        return dejavu.Class.declare({
                $name: 'Point',

                /**
                 * @param {Object} canvasState
                 * @param {Object} envelopeControl
                 * @param {Object} options
                 * @return {Object}
                 */
                create: function(canvasState, envelopeControl, options) {
                    var pointValue = new PointValue(options.value.gain, options.value.time);

                    return new Point(
                        options.id,
                        pointValue,
                        canvasState,
                        options.color,
                        envelopeControl
                    );
                }
            }
        );
    }
);