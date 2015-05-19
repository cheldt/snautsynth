/**
 * @namespace Snautsynth.Factory.Control.UI.DiscreteControl
 */
define(
    [
        '../../../../control/ui/discretecontrol/RadioButton',
        'app/util/Position',
        'dejavu'
    ],
    function(
        RadioButton,
        Position,
        dejavu
    ) {
        'use strict';

        /** @class Snautsynth.Factory.Control.UI.DiscreteControl.RadioButton */
        return dejavu.Class.declare({
            $name: 'RadioButton',

            /**
             * @memberof Snautsynth.Factory.Control.UI.DiscreteControl.RadioButton
             * @instance
             *
             * @param  {Snautsynth.Canvas.CanvasState} canvasState
             * @param  {Object}                        options
             *
             * @return {Snautsynth.Control.UI.DiscreteControl.RadioButton}
             */
            create: function(canvasState, options) {
                return new RadioButton(
                    options.id,
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