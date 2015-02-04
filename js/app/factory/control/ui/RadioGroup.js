define(
    [
        'app/factory/control/ui/RadioButton',
        'app/control/ui/RadioGroup',
        'app/utils/Position',
        'dejavu'
    ],
    function(
        RadioButtonFactory,
        RadioGroup,
        Position,
        dejavu
    ) {
        return dejavu.Class.declare({
                $name: 'RadioGroup',

                create: function(canvasState, options) {
                    var position   = new Position(options.position.x, options.position.y);
                    var radioGroup = new RadioGroup(
                        options.id,
                        position,
                        options.value,
                        canvasState
                    );

                    var factory = new RadioButtonFactory();

                    options.radioButtons.forEach(
                        function(radioButtonOptions) {
                            var radioButton = factory.create(canvasState, radioButtonOptions);
                            radioGroup.addControl(radioButton);
                        }
                    );

                    return radioGroup;
                }
            }
        );
    }
);