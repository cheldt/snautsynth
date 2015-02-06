define(
    [
        'app/control/ui/RadioButton',
        'app/util/Position',
        'dejavu'
    ],
    function(
        RadioButton,
        Position,
        dejavu
    ) {
        return dejavu.Class.declare({
                $name: 'RadioButton',

                /**
                 * @param {Object} canvasState
                 * @param {Object} options
                 * @return {Object}
                 */
                create: function(canvasState, options) {
                    var position = new Position(options.position.x, options.position.y);

                    return new RadioButton(
                        options.id,
                        position,
                        canvasState,
                        options.label,
                        options.value,
                        options.color,
                        options.checkedColor,
                        options.radius
                    );

                }
            }
        );
    }
);