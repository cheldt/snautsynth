/**
 * @namespace Snautsynth.Factory.Control.UI.DiscreteControl
 */
define(
    [
        '../../../../control/ui/discretecontrol/Keyboard',
        'app/util/Position',
        'dejavu'
    ],
    function(
        Keyboard,
        Position,
        dejavu
    ) {
        'use strict';

        /** @class Snautsynth.Factory.Control.UI.DiscreteControl.Keyboard */
        return dejavu.Class.declare({
            $name: 'Keyboard',

            /**
             * @memberof Snautsynth.Factory.Control.UI.DiscreteControl.Keyboard
             * @instance
             *
             * @param  {Snautsynth.Canvas.CanvasState} canvasState
             * @param  {Object}                        options
             *
             * @return {Snautsynth.Control.UI.DiscreteControl.Keyboard}
             */
            create: function(canvasState, options) {
                var position = new Position(options.position.x, options.position.y);

                return new Keyboard(
                    options.id,
                    canvasState,
                    position,
                    null
                );
            }
        });
    }
);