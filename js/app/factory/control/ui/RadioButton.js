/**
 * @namespace Snautsynth.Factory.Control.UI
 */
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
        'use strict';

        /** @class Snautsynth.Factory.Control.UI.RadioButton */
        return dejavu.Class.declare({
            $name: 'RadioButton',

            /**
             * @memberof Snautsynth.Factory.Control.UI.RadioButton
             * @instance
             *
             * @param  {Snautsynth.Canvas.CanvasState} canvasState
             * @param  {Object}                        options
             *
             * @return {Snautsynth.Control.UI.RadioButton}
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
        });
    }
);