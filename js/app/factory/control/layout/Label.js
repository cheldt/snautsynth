define(
    [
        'app/control/layout/Label',
        'app/utils/Position',
        'dejavu',
    ]
    , function(
        Label,
        Position,
        dejavu
    ) {
        return dejavu.Class.declare({
                $name: 'Label',

                create: function(canvasState, options) {
                    var position = new Position(options.position.x, options.position.y);

                    return new Label(options.id, position, canvasState, options.color, options.text);
                }
            }
        );
    }
);