/**
 * @namespace Snautsynth.Factory.Control.UI
 */
define(
    [
        'app/factory/control/ui/RadioButton',
        'app/control/ui/RadioGroup',
        'app/util/Position',
        'dejavu'
    ],
    function(
        RadioButtonFactory,
        RadioGroup,
        Position,
        dejavu
    ) {
        'use strict';

        /** @class Snautsynth.Factory.Control.UI.RadioGroup */
        return dejavu.Class.declare({
            $name: 'RadioGroup',

            /**
             * @memberof Snautsynth.Factory.Control.UI.RadioGroup
             * @instance
             *
             * @param  {Snautsynth.Canvas.CanvasState} canvasState
             * @param  {Object}                        options
             *
             * @return {Snautsynth.Control.UI.RadioGroup}
             */
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
        });
    }
);