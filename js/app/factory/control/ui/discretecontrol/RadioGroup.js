/**
 * @namespace Snautsynth.Factory.Control.UI
 */
define(
    [
        'app/factory/control/ui/discretecontrol/RadioButtonOptions',
        'app/control/ui/discretecontrol/RadioGroup',
        'app/util/Position',
        'dejavu'
    ],
    function(
        RadioButtonOptionsFactory,
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
                var position               = new Position(options.position.x, options.position.y);
                var radioButtonOptionsList = null;

                if (null !== options.radioButtonOptions) {
                    var factory            = new RadioButtonOptionsFactory();
                    radioButtonOptionsList = [];

                    options.radioButtonOptions.forEach(
                        function(radioButtonOptions) {
                            radioButtonOptionsList.push(factory.create(radioButtonOptions));
                        }
                    );
                }

                return new RadioGroup(
                    options.id,
                    position,
                    options.value,
                    canvasState,
                    radioButtonOptionsList
                );
            }
        });
    }
);