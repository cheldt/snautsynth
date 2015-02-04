define(
    [
        'app/control/ui/RadioButton',
        'app/utils/Position',
        'dejavu'
    ],
    function(
        RadioButton,
        Position,
        dejavu
    ) {
        return dejavu.Class.declare({
                $name: 'RadioButton',

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